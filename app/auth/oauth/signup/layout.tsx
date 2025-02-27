import OAuthSignUpFormProvider from "./_component/OAuthSignUpFormProvider";

const OAuthSignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <OAuthSignUpFormProvider>{children}</OAuthSignUpFormProvider>;
};
export default OAuthSignUpLayout;
