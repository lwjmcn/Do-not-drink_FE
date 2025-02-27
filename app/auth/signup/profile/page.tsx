import ProfileForm from "../../_component/ProfileForm";
import { Stack, Typography } from "@mui/material";

const AddProfile = () => {
  return (
    <Stack direction={"column"} spacing={2}>
      <Typography variant="h2">Add your profile</Typography>

      {/* Additional Info (nickname, account-id) */}
      <ProfileForm />
    </Stack>
  );
};
export default AddProfile;
