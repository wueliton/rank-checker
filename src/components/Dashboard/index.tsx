import { Alert, Button, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { useSocket } from "../../services/socket";
import { ISearchStatus } from "../../types";
import { CardRanking } from "../CardRanking";
import { FormSearch } from "../FormSearch";
import { Header } from "../Header";
import { SideBar } from "../SideBar";
import { TableComponent } from "../Table/Table";
import avatar from "../../assets/avatar.jpeg";
import Image from "next/image";
import style from "./dashboard.module.scss";
import { AppDialog } from "../Dialog";
import { useSearchContext } from "../../contexts/SearchContext";

interface IDialog {
  open: boolean;
  type: "success" | "error" | "info";
  title: string;
  text: string;
  hideCloseButton?: boolean;
}

export const Dashboard = () => {
  const socket = useSocket(
    process.env.NEXT_PUBLIC_API_PATH ?? "https://rankcheckerapp.herokuapp.com"
  );
  const searchContext = useSearchContext();
  const drawerWidth = 240;
  const [keywordsStatus, setKeywordsStatus] = useState({} as ISearchStatus);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dialog, setDialog] = useState<IDialog>({
    open: false,
    type: "success",
    title: "",
    text: "",
    hideCloseButton: false,
  });

  const handleDialog = (
    title: string,
    text: string,
    type: "success" | "error" | "info",
    open?: boolean,
    hideCloseButton = false
  ) =>
    setDialog({
      ...dialog,
      open: open ?? !dialog.open,
      text,
      title,
      type,
      hideCloseButton,
    });
  const closeDialog = () => setDialog({ ...dialog, open: false });

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const getInitialData = async () => {
    const { data } = await ApiService.get("/status");
    if (data.keywords) {
      const keywords = revertData(data.keywords);
      setKeywordsStatus({ ...data, keywords });
    } else setKeywordsStatus(data);
    if (data.status) setProgress(data.status);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const revertData = (keywords: ISearchStatus["keywords"]) => {
    const lastItem = keywords.findIndex(
      (keywords) => keywords.status === undefined
    );
    const length = lastItem > 1 ? lastItem + 1 : 2;
    const filtered = keywords.slice(1, length);
    return filtered.reverse();
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("reconnect", () => {
      if (dialog.type === "error" && dialog.open)
        setDialog({ ...dialog, open: false });
    });

    socket.on("connect", () => {
      if (dialog.type === "error" && dialog.open)
        setDialog({ ...dialog, open: false });
    });

    socket.on("searchStatus", (searchStatus: ISearchStatus) => {
      const keywords = revertData(searchStatus.keywords);
      setKeywordsStatus({ ...searchStatus, keywords });
      setProgress(searchStatus.status);
    });

    socket.on("email", (emailMessage) => {
      setDialog({
        ...dialog,
        open: true,
        title: "Relatório gerado com sucesso!",
        text: "Seu Relatório foi gerado e enviado para seu e-mail com sucesso!",
      });
      setKeywordsStatus({ message: "Busca finalizada" });
    });

    socket.on("disconnect", () => {
      handleDialog(
        "Perdemos a conexão :(",
        "Aguarde enquanto nosso serviço tenta se reconectar...",
        "error",
        true,
        true
      );
      searchContext.handleSearchError();
    });
  }, [socket]);

  return (
    <>
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "auto",
        }}
      >
        <div className={style.welcomeSection}>
          <Image
            src={avatar}
            alt="Avatar"
            width={57}
            height={57}
            className={style.avatar}
          />
          <div className={style.welcome}>
            <h1>Bem vindo(a) 👋</h1>
            <span>Ranqueamento de Palavras Chave</span>
          </div>
        </div>
        {keywordsStatus.message && <FormSearch />}
        {keywordsStatus.keywords && (
          <>
            <span className={style.titleSection}>Gerando Relatório</span>
            <CardRanking
              client={keywordsStatus.client}
              url={keywordsStatus.client}
              progress={progress}
            />
            <TableComponent keywords={keywordsStatus.keywords} />
          </>
        )}
      </Box>
      <AppDialog
        open={dialog.open}
        handleClose={closeDialog}
        title={dialog.title}
        text={dialog.text}
        type={dialog.type}
        hideButton={dialog.hideCloseButton}
      />
    </>
  );
};
