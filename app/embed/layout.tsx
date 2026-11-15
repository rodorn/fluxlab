export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{".cookie-consent{display:none!important}"}</style>
      {children}
    </>
  );
}
