// ConnectFour.js

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Board from "./Board";

const ConnectFour = ({ player }) => {
  const [vsPlayer, setVsPlayer] = useState(player);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRestartMenuOpen, setIsRestartMenuOpen] = useState(true);

  const [selectedStarter, setSelectedStarter] = useState(null);
  let whoStarts = null;
  const handleOptionClick = (option) => {
    whoStarts = option;
    const buttons = document.querySelectorAll(".restart-menu button");
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
    }
  };

  const [turn, setTurn] = useState("Player");

  const toggleBot = () => {
    setVsPlayer(!vsPlayer);
  };

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
    if (vsPlayer) {
      window.location.href = "/cpu-vs-cpu";
    } else {
      window.location.href = "/vs-cpu";
    }
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
          vsPlayer={vsPlayer}
          setTurn={setTurn}
          selectedStarter={selectedStarter}
        />
      )}

      {isRestartMenuOpen && (
        <div className="modal">
          <div className="restart-menu menu-content">
            <h2>Who starts first?</h2>
            <button
              onClick={
                vsPlayer
                  ? () => handleOptionClick("Player")
                  : () => handleOptionClick("Monty carlo")
              }
            >
              {vsPlayer ? "Player" : "Monty carlo"}
            </button>
            <button
              onClick={
                vsPlayer
                  ? () => handleOptionClick("CPU")
                  : () => handleOptionClick("Min Max")
              }
            >
              {vsPlayer ? "CPU" : "Min Max"}
            </button>
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
            <Link
              onClick={changeMode}
              className="link"
              to={vsPlayer ? "/cpu-vs-cpu" : "/vs-cpu"}
            >
              {vsPlayer ? "CPU vs CPU" : "Player vs CPU"}
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

export default ConnectFour;
