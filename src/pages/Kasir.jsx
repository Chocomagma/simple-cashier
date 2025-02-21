import React, { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useProductList } from "../contexts/ProductContext";

export default function Kasir() {
  //product diambil dari context ProductContext dan set daftarBarang dengan nama product
  const products = useProductList();
  let daftarBarang = products.map((product) => product["Nama Barang"]);
  // console.log("daftarBarang : " + JSON.stringify(products));

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [jumlahBayar, setJumlahBayar] = useState();

  //Reducer
  // const [orderedItems, setOrderedItems] = useState([]);
  const [orderedItems, dispatch] = useReducer(reducer, []);

  function reducer(orderedItems, action) {
    switch (action.type) {
      case "ADD_ITEM":
        const existingItemIndex = orderedItems.findIndex(
          (item) => item.orderName === action.orderName
        );
        if (existingItemIndex !== -1) {
          const updateOrderedItems = [...orderedItems];
          updateOrderedItems[existingItemIndex]["orderQuantity"] += 1;
          return updateOrderedItems;
        } else {
          return [
            ...orderedItems,
            {
              orderName: action.orderName,
              orderPrice: action.orderPrice,
              orderQuantity: 1,
            },
          ];
        }
      case "REMOVE_ITEM":
        return orderedItems.filter((_, index) => index !== action.orderIndex);
      case "CLEAR":
        return [];
      default:
        throw new Error();
    }
  }

  //Handling input text
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filtered = daftarBarang.filter((barang) =>
        barang.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (barang) => {
    //cari harga barang dengan nama barang "barang"
    let orderdetails = products.find(
      (produk) => produk["Nama Barang"] === barang
    );
    if (orderdetails) {
      dispatch({
        type: "ADD_ITEM",
        orderName: orderdetails["Nama Barang"],
        orderPrice: orderdetails["Harga Barang"],
      });
    } else {
      console.log("Barang Tidak ada di Daftar Master");
    }

    setInput(""); // Kosongkan input setelah memilih
    setSuggestions([]); // Sembunyikan saran setelah memilih
  };

  function handleRemoveItem(index) {
    dispatch({ type: "REMOVE_ITEM", orderIndex: index });
  }

  useEffect(() => {
    console.log("Daftar order terupdate:", orderedItems);
    const totalbayar = pembayaran(orderedItems);
    console.log("Total Bayar: " + totalbayar);
  }, [orderedItems]);

  //Menentukan Jumlah Pembayaran
  function pembayaran(order) {
    let bayar = 0;
    order.forEach((item) => {
      bayar += item.orderQuantity * item.orderPrice;
    });
    const bayarTerformat = toRupiahFormat(bayar, 2);
    setJumlahBayar(bayarTerformat);
    console.log("F Pembayaran: " + bayarTerformat);
    return bayarTerformat;
  }

  function toRupiahFormat(angka, decimal = 0) {
    return (
      "Rp " + angka.toLocaleString("id-ID", { minimumFractionDigits: decimal })
    );
  }

  return (
    <div style={{ width: "300px", margin: "20px auto", textAlign: "center" }}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Cari barang..."
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            textAlign: "left",
            background: "white",
            position: "absolute",
            width: "280px",
          }}
        >
          {suggestions.map((barang, index) => (
            <li
              key={index}
              onClick={() => handleSelect(barang)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
              onMouseOver={(e) => (e.target.style.background = "#f0f0f0")}
              onMouseOut={(e) => (e.target.style.background = "white")}
            >
              {barang}
            </li>
          ))}
        </ul>
      )}

      {/* <button onClick={() => dispatch({ type: "ADD_ITEM", numb: "1" })}>
        1
      </button> */}
      <h3>Daftar Order</h3>
      <ul>
        {orderedItems.map((item, index) => (
          <li key={index}>
            {item.orderName} - ({item.orderQuantity}x
            {toRupiahFormat(item.orderPrice * item.orderQuantity)})
            <button onClick={() => handleRemoveItem(index)}>❌</button>
          </li>
        ))}
      </ul>

      <h4>
        Total Pembayaran : <p>{jumlahBayar}</p>
      </h4>
      <h3>Metode Bayar</h3>
      <button onClick={() => alert("CASH")}>Cash</button>
      <button onClick={() => alert("QRIS")}>QRIS</button>
      {/* Ini harusnya mbalik ke App feed */}
    </div>
  );
}
