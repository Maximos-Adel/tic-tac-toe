import {
  createContext,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import calcBestMove, { calcWinner } from "../helpers/calcSquares";
import { ModalContext, ModalContextType } from "./ModalContext";

type Ties = { x: number; o: number };
type ContainerProps = { children: ReactNode };

export interface GameContextType {
  squares: Array<string>;
  winner: string | null;
  winnerLine: Array<number> | null;
  xnext: boolean;
  ties: Ties;
  screen: string;
  activeUser: string;
  playMode: string;
  handleStart: (value: string) => void;
  setActiveUser: Dispatch<SetStateAction<string>>;
  setPlayMode: Dispatch<SetStateAction<string>>;
  setTies: Dispatch<SetStateAction<Ties>>;
  handleSquareClick: (value: number) => void;
  handleReset: () => void;
  handleNextRound: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameState = (props: ContainerProps) => {
  const [screen, setScreen] = useState("start"); // start || game
  const [playMode, setPlayMode] = useState("user"); // user || cpu
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerLine, setWinnerLine] = useState<Array<number> | null>(null);
  const [ties, setTies] = useState<Ties>({ x: 0, o: 0 });

  const { showModal, hideModal, setModalMode } = useContext(
    ModalContext
  ) as ModalContextType;

  useEffect(() => {
    //check if cpu turn
    const currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser && !winner) {
      cpuNextMove(squares);
    }
    checkNoWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xnext, winner, screen]);

  const handleStart = (player: string) => {
    setPlayMode(player);
    setScreen("game");
  };

  const handleSquareClick = (ix: number) => {
    if (squares[ix] || winner) {
      return;
    }
    const currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser) {
      return;
    }
    const ns = [...squares];
    ns[ix] = !xnext ? "x" : "o";
    setSquares(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };

  const checkWinner = (ns: Array<string>) => {
    const isWinner = calcWinner(ns);
    if (isWinner) {
      setWinner(isWinner.winner);
      setWinnerLine(isWinner.line);
      const nties = { ...ties };
      // nties[isWinner.winner] += 1;
      nties[isWinner.winner as keyof typeof nties] += 1;
      console.log(nties);

      setTies(nties);
      showModal();
      setModalMode("winner");
    }
  };

  const cpuNextMove = (sqrs: Array<string>) => {
    const bestmove = calcBestMove(sqrs, activeUser === "x" ? "o" : "x");
    const ns = [...squares];
    if (bestmove) {
      ns[bestmove] = !xnext ? "x" : "o";
      setSquares(ns);
      setXnext(!xnext);
      checkWinner(ns);
    }
  };

  const handleReset = () => {
    setSquares(new Array(9).fill(""));
    setXnext(false);
    setWinner(null);
    setWinnerLine(null);
    setActiveUser("x");
    setTies({ x: 0, o: 0 });
    hideModal();
    setScreen("start");
  };

  const handleNextRound = () => {
    setSquares(new Array(9).fill(""));
    setXnext(winner === "x");
    setWinner(null);
    setWinnerLine(null);
    hideModal();
  };

  const checkNoWinner = () => {
    const moves = squares.filter((sq) => sq === "");
    if (moves.length === 0) {
      setWinner("no");
      showModal();
      setModalMode("winner");
    }
  };

  return (
    <GameContext.Provider
      value={{
        squares,
        winner,
        winnerLine,
        xnext,
        ties,
        screen,
        activeUser,
        playMode,
        handleStart,
        setActiveUser,
        setPlayMode,
        setTies,
        handleSquareClick,
        handleReset,
        handleNextRound,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };
