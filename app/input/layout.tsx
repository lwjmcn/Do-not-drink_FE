import BackButton from "@component/BackButton";

export default function InputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
}
