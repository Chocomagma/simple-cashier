//import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import products from "../daftar.json";

const ProductContext = createContext();

// Data Barang
//dari local json
const productList = products;

// Dari API
/*
const [productList, setproductList] = useState([]);
  useEffect(() => {
  fetch("https://myapi.com/products.json")
    .then((response) => response.json())
    .then((data) => setproductList(data))
    .catch((error) => console.error("Gagal mengambil data:", error));
}, []);
*/

export const ProductProvider = ({ children }) => {
  //   console.log("Provider called");
  return (
    <ProductContext.Provider value={productList}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductList = () => useContext(ProductContext);
