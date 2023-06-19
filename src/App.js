import React from 'react'
import './utils/style.css';
import Die from './components/Die';
// import { ConnectionStates } from 'mongoose';
import {nanoid} from "nanoid"
function App() {
  const[dice,setDice] = React.useState(allNewDice())

  const diceElements = dice.map(
    (x)=>{
      return <Die key={x.id}value={x.value} isHeld={x.isHeld}/>
    }
  )
  function allNewDice(){
    const dice_array=[]
    for(let i=0;i<10;i++)
    {
      dice_array.push({
        id:nanoid(),
        value: Math.floor(Math.random() * (6 - 1 + 1) ) + 1,
        isHeld: true
      });
    }
    return dice_array
  }

  function handleRollClick(){

    setDice(allNewDice())
    
  }
  
  return (
    <div className='outer'>
      <main>
        <div className="dice-container">
          
          {diceElements}
        </div>
        <button className='Roll' onClick={handleRollClick}>Roll</button>
        
      </main>
      </div>
    
  );
}

export default App;
