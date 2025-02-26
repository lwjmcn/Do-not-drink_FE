import { Card as MuiCard, alpha, Stack, styled, Modal } from "@mui/material";

const Background = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: 40,
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundColor: alpha(theme.palette.background.default, 0.1),
    backdropFilter: "blur(5px)",
  },
}));
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: 35,
  gap: 20,
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "500px",
    paddingLeft: 75,
    paddingRight: 75,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "700px",
    paddingLeft: 175,
    paddingRight: 175,
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  background: "!important background.default",
}));

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Modal open sx={{ zIndex: 1001 }}>
      <Background>
        <Card variant="outlined">{children}</Card>
      </Background>
    </Modal>
  );
};
export default ModalContainer;
