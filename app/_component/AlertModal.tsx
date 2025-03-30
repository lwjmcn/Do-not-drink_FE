"use client";
import { Stack, Backdrop, Button, Typography } from "@mui/material";
import { useRouterWrapper } from "app/home/_component/page_transition/RouterWrapperContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface AlertModalProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function AlertModal(props: AlertModalProps) {
  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  const onClickClose = () => {
    setTransitionDisable(true);
    router.back();
  };

  return (
    <>
      <Backdrop open sx={{ zIndex: 1002, backdropFilter: "blur(5px)" }}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Stack
            direction="column"
            sx={{
              width: "300px",
              bgcolor: "#fff",
              boxShadow: 24,
              borderRadius: 4,
              padding: 4,
              paddingBottom: 2,
              alignItems: "center",
            }}
          >
            {props.children}
            <Button
              variant="text"
              onClick={onClickClose}
              style={{ marginTop: 4, marginBottom: 0 }}
            >
              <Typography variant="button" color="#717171">
                확인
              </Typography>
            </Button>
          </Stack>
        </motion.div>
      </Backdrop>
    </>
  );
}
