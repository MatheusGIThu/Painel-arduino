import React, { useState } from "react";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";

export default function Light({ id, connection }) {
  const [lightOn, setLightOn] = useState(false);

  const command = id.toString();

  const handleClick = async () => {
    setLightOn(!lightOn);

    if (connection?.writer) {
      try {
        await connection.writer.write(command);
        console.log(`📤 Enviado: ${command}`);
      } catch (err) {
        console.error("Erro ao enviar comando:", err);
      }
    } else {
      console.warn("⚠️ Arduino não conectado!");
    }
  };

  return (
    <div className="light">
      {lightOn ? (
        <FaLightbulb
          size={35}
          color="#F4CD14"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <FaRegLightbulb
          size={35}
          color="#6c757d"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
}