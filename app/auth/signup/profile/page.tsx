import ProfileForm from "../../_component/ProfileForm";
import { Stack, Typography } from "@mui/material";

const AddProfile = () => {
  return (
    <Stack direction="column" spacing={6} marginY={"auto"} marginX={2}>
      <div
        style={{
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" alignSelf={"center"} color="#717171">
          <span style={{ color: "#FE9600" }}>프로필</span>을 설정하세요
        </Typography>
        <Typography variant="body2" alignSelf={"center"} color="#717171">
          닉네임과 아이디는 친구들에게 보여지는 정보예요.
        </Typography>
      </div>

      {/* Additional Info (nickname, account-id) */}
      <ProfileForm />
    </Stack>
  );
};
export default AddProfile;
