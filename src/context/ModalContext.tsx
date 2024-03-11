import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type ContainerProps = { children: ReactNode };

export interface ModalContextType {
  show: boolean;
  modaleModel: string;
  showModal: () => void;
  hideModal: () => void;
  setModalMode: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalState = (props: ContainerProps) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("winner"); // start || winner

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  return (
    <ModalContext.Provider
      value={{
        show,
        modaleModel: mode,
        showModal,
        hideModal,
        setModalMode: setMode,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalState };
