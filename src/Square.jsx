import React from 'react';

//define the Square component for individual squares on the board 
//props for this component:
//- value: the content of the square ("X" or "O")
//- onSquareClick: a click event handler for each square
//- rowWin: a boolean indicating whether square is part of winning row
export default function Square({value, onSquareClick, rowWin}) {
   
   //if rowWin is true, set className to 'squareWin', otherwise, set it to 'square'
   const className = rowWin ? 'squareWin' : 'square';

   //render square as button element that can be clicked on game board
   return (
      <button  
         className={className}  
         onClick={onSquareClick} >
         {value}
      </button>
   )
}
