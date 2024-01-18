import React from "react";
import Square from "./Square";
import MoveCounter from "./MoveCounter";

//define Board component containing grid of squares
//props for this component:
//- xIsNext: a boolean indicating whose turn it is
//- squares: an array representing current state of the board
//- onPlay: a function for handling a player's move
//- xCount: a number that tracks num of moves made by player X
//- oCount: a number that tracks num of moves made by player O
//-drawText: a string with 'Game Result: Draw'
export default function Board({
  xIsNext,
  squares,
  onPlay,
  xCount,
  oCount,
  boardFilled,
  updateStatusDraw,
  drawText
}) {
   //handleClick function is a click handler and sent as props to each square
   //index of square that triggered the function
   const handleClick = (i) => {
      //check if already has a value or winner, then return
      if (calculateWinner(squares) || squares[i]) {
         return;
      }

      ///create a copy of current squares array (current state)
      const nextSquares = squares.slice();

      //update copy with "X" or "O" based on current player's turn
      nextSquares[i] = xIsNext ? "X" : "O";

      //replace with current copy - phone home moment
      //calling prop function and passing in new updated array
      onPlay(nextSquares);
   };

   //helper calculateWinner function to calculate winner of game
   const calculateWinner = (squares) => {
      //array of arrays, each sub-array represents a winning combo of squares
      const lines = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6],
      ];

      //loop through lines array to check for winning combos
      for (let i = 0; i < lines.length; i++) {
         const [a, b, c] = lines[i];
         //check if squares at positions `a`, `b`, `c` have the same value and are not empty
         if (
         squares[a] &&
         squares[a] === squares[b] &&
         squares[a] === squares[c]
         ) {
         //if condition is met, a player has won
         //function returns the value ('X' or 'O') of winning player

         //- val1: 'X' or 'O' winning character value
         //- val2: index of first square in winning combo
         //- val3: index of second square in winning combo
         //- val4: index of third square in winning combo
         //returns winning details as object to be stored in result var
         return { val1: squares[a], val2: a, val3: b, val4: c };
         }
      }
      //return null if no winner is found
      return null;
   };

   //determine current status of board
   const result = calculateWinner(squares);

   //rowWin function to define winning row class name
   const rowWin = (index) => {
      //check for result (winner), destructure result object
      if (result) {
         const { val2, val3, val4 } = result;

         //check if current index is part of winning row, return 'rowWin' if true
         if (index === val2 || index === val3 || index === val4) {
         return "rowWin";
         }
      }

      //return null if current index is not part of winning row
      return null;
   };

   //initialize status variable
   let status;
   
   //check for winner, draw, or next player's turn
   if (result) {

      //displays winner status
      //setWinner status goes here
      status = `Winner: ${result.val1}`;
   } else {
      if (boardFilled) {
         //if board filled and not winner update statusDraw as status as draw 
         updateStatusDraw(drawText);
      }
      if (!boardFilled) {
         // if board is not filled displays current player's turn
         status = "Next player: " + (xIsNext ? "X" : "O");
         updateStatusDraw("");
      }
   }

   //render game board with squares and status
   //Square components are used to render individual squares,
   //each square has its own click event handler and rowWin prop to highlight
   //MoveCount component is used to pass props and render X/O counts
   return (
      <>
         <div className="status">{status}</div>
         <div className="board-row">
         <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            rowWin={rowWin(0)}
         />
         <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            rowWin={rowWin(1)}
         />
         <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            rowWin={rowWin(2)}
         />
         </div>
         <div className="board-row">
         <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            rowWin={rowWin(3)}
         />
         <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            rowWin={rowWin(4)}
         />
         <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            rowWin={rowWin(5)}
         />
         </div>
         <div className="board-row">
         <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            rowWin={rowWin(6)}
         />
         <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            rowWin={rowWin(7)}
         />
         <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            rowWin={rowWin(8)}
         />
         </div>
         <div className="moveCounter">
         <MoveCounter xCount={xCount} oCount={oCount} className="status" />
         </div>
      </>
   );
}
