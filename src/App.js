import "./App.css";
import Light from "./components/Light";
import Arduino from "./components/Arduino.js";
import { useState } from "react";

function App() {
  const [connection, setConnection] = useState(null);

  return (
    <div className="App">
      <header className="App-header">Interface da Casa Automática</header>

      <div className="controls">
        <Arduino onConnect={setConnection} />
        {connection && <p>✅ Arduino conectado!</p>}
      </div>

      <div className="house-container">
        <div className="Light1">
          <Light id="1" connection={connection} />
        </div>
        <div className="Light2">
          <Light id="2" connection={connection} />
        </div>
        <div className="Light3">
          <Light id="3" connection={connection} />
        </div>
        <div className="Light4">
          <Light id="4" connection={connection} />
        </div>
        <div className="Light5">
          <Light id="5" connection={connection} />
        </div>
      </div>
    </div>
  );
}

export default App;
