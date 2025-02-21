import React, { useState } from "react";

const MessageBoxOne = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="relative h-screen flex justify-center items-center bg-gray-100">
      {/* Button untuk menampilkan pesan */}
      <button
        onClick={() => setShowMessage(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg z-10"
      >
        Tampilkan Pesan
      </button>

      {/* Box Message (Modal) */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl relative w-96">
            <h2 className="text-xl font-bold">Pesan Penting</h2>
            <p className="mt-2 text-gray-700">
              Ini adalah pesan yang ditampilkan di atas tombol.
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBoxOne;
