import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Header from "./components/Header";

const App = () => (
  <BrowserRouter>
    <Header />
    <Router />
  </BrowserRouter>
);

export default App;
