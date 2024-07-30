export function TopTitleBody({ children }: any) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0.5rem",
        padding: "1rem",
        paddingTop: "2rem",
      }}
    >
      {children}
    </div>
  );
}
