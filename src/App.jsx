import { useState } from "react";
import Head from "./components/containers/Head";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useRoutes } from "react-router-dom";
import { appRoute } from "./routes";

function App() {
  const routes = useRoutes(appRoute);
  return (
    <>
      <Head />
      <Header />
      <div>{routes}</div>
      <Footer />
    </>
  );
}

export default App;
