"use client";
import {
  Box,
  Backdrop,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { useRouterWrapper } from "app/home/_component/page_transition/RouterWrapperContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ModalContainerProps {
  children: React.ReactNode;
  onClickPositive?: () => void;
}
export default function ModalContainer(props: ModalContainerProps) {
  const router = useRouter();
  const { setTransitionDisable } = useRouterWrapper();

  const onClickPositive = () => {
    if (props.onClickPositive) {
      props.onClickPositive();
    } else {
      setTransitionDisable(true);
      router.back();
    }
  };
  const onClickNegative = () => {
    setTransitionDisable(true);
    router.back();
  };

  return (
    <>
      <Backdrop open sx={{ zIndex: 1001, backdropFilter: "blur(5px)" }}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              width: "300px",
              bgcolor: "#fff",
              boxShadow: 24,
              borderRadius: 4,
              padding: 4,
              paddingBottom: 2,
            }}
          >
            {props.children}
            <Stack
              direction="row"
              spacing={2}
              alignItems={"center"}
              justifySelf={"center"}
            >
              <Button variant="text" onClick={onClickPositive}>
                <Typography variant="button" color="#717171">
                  확인
                </Typography>
              </Button>
              <Divider
                orientation="vertical"
                style={{ height: 16, border: "1px solid #717171" }}
              />
              <Button variant="text" onClick={onClickNegative}>
                <Typography variant="button" color="#717171">
                  취소
                </Typography>
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Backdrop>
    </>
  );
}
