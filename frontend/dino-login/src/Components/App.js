import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "../Pages/GamePage";
import CreateAccountPage from "../Pages/CreateAccountPage";
import React from "react";
import "../App.css";

function App() {
  const changeUser = () => {
    console.log("user changed");
  };
  return (
    <BrowserRouter>
      <h1>Hello world</h1>
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route
          path="/create-account"
          element={<CreateAccountPage changeUser={changeUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
