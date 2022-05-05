import { useState } from "react";
import Head from "./components/containers/Head";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.custom.scss";
import "./App.css";

function App() {
  return (
    <>
      <Head />
      <Header />
      <Footer />
    </>
  );
}

export default App;
