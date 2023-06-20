import React from 'react'
import './utils/style.css';
import Die from './components/Die';
// import { ConnectionStates } from 'mongoose';
import {nanoid} from "nanoid"
function App() {
  const[dice,setDice] = React.useState(allNewDice())

  const diceElements = dice.map(
    (x)=>{
      return <Die key={x.id}value={x.value} isHeld={x.isHeld} id={x.id} holdDice={holdDice}/>
    }
  )
  function allNewDice(){
    const dice_array=[]
    for(let i=0;i<10;i++)
    {
      dice_array.push({
        id:nanoid(),
        value: Math.floor(Math.random() * (6 - 1 + 1) ) + 1,
        isHeld: false
      });
    }
    return dice_array
  }

  function handleRollClick(){

    setDice(oldDice => oldDice.map(x => {
      return(x.isHeld? x: {...x,value: Math.floor(Math.random() * (6 - 1 + 1) ) + 1})
    }))
    
  }

  function holdDice(id){
    console.log(id);
      setDice( oldDice => oldDice.map(x=>{
        return(x.id===id ? {...x,isHeld:!x.isHeld} : x)
      }))
  }
  
  return (
    <div className='outer'>
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>
          Roll Dice until all dice are the same. Click each one to freeze it at its current value between rolls.
        </p>
        <div className="dice-container">
          
          {diceElements}
        </div>
        <button className='Roll' onClick={handleRollClick}>Roll</button>
        
      </main>
      </div>
    
  );
}

export default App;
