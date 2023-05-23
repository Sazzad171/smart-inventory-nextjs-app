import { createContext, useContext, useState } from "react";

// create
const ModalHandleContext = createContext();

// for use
export function useModalHandleContext () {
  return useContext(ModalHandleContext);
}

export function ModalHandleContextProvider({ children }) {
  const [ addProductModal, setAddProductModal ] = useState(false);
  const [ deleteProductModal, setDeleteProductModal ] = useState(false);

  return (
    <ModalHandleContext.Provider value={{
      addProductModal,
      setAddProductModal,
      deleteProductModal,
      setDeleteProductModal
    }}>
      { children }
    </ModalHandleContext.Provider>
  )
}