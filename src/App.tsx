import { useContext } from "react";
import { GameContext, GameContextType } from "./context/GameContext";
import Board from "./components/board";
import Modal from "./components/modal";
import Start from "./components/start";

function App() {
  // const GameState = useContext(GameContext);
  // if (!GameState) return null;
  // const { screen } = GameState;

  const { screen } = useContext(GameContext) as GameContextType;

  return (
    <div className="App">
      <div className="container">
        {screen === "start" ? <Start /> : <Board />}
      </div>
      <Modal />
    </div>
  );
}
export default App;
