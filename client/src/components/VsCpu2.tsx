// VsCpu2.js

import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Board from "./Board";

const VsCpu2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRestartMenuOpen, setIsRestartMenuOpen] = useState(true);
  const [selectedStarter, setSelectedStarter] = useState(null);
  let whoStarts = null;

  const handleOptionClick = (option) => {
    // setSelectedStarter(option);
    whoStarts = option;
    const buttons = document.querySelectorAll(".restart-menu button");
    console.log(buttons);
    for (let i = 0; i < buttons.length - 2; i++) {
      buttons[i].classList.remove("inactive");
      if (buttons[i].innerHTML != option) {
        buttons[i].classList.add("inactive");
      }
    }
  };

  const handleStartClick = () => {
    if (whoStarts) {
      setIsRestartMenuOpen(false);
      setSelectedStarter(whoStarts);
    } else {
      return alert("Please select who starts first!");
    }
  };

  const [turn, setTurn] = useState("Player");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMainMenu = () => {
    setIsRestartMenuOpen(false);
    setIsMenuOpen(true);
  };

  const changeMode = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsRestartMenuOpen(true);
    // window.location.href = "/cpu-vs-cpu"
  };

  const restart = () => {
    window.location.reload();
  };

  return (
    <div className="main-connect4">
      <h1>Connect Four</h1>
      <div className="submenu">
        <button onClick={toggleMenu}>Menu</button>
        <h3 className="turn">{turn}'s turn</h3>
        <button className="restart" onClick={restart}>
          Restart
        </button>
      </div>
      {selectedStarter && (
        <Board
          setTurn={setTurn}
          selectedStarter={selectedStarter}
          whichCpu={2}
        />
      )}

      {isRestartMenuOpen && (
        <div className="modal">
          <div className="restart-menu menu-content">
            <h2>Who starts first? </h2>
            <button onClick={() => handleOptionClick("Player")}>Player</button>
            <button onClick={() => handleOptionClick("CPU")}>CPU</button>
            <button className="greenBtn" onClick={handleStartClick}>
              Start
            </button>
            <button className="redBtn" onClick={handleMainMenu}>
              Main Menu
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isMenuOpen && (
        <div className="modal">
          <div className="menu-content">
            <button onClick={restart}>Restart</button>
            <Link onClick={changeMode} className="link" to={"/vs-cpu"}>
              {"Player vs CPU (counting pieces)"}
            </Link>
            <Link onClick={changeMode} className="link" to={"/cpu-vs-cpu"}>
              {"CPU vs CPU"}
            </Link>
            <button className="redBtn" onClick={closeMenu}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VsCpu2;
