export default function IconButton({ icon, onClick, color }) {
  return (
    <>
      <button
        onClick={onClick}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: color || "#4CAF50",
          color: "white",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = color || "#4CAF50")
        }
      >
        {icon}
      </button>
    </>
  );
}

{
  /* Implement 
  <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
  <IconButton icon="✏️" onClick={() => alert("Edit")} color="#4CAF50" />
  <IconButton icon="❌" onClick={() => alert("Hapus")} color="#FF5733" />
  <IconButton icon="🗑️" onClick={() => alert("Delete")} color="#FFC107" />
</div>; */
}
