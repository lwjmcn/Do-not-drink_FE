import OrderIndicator from "../_component/OrderIndicator";

export default function SignUpTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationOrder = [
    "/auth/signup",
    "/auth/signup/profile",
    "/auth/signup/theme",
  ];

  return (
    <>
      <OrderIndicator navigationOrder={navigationOrder} />
      {children}
    </>
  );
}
