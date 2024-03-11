import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalState } from "./context/ModalContext";
import { GameState } from "./context/GameContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalState>
      <GameState>
        <App />
      </GameState>
    </ModalState>
  </React.StrictMode>
);
