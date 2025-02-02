import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref } from "react";

interface INotReadyAlertProps {
  open: boolean;
  onClose: () => void;
}
export default function NotReadyAlert(props: INotReadyAlertProps) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
    >
      <Card variant="outlined">
        <CardContent>
          <MiscellaneousServicesRoundedIcon fontSize="large" />
          <Typography gutterBottom sx={{ fontWeight: 600 }}>
            Service not ready
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            This service is not ready yet. Please check back later.
          </Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={props.onClose}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
