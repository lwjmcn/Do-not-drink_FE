import BackButton from "@component/BackButton";
import SignUpFormProvider from "./_component/SignUpFormProvider";

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignUpFormProvider>
      <BackButton />
      {children}
    </SignUpFormProvider>
  );
};
export default SignUpLayout;
