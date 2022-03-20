import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import style from "./sideBar.module.scss";
import logo from "../../assets/logo.svg";
import Image from "next/image";
const drawerWidth = 240;

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  window?: () => Window;
}

export function SideBar({ mobileOpen, handleDrawerToggle, window }: Props) {
  const drawer = (
    <div className={style.menuBar}>
      {
        <div className={style.logoMenuBar}>
          <Image src={logo} alt="Logo" width={36} height={36} />
        </div>
      }

      <span>ANÁLISE</span>
      <List className={style.menuBarList}>
        {["Busca de Palavra"].map((text, index) => (
          <ListItem button key={text} className={style.active}>
            <ListItemIcon className={style.itemIconMenuBar}>
              <ManageSearchIcon className={style.iconMenuBar} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className={style.sideBar}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
