export function TopTitleBody({ children }: any) {
  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        left: "0.5rem",
        padding: "1rem",
        paddingTop: "2.5rem",
      }}
    >
      {children}
    </div>
  );
}
