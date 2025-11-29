import "./App.css";
import Light from "./components/Light";
import Arduino from "./components/Arduino.js";
import SerialMonitor from "./components/SerialMonitor.js";
import { useState, useMemo, useCallback, useEffect } from "react";
import HouseMapDay from "./assets/House_map.png";
import HouseMapNight from "./assets/House_map_night.png"; 

function App() {
  const [connection, setConnection] = useState(null);
  const [isNight, setIsNight] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleSerialData = useCallback((data) => {
    setIsNight(data);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }, [currentTime]);

  const appClasses = isNight ? "App dark-mode" : "App";
  const mapImage = isNight ? HouseMapNight : HouseMapDay;
  const statusText = isNight ? "Boa Noite 🌙" : "Bom Dia ☀️";

  return (
    <div className={appClasses}>
      {connection && <SerialMonitor connection={connection} onDataReceived={handleSerialData} />}

      <header className="App-header">
        {/* O texto principal do cabeçalho pode ficar aqui ou ser movido para o CSS/layout */}
        <p className="header-title">Interface da Casa Automática</p> 

        {/* BARRA DE STATUS MOVIDA PARA DENTRO DO HEADER */}
        <div className="status-bar">
          <p className="status-text">{statusText}</p>
          <p className="time-text">{formattedTime}</p>
        </div>
      </header>
      {/* ----------------------------------------------- */}

      <div className="controls">
        <Arduino onConnect={setConnection} connection={connection} />
        {connection && <p className="connection-status">✅ Arduino conectado!</p>}
      </div>

      <div className="house-container" style={{ backgroundImage: `url(${mapImage})` }}>
        <div className="Light1">
          <Light id="a" connection={connection} />
        </div>
        <div className="Light2">
          <Light id="s" connection={connection} />
        </div>
        <div className="Light3">
          <Light id="d" connection={connection} />
        </div>
        <div className="Light4">
          <Light id="f" connection={connection} />
        </div>
        <div className="Light5">
          <Light id="g" connection={connection} />
        </div>
      </div>
    </div>
  );
}

export default App;