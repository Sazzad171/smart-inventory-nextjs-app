import { createContext, useContext, useState } from "react";

// create
const ModalHandleContext = createContext();

// for use
export function useModalHandleContext () {
  return useContext(ModalHandleContext);
}

export function ModalHandleContextProvider({ children }) {
  const [ addProductModal, setAddProductModal ] = useState(false);

  return (
    <ModalHandleContext.Provider value={{
      addProductModal,
      setAddProductModal
    }}>
      { children }
    </ModalHandleContext.Provider>
  )
}