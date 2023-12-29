// // CpuVsCpu.js

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import Column from "./board/column";
// const CpuVsCpu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isRestartMenuOpen, setIsRestartMenuOpen] = useState(true);
//   const [selectedStarter, setSelectedStarter] = useState(null);
//   const [whichCpu, setWhichCpu] = useState(null);

//   let whoStarts = null;
//   const handleOptionClick = (option) => {
//     whoStarts = option;
//     const buttons = document.querySelectorAll(".restart-menu button");
//     console.log(buttons);
//     for (let i = 0; i < buttons.length - 2; i++) {
//       buttons[i].classList.remove("inactive");
//       if (buttons[i].innerHTML != option) {
//         buttons[i].classList.add("inactive");
//       }
//     }
//   };

//   const [turn, setTurn] = useState(null);

//   const changeTurn = (who) => {
//     if (who == 1) {
//       setTurn("MM pieces");
//     } else {
//       setTurn("MM positions");
//     }
//   };
//   const handleStartClick = () => {
//     if (whoStarts) {
//       setIsRestartMenuOpen(false);
//       setTurn(whoStarts);
//       if (whoStarts === "MM positions") {
//         setWhichCpu(2);
//       } else {
//         setWhichCpu(1);
//       }
//       setSelectedStarter(whoStarts);
//     } else {
//       return alert("Please select who starts first!");
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleMainMenu = () => {
//     setIsRestartMenuOpen(false);
//     setIsMenuOpen(true);
//   };

//   const changeMode = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setIsRestartMenuOpen(true);
//     // window.location.href = "/vs-cpu"
//   };

//   const restart = () => {
//     window.location.reload();
//   };

//   console.log(selectedStarter);
//   const initialBoardState = [
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//   ];

//   // fetch the initial board state from the server

//   function transpose(matrix) {
//     return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
//   }

//   const [board, setBoard] = useState(transpose(initialBoardState));
//   const [canIChoose, setCanIChoose] = useState(true);

//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const untransposedBoard = transpose(board);
//         console.log("the turn of the cpu ", whichCpu);

//         const BotMoveResponse = await fetch("http://localhost:5000/get_move", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             cpu: whichCpu,
//             board: untransposedBoard,
//           }),
//         });

//         if (!BotMoveResponse.ok) {
//           console.error("Failed to get bot move");
//           return;
//         }

//         const BotMoveData = await BotMoveResponse.json();
//         console.log("Bot move data:", BotMoveData);

//         if (BotMoveData.message === "MM pieces win!") {
//           setBoard(transpose(BotMoveData.board));
//           clearInterval(intervalId); // Stop the interval when the game is over
//           return alert("MM pieces win!");
//         } else if (BotMoveData.message === "MM positions win!") {
//           setBoard(transpose(BotMoveData.board));
//           clearInterval(intervalId); // Stop the interval when the game is over
//           return alert("MM positions win!");
//         } else if (BotMoveData.message === "Tie!") {
//           clearInterval(intervalId); // Stop the interval when the game is over
//           return alert("Tie!");
//         }
//         setBoard(transpose(BotMoveData.board));
//         setWhichCpu(3 - whichCpu);
//         changeTurn(whichCpu);
//       } catch (error) {
//         console.error("Error handling bot move:", error);
//         alert("Couldn't connect to the server");
//       }
//     };

//     if (selectedStarter) {
//       // Start the interval when the component mounts
//       const id = setInterval(fetchData, 2000); // Adjust the interval as needed
//       setIntervalId(id);

//       // Clean up the interval when the component unmounts
//       return () => clearInterval(id);
//     }
//   }, [board, selectedStarter, whichCpu]);

//   return (
//     <div className="main-connect4">
//       <h1>Connect Four</h1>
//       <div className="submenu">
//         <button onClick={toggleMenu}>Menu</button>
//         {/* {turn && <h3 className={`turn-${whichCpu}`}>{turn}'s turn</h3>} */}
//         <h3 className="turn-1">MM pieces</h3>
//         <h3 className="turn-2">MM postions</h3>
//         <button className="restart" onClick={restart}>
//           Restart
//         </button>
//       </div>
//       {selectedStarter && (
//         <div className="board">
//           {/* Render the columns */}
//           {board.map((col, index) => (
//             <Column
//               onClick={() => {
//                 return;
//               }}
//               key={index}
//               colum={col}
//               disabled={true}
//             />
//           ))}
//         </div>
//       )}

//       {isRestartMenuOpen && (
//         <div className="modal">
//           <div className="restart-menu menu-content">
//             <h2>Who starts first? </h2>
//             <button onClick={() => handleOptionClick("MM pieces")}>
//               MM pieces
//             </button>
//             <button onClick={() => handleOptionClick("MM positions")}>
//               MM positions
//             </button>
//             <button className="greenBtn" onClick={handleStartClick}>
//               Start
//             </button>
//             <button className="redBtn" onClick={handleMainMenu}>
//               Main Menu
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       {isMenuOpen && (
//         <div className="modal">
//           <div className="menu-content">
//             <button onClick={restart}>Restart</button>
//             <Link onClick={changeMode} className="link" to={"/vs-cpu"}>
//               {"Player vs CPU (counting pieces)"}
//             </Link>
//             <Link onClick={changeMode} className="link" to={"/vs-cpu2"}>
//               {"Player vs CPU (positions)"}
//             </Link>
//             <button className="redBtn" onClick={closeMenu}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CpuVsCpu;
