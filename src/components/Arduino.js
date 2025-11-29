import React, { useState } from "react";

export default function Arduino({ onConnect, connection }) {
  const [loading, setLoading] = useState(false);

  const connectSerial = async () => {
    if (connection) return;
    
    setLoading(true);
    try {
      const port = await navigator.serial.requestPort();
      
      await port.open({ baudRate: 9600 });

      const textEncoder = new TextEncoderStream();
      textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      console.log("✅ Conectado ao Arduino!");
      onConnect({ port, reader, writer });
      
    } catch (err) {
      console.error("Erro ao conectar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={connectSerial}
      disabled={loading || connection}
      style={{
        padding: "10px 20px",
        borderRadius: "6px",
        backgroundColor: connection ? "#28a745" : loading ? "#ccc" : "#0c9bf5",
        color: "white",
        border: "none",
        cursor: connection ? "default" : loading ? "not-allowed" : "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
        opacity: loading ? 0.7 : 1,
      }}
      onMouseOver={(e) => {
        if (!connection && !loading) {
          e.currentTarget.style.backgroundColor = "#087dc2";
        }
      }}
      onMouseOut={(e) => {
        if (!connection && !loading) {
          e.currentTarget.style.backgroundColor = "#0c9bf5";
        }
      }}
    >
      {connection ? "🔌 Conectado" : loading ? "🔄 Conectando..." : "🔌 Conectar Arduino"}
    </button>
  );
}