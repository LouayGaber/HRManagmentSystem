import React from "react";
import logo from "./logo.svg";
import "./stylesheets/global.css";
import "./App.css";
import { Layout } from "./components/common/Layout";
import Login from "./components/Login";
import { Provider } from "react-redux";
// import { Typography } from "@mui/material";
import { makeStore } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { WorkerList } from "./components/WorkerList";
function App() {
  return (
    <div className="App">
      <Provider store={makeStore()}>
        <BrowserRouter>
          <Layout />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
