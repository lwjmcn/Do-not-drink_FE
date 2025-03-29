import BackButton from "@component/BackButton";

export default function CategoryLayout({
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
