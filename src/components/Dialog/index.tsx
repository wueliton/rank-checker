import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import GppMaybeRoundedIcon from "@mui/icons-material/GppMaybeRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

interface IDialog {
  open: boolean;
  handleClose: () => void;
  type: "success" | "error" | "info";
  title: string;
  text: string;
  hideButton?: boolean;
  icon?: string;
}

export const AppDialog = ({
  open,
  handleClose,
  type,
  title,
  text,
  hideButton,
  icon,
}: IDialog) => {
  const color =
    type === "success" ? "#1dd1a1" : type === "info" ? "#feca57" : "#ee5253";

  return (
    <Dialog
      PaperProps={{
        style: {
          borderTop: `3px solid ${color}`,
        },
      }}
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        id="alert-dialog-title"
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
        padding={3}
        flexDirection="column"
        display="flex"
      >
        {type === "success" ? (
          <CheckCircleRoundedIcon
            sx={{
              height: 56,
              width: 56,
              color: color,
              margin: "auto",
              marginBottom: 2,
            }}
          />
        ) : type === "info" ? (
          <ErrorRoundedIcon
            sx={{
              height: 56,
              width: 56,
              color: color,
              margin: "auto",
              marginBottom: 2,
            }}
          />
        ) : (
          <GppMaybeRoundedIcon
            sx={{
              height: 56,
              width: 56,
              color: color,
              margin: "auto",
              marginBottom: 2,
            }}
          />
        )}
        <Typography variant="h4">{title}</Typography>
      </Box>
      <DialogContent id="alert-dialog-description">{text}</DialogContent>
      <DialogActions>
        {!hideButton && <Button onClick={handleClose}>OK</Button>}
      </DialogActions>
    </Dialog>
  );
};
