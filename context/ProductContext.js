import React, { createContext, useContext, useState } from "react";

// create context
const ProductContext = createContext();

// use this context by function
export function useProductContext() {
  return useContext(ProductContext);
}

// provider function
export function ProductContextProvider({ children }) {
  // states
  const [products, setProducts] = useState([]);
  const [prodCategory, setProdCategory] = useState([]);
  const [selectedProdId, setSelectedProdId] = useState(null);

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      prodCategory,
      setProdCategory,
      selectedProdId,
      setSelectedProdId
    }}>
      { children }
    </ProductContext.Provider>
  )
}