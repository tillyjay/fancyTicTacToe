import React, { useState } from 'react';
import Game from './Game';
import './styles.css'; 
//imported CSS styling 

//define App top-level component, serving as entry point for Tic-Tac-Toe game
//defines app layout with title and Game component holding board and logic 
export default function App() {
   return (
   <div className='App'>
      <h1>Tic-Tac-Toe</h1>
      <Game />
   </div>
   );
}
