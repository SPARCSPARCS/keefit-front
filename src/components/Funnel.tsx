export function Funnel({
  isOpen,
  children,
}: {
  isOpen?: boolean;
  children?: any;
}) {
  if (!isOpen) {
    return <></>;
  }
  return <div>{children}</div>;
}
