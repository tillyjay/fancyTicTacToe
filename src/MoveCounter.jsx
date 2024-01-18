import React from 'react';

//define MoveCounter component displaying move counts for both players
//props for this component:
//-xCount: tracks num of moves made by player X
//-oCount: tracks num of moves made by player O
export default function MoveCounter({xCount, oCount}) {

   //renders X and O counts as p elements below board 
   return (
      <>
         <p className="counterOne">
            {`X Move Count: ${xCount}`} 
         </p>
         
         <p className="counterTwo">
            {`O Move Count: ${oCount}`} 
         </p>
      </>
   )
}