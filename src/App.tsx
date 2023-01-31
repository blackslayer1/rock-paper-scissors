import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [playerSelection, setPlayerSelection] = useState<string>('');
  const [computerSelection, setComputerSelection] = useState<string>('');
  const [turn, setTurn] = useState<string>('Player');
  const [heading, setHeading] = useState<string>('');
  const [reset, setReset] = useState<boolean>(false);

  function randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }  

  const disableButtons = (bool: boolean) => {
    const button1 = document.getElementById('button1')!;
    const button2 = document.getElementById('button2')!;
    const button3 = document.getElementById('button3')!;
    if(bool === true){
    button1.style.pointerEvents="none";
    button2.style.pointerEvents="none";
    button3.style.pointerEvents="none";
    } else {
      button1.style.pointerEvents="all";
      button2.style.pointerEvents="all";
      button3.style.pointerEvents="all";
    }
  }

  function incrementPoint() {
    if(computerSelection === "Rock"){
      if(playerSelection === "Scissors"){
        setComputerScore(computerScore + 1);
        return "Computer wins!"
      } else if(playerSelection === "Paper"){
        setPlayerScore(playerScore + 1);
        return "You win!"
      } else if(playerSelection === "Rock"){
        setPlayerScore(playerScore + 1);
        setComputerScore(computerScore + 1);
        return "It's a tie!"
      }
    } else if(computerSelection === "Paper"){
      if(playerSelection === "Scissors"){
        setPlayerScore(playerScore + 1);
        return "You win!"
      } else if(playerSelection === "Rock"){
        setComputerScore(playerScore + 1);
        return "Computer wins!"
      } else if(playerSelection === "Paper"){
        setPlayerScore(playerScore + 1);
        setComputerScore(computerScore + 1);
        return "It's a tie!"
      }
    } else if(computerSelection === "Scissors"){
      if(playerSelection === "Rock"){
        setPlayerScore(playerScore + 1);
        return "You win!"
      } else if(playerSelection === "Paper"){
        setComputerScore(computerScore + 1);
        return "Computer wins!"
      } else if(playerSelection === "Scissors"){
        setPlayerScore(playerScore + 1);
        setComputerScore(computerScore + 1);
        return "It's a tie!"
      }
    }
    return ""
  }

  useEffect(()=>{
    if(computerScore === 5 || playerScore === 5){
      let winner =  computerScore === 5 && playerScore === 5 ? "It's a tie!" : playerScore === 5 ? "You Win!" : "Computer wins!";
      alert(winner);      
      document.getElementById('turn')!.innerHTML="";
      document.getElementById('heading')!.innerHTML=winner;
      disableButtons(true);
    } else {
      incrementPoint();
      setHeading(incrementPoint());
    }
  }, [computerSelection])

  const computerMove = () => {
    const options: string[] = ["Rock", "Paper", "Scissors"];
    setTimeout(()=>{
      if(reset !== true){
      setTurn("Player");
      setComputerSelection(options[randomIntFromInterval(0, 2)]);
      disableButtons(false);
      }
    }, 1500)
  }

  const rock = () => {
    setReset(false);
    setTurn("Computer");
    setPlayerSelection("Rock");
    disableButtons(true);
    computerMove();
    setComputerSelection('');
  }

  const paper = () => {
    setReset(false);
    setTurn("Computer");
    setPlayerSelection("Paper");
    disableButtons(true);
    computerMove();
    setComputerSelection('');
  }

  const scissors = () => {
    setReset(false);
    setTurn("Computer");
    setPlayerSelection("Scissors");
    disableButtons(true);
    computerMove();
    setComputerSelection('');
  }

  const resetGame = () =>{
    disableButtons(false);
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerSelection("");
    setComputerSelection("");
    setTurn("Player");
    setHeading("");
    setReset(true);
  }

  return (
    <div className="App">
      <h2>First Player to 5 Points Win!</h2>
      <span style={{marginRight: "80px"}}>Player Selected: <span style={{color: "green"}}>{playerSelection}</span></span>
      <span>Computer Selected:</span> <span style={{color: "blue"}}>{computerSelection}</span>
      <div className="selectionContainer">
      <h1 id="turn">{turn}'s turn!</h1>
      <br/><br/><br/>
      <h1 id="heading" style={{ backgroundImage: 'linear-gradient(60deg, #9ACD32, #00FFFF)', borderRadius: "5px"}}>{heading}</h1>
      </div>
      <span style={{marginRight: "40px"}}>Player: {playerScore}</span>
      <span>Computer:</span> {computerScore}
      <h3>Make a Selection</h3>
      <button id="button1" onClick={rock}>Rock</button>
      <button id="button2" onClick={paper}>Paper</button>
      <button id="button3" onClick={scissors}>Scissors</button>
      <br/><br/><hr/><br/>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
