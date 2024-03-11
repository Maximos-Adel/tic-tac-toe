import { useContext } from "react";
import { ModalContext, ModalContextType } from "../../context/ModalContext";
import { GameContext, GameContextType } from "../../context/GameContext";

const Restart = () => {
  const { hideModal } = useContext(ModalContext) as ModalContextType;
  const { handleReset } = useContext(GameContext) as GameContextType;
  return (
    <div className="restart">
      <h3 className="restart__title">Restart Game?</h3>
      <div className="restart__btns">
        <button className="btn btn-sm" onClick={hideModal}>
          no, cancal
        </button>
        <button className="btn btn-yellow btn-sm" onClick={handleReset}>
          yes, restart
        </button>
      </div>
    </div>
  );
};

export default Restart;
