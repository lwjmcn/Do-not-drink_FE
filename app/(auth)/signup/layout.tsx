import SignUpFormProvider from "./_component/SignUpFormProvider";

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <SignUpFormProvider>{children}</SignUpFormProvider>;
};
export default SignUpLayout;
