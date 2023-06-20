import React from 'react'
import ConfettiExplosion from 'react-confetti-explosion';
import './utils/style.css';
import Die from './components/Die';
// import { ConnectionStates } from 'mongoose';
import {nanoid} from "nanoid"
function App() {

  const[dice,setDice] = React.useState(allNewDice())
  const[tenzies,setTenzies]=React.useState(false)

  React.useEffect(
    ()=>{
      // for(let i=0;i<10;i++)
      // {
      //   if(!dice[i].isHeld)
      //     return;
      // }
      const allHeld = dice.every(die => die.isHeld) // this function does the same thing as the above commented code
      const value=dice[0].value;
      // for(let i=1;i<10;i++)
      // {
      //   if(dice[i].value !== value)
      //   {
      //       console.log("All marked but not all same")
      //       return;
      //   }
          
      // }
      const allValue = dice.every(die=> die.value===value)
      if(allHeld && allValue )
      {
        setTenzies(true);
      }
    }
    
    , [dice]
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

  function startNewGame(){
    setDice(allNewDice());
    setTenzies(false)
  }

  function handleRollClick(event){
   event.target.value==="New Game" ? 
   
   
   startNewGame()  :
    
    setDice(oldDice => oldDice.map(x => {
      return(x.isHeld? x: {...x,value: Math.floor(Math.random() * (6 - 1 + 1) ) + 1})
    }))
    
  }
  
  function holdDice(id){
    
    setDice( oldDice => oldDice.map(x=>{
      return(x.id===id ? {...x,isHeld:!x.isHeld} : x)
    }))
  }
  
  const diceElements = dice.map(
    (x)=>{
      return <Die key={x.id}value={x.value} isHeld={x.isHeld} id={x.id} holdDice={holdDice}/>
    }
  )
  return (
    <div className='outer'>
      <main>
        {tenzies && <ConfettiExplosion />}
        <h1 className='title'>Tenzies</h1>
        {tenzies ? <h3> You Won!!!</h3> :<p className='instructions'>
          Roll Dice until all dice are the same. Click each one to freeze it at its current value between rolls.
        </p>}
        <div className="dice-container">
          
          {diceElements}
        </div>
        <button className='Roll' onClick={handleRollClick} value={tenzies? "New Game" : "Roll"}>{tenzies? "New Game" : "Roll"}</button>
        {tenzies && <ConfettiExplosion />}
      </main>
      </div>
    
  );
}

export default App;
