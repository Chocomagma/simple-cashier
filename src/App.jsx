import { useState, Component } from "react";
import "./App.css";
import { ProductProvider } from "./contexts/ProductContext";
import AppNavigation from "./components/AppNavigations";
import Home from "./pages/Home";
import Kasir from "./pages/Kasir";
import Master from "./pages/Master";
import MessageBoxOne from "./components/MessageBoxOne";

function App() {
  const [page, setPage] = useState("home");
  const updatePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <ProductProvider>
        <AppNavigation onUpdatePage={updatePage} />
        <div>{page === "home" && <Home />}</div>
        <div>{page === "kasir" && <Kasir />}</div>
        <div>{page === "master" && <Master />}</div>
        <div>{page === "boxone" && <MessageBoxOne />}</div>
      </ProductProvider>
    </>
  );
}

export default App;
