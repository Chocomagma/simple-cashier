import { useState } from "react";
import IconButton from "../components/IconButton";
import { useProductList } from "../contexts/ProductContext";

/*Halaman Master -> Berisi Tabel daftar barang dengan rincian kode, nama, harga kategori barang dan dilengkapi dengan aksi edit dan hapus
 */
export default function Master() {
  const products = useProductList();
  const [statusLoggin, setStatusLoggin] = useState(0);

  console.log(statusLoggin);
  return (
    <>
      <div>
        <h1>INI Halaman Master</h1>
        <div className="tabel_barang">
          <h2>Daftar Barang</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Harga Barang</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product["Kode Barang"]}>
                  <td>{product["Kode Barang"]}</td>
                  <td>{product["Nama Barang"]}</td>
                  <td>{product["Harga Barang"]}</td>
                  <td>{product["Kategori"]}</td>
                  <td>
                    <div
                      style={{ display: "flex", gap: "10px", padding: "10px" }}
                    >
                      <IconButton
                        icon="✏️"
                        onClick={() => alert("Edit " + product["Nama Barang"])}
                        color="#4CAF50"
                      />
                      <IconButton
                        icon="🗑️"
                        onClick={() =>
                          alert("Delete " + product["Nama Barang"])
                        }
                        color="#FFC107"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
