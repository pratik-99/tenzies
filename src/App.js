import './App.css';
import Die from "./components/Die"
import React,{useState,useEffect} from "react"
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allnewDice())
  const [tenzies, setTenzies]=useState(false)
  function generatenewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
  }
  useEffect(()=>{
    const isheld=dice.every(die=>die.isHeld)
    const firstvalue=dice[0].value
    const isequal=dice.every(die=>die.value===firstvalue)
    if(isequal && isheld){
      setTenzies(true)
    }
  },[dice])
  function allnewDice() {
    const arr = []
    for (let i = 0; i <= 9; i++) {
      arr.push(generatenewDice())

    }
    return (arr)
  }

  function holdDice(id) {
    const newDice = dice.map(die => {
      if (die.id === id) {
        return { ...die, isHeld: !die.isHeld }
      }
      else {
        return die
      }
    })
    setDice(newDice)
  }

  function rollnewDice() {
    if(tenzies){
      setDice(allnewDice())
      setTenzies(false)
    }else{

      const newarr = dice.map(die => {
        if (die.isHeld) {
          return die
        }
        else {
          return generatenewDice()
        }
      })
  
      setDice(newarr)
    }
  }
  const diceElements = dice.map(die => {
    return <Die value={die.value}
      isHeld={die.isHeld} dieClick={() => holdDice(die.id)} key={die.id} />
  })
  return (
    <main>
       {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>

        {diceElements}
      </div>
      <button onClick={rollnewDice}>{tenzies?"New Game":"Roll"}</button>
    </main>
  );
}

export default App;
