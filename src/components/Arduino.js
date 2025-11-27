import React from "react";

export default function Arduino({ onConnect }) {
  const connectSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const textEncoder = new TextEncoderStream();
      const writableClosed = textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();

      const textDecoder = new TextDecoderStream();
      const readableClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      console.log("✅ Conectado ao Arduino!");
      onConnect({ port, reader, writer });
    } catch (err) {
      console.error("Erro ao conectar:", err);
    }
  };

  return (
    <button
      onClick={connectSerial}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        backgroundColor: "#eee",
        border: "2px solid #222",
        cursor: "pointer",
      }}
    >
      🔌 Conectar Arduino
    </button>
  );
}
