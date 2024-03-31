import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyRoutes from "./routes/MyRoutes";
import { BooksProvider } from "./contexts/BooksContextProvider"

function App() {
  return (
    <BooksProvider>
        <div id="page-container">
          <Header id="header" />
          <div id="content-wrap">
            <MyRoutes />
          </div>
          <Footer id="footer" />
        </div>
    </BooksProvider>
  );
}

export default App;
