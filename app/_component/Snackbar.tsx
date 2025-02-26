import {
  Alert,
  Snackbar as MuiSnackbar,
  Slide,
  SlideProps,
} from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

interface ISnackbarProps {
  msg: string;
  open: boolean;
  onClose: () => void;
}
const Snackbar = (props: ISnackbarProps) => {
  return (
    <MuiSnackbar
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={SlideTransition}
      message={props.msg}
      autoHideDuration={1200}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        width: "90vw",
        height: "20px",
        position: "fixed",
        top: "calc(100vh - 60px)",
        left: "105vw",
      }}
    >
      <Alert
        severity="info"
        sx={{
          padding: "4px 10px",
          fontSize: "16px",
          width: "100%",
        }}
      >
        {props.msg}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
