import PageTransition from "./_component/page_transition/PageTransition";

export default function HomeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
