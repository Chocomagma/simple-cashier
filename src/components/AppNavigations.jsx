export default function AppNavigation({ onUpdatePage }) {
  return (
    <>
      <nav>
        <button onClick={() => onUpdatePage("home")}>Home</button>
        <button onClick={() => onUpdatePage("kasir")}>Kasir</button>
        <button onClick={() => onUpdatePage("master")}>Master</button>
        <button onClick={() => onUpdatePage("boxone")}>Box 1</button>
      </nav>
    </>
  );
}
