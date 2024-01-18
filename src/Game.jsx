import React, { useState } from 'react';
import Board from './Board';

//define Game component as pseudo top-level (App is actual top), does not receive any props  
//manages game's state including history of moves and current player's turn
export default function Game() {
  //initalize the game's state using useState hook
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);
  const [boardFilled, setBoardFilled] = useState(false);
  const [statusDraw, setStatusDraw] = useState(null);

  //handlePlay function is called when player makes a move
  //updates game history with a new move and sets current move
   const handlePlay = (nextSquares) => {
      //create new history array including current move and update squares array
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      //update game's history state with new array
      setHistory(nextHistory);

      //update current move to index of last move
      setCurrentMove(nextHistory.length - 1);

      //if nextHistory is equal to 9 update board filled to true
      setBoardFilled(nextHistory.length === 10);

      //update move count based off of current player
      if (xIsNext) {
         setXCount(xCount + 1);
      } else {
         setOCount(oCount + 1);
      }
   };

   //updateStatusDraw function to update statusDraw when board is filled and no winner
   //realized this code is redundant, and could be refactored
   //but today I have suffered enough
   const updateStatusDraw = (newStatusDraw) => {
      setStatusDraw(newStatusDraw);
   };

   //jumpTo function allows players to jump to specific move in game history
   //well also updating move count by calculating number of X and O's
   const jumpTo = (nextMove) => {
      //set the current move to the selected move
      setCurrentMove(nextMove);

      //initialize variables to sotre historical move counts
      let xCountHistorical = 0;
      let oCountHistorical = 0;

      //loop through history to calculate historical counts up to selected move
      for (let i = 0; i <= nextMove; i++) {
         //cacluate number of 'X' moves in current history entry
         const countValueX = history[i].reduce((accumulator, currentValue) => {
         if (currentValue === "X") {
            //if the current square in history is 'X', increment the count
            return accumulator + 1;
         }
         //otherwise keep count unchanged
         return accumulator;
         }, 0);

         //calculate the number of 'O' moves in the current history entry
         const countValueO = history[i].reduce((accumulator, currentValue) => {
         if (currentValue === "O") {
            //if the current square in history is 'O', increment the count
            return accumulator + 1;
         }
         //otherwise, keep count unchanged
         return accumulator;
         }, 0);

         //updated historical variables with calculated 'X' and 'O' values
         xCountHistorical = countValueX;
         oCountHistorical = countValueO;

         //if 'X' or 'O' counts are less than 10 with the board not filled
         //remove boardfilled true value
         if (countValueX < 10 || countValueO < 10) {
         setBoardFilled(false);
         }
      }

      //update the move count xCount and oCount state variables to the historical move counts
      setXCount(xCountHistorical);
      setOCount(oCountHistorical);
   };

   //generate list of buttons (moves) in game history,
   //allows players to click to jump to specific move
   const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
         description = "Go to move #" + move;
      } else {
         description = "Go to game start";
      }
      return (
         <li key={move}>
         <button className="moveButton" onClick={() => jumpTo(move)}>
            {description}
         </button>
         </li>
      );
   });

   //prop to be passed to Board component to update status 
   //if no winner and board filled
   const drawText = "Game Result: Draw";
   //determine the className based on the value of statusDraw
   const statusDrawClassName = statusDraw === drawText ? "statusDrawActive" : "statusDraw";

   //render game board and move history
   //Board component renders the board,
   //the game's status is managed by xIsNext
   //each squares current status
   //X and O counts
   //list of moves is displayed in ordered list
   //drawText will update the conditional className and display
   return (
      <div className="game">
         <div className="game-board">
         <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            xCount={xCount}
            oCount={oCount}
            boardFilled={boardFilled}
            updateStatusDraw={updateStatusDraw}
            drawText={drawText}
         />
         </div>
         <div className="game-info">
         <p className={statusDrawClassName}>{statusDraw}</p>
         <ol>{moves}</ol>
         </div>
      </div>
   );
}



