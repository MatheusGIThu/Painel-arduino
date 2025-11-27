import React, { useState } from "react";
import { MdCurtainsClosed, GiTheaterCurtains } from "react-icons/md";

export default function Courtain() {
  const [Courtain, setCourtain] = useState(false);
  const handleClick = () => {
    setCourtain(!Courtain);
  };

  return (
    <div className="light">
      {Courtain ? (
        <GiTheaterCurtains size={45} color="gray" onClick={handleClick} />
      ) : (
        <MdCurtainsClosed size={45} color="gray" onClick={handleClick} />
      )}
    </div>
  );
}
