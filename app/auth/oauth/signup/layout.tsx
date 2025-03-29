import { Suspense } from "react";
import OAuthSignUpFormProvider from "./_component/OAuthSignUpFormProvider";
import BackButton from "@component/BackButton";

const OAuthSignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OAuthSignUpFormProvider>
      <BackButton />

      {/* useSearchParams should be wrapped in a Suspense boundary */}
      <Suspense>{children}</Suspense>
    </OAuthSignUpFormProvider>
  );
};
export default OAuthSignUpLayout;
