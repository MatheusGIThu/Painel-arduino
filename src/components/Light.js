import React, { useState } from "react";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";

export default function Light({ connection }) {
  const [lightOn, setLightOn] = useState(false);

  const handleClick = async () => {
    setLightOn(!lightOn);

    if (connection?.writer) {
      try {
        await connection.writer.write("a");
        console.log("📤 Enviado: a");
      } catch (err) {
        console.error("Erro ao enviar comando:", err);
      }
    } else {
      console.warn("⚠️ Arduino não conectado!");
    }
  };

  return (
    <div className="light" style={{ cursor: "pointer" }}>
      {lightOn ? (
        <FaLightbulb size={45} color="#F4CD14" onClick={handleClick} />
      ) : (
        <FaRegLightbulb size={45} color="gray" onClick={handleClick} />
      )}
    </div>
  );
}
