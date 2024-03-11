import { useContext } from "react";
import { GameContext, GameContextType } from "../../context/GameContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

const BoardCard = ({
  active,
  user = "nouser",
  index,
}: {
  active: boolean | string | null;
  user: string;
  index: number;
}) => {
  const { handleSquareClick } = useContext(GameContext) as GameContextType;
  return (
    <div
      className={`card ${active && user === "x" && "shadow-blue"} ${
        active && user === "o" && "shadow-yellow"
      } ${active ? "active" : "shadow-gray"}`}
      onClick={() => handleSquareClick(index)}
    >
      {user === "x" && <Xicon color={active && "dark"} size="lg" />}
      {user === "o" && <Oicon color={active && "dark"} size="lg" />}
    </div>
  );
};

export default BoardCard;
