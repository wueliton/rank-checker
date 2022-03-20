import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import style from "./cardRanking.module.scss";
import Avatar from "@mui/material/Avatar";
import ProgressiveBar from "../ProgressiveBar";
import { Box, LinearProgress } from "@mui/material";

interface ICardRankingProps {
  client: string;
  url: string;
  progress: number;
}

export function CardRanking({ client, url, progress }: ICardRankingProps) {
  function stringAvatar(name: string) {
    return {
      children: name.includes(" ")
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name[0]}`,
    };
  }
  return (
    <div className={style.content}>
      <Card>
        <CardContent>
          <div className={style.infoRanking}>
            <div>
              <Avatar
                {...stringAvatar(client)}
                variant="rounded"
                sx={{ width: 72, height: 72 }}
              />
            </div>
            <div className={style.dataCompany}>
              <span className={style.nameCompany}>{client}</span>
              <span className={style.statusProgress}>
                Ranqueando palavras chave...
              </span>
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
