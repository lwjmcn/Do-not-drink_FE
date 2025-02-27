import { Suspense } from "react";
import OAuthSignUpFormProvider from "./_component/OAuthSignUpFormProvider";

const OAuthSignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OAuthSignUpFormProvider>
      {/* useSearchParams should be wrapped in a Suspense boundary */}
      <Suspense>{children}</Suspense>
    </OAuthSignUpFormProvider>
  );
};
export default OAuthSignUpLayout;
