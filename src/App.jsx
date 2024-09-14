import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import ParticlesComponent from './components/particles'
import Confetti from 'react-confetti';


const instructions = [
  "1.Click on the 'Restart the game' button to start the game.",
  "2.Click on any two cards to reveal the hidden numbers or images.",
  "3.If the two cards match, they will stay flipped. Otherwise, they will flip back over.",
  "4.Match all pairs of cards to win the game.",
  "5.Track your total moves and time to complete the game."
];

// const arr=[1,2,3,4,5,6,7,8]
const arr = [
  {
    value: "./images/iron.jpg",
    matched: false
  },
  {
    value: "./images/spiderman.png",
    matched: false
  },
  {
    value: "./images/capmarvel.jpg",
    matched: false
  },
  {
    value: "./images/hulk.jpg",
    matched: false
  },
  {
    value: "./images/capAmerica.jpg",
    matched: false
  },
  {
    value: "./images/thor.jpg",
    matched: false
  },
  {
    value: "./images/panther.jpg",
    matched: false
  },
  {
    value: "./images/blackwidow.jpeg",
    matched: false
  },
]
function App() {
  const [cards, setCards] = useState([])
  const [moves, setmoves] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setdisabled] = useState(false)
  const [won, setWon] = useState(false)


  function handleShuffle() {
    const shuffledArray = [...arr, ...arr]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledArray);
    setmoves(0)
    setWon(false)
  }
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true)
      if (choiceOne.value === choiceTwo.value) {
        setCards(prev => {
          return prev.map(card => {
            if (card.value === choiceOne.value) {
              return { ...card, matched: true }
            }
            else {
              return card;
            }
          })
        })
        resetCards()
      }
      else {
        setTimeout(() => resetCards(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])


  useEffect(() => {
    handleShuffle()
  }, [])


  useEffect(() => {
    if(cards.length>0 && cards.every((card)=>card.matched)){
      setWon(true)
    }
  }, [cards])
  function resetCards() {
    setChoiceOne(null)
    setChoiceTwo(null)
    setmoves(prev => prev + 1)
    setdisabled(false)

  }

  return (
    <>
    { won &&<Confetti numberOfPieces={1500} recycle={false} />}
      <ParticlesComponent id="particles" />
      <div className='main'>
        <div className="instructions">
          <h1>MEMORY CARD GAME    <i class="fa-solid fa-lightbulb"></i></h1>
          <button onClick={handleShuffle} ><i class="fa-solid fa-rotate-right"></i>    Restart the game  </button>
          <h4 id='points' > <i class="fa-solid fa-coins"></i> No of flips : {moves}</h4>
          <h2> How to Play </h2>
          <ul>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
        <div className="grid">
          {cards.map(card => (
            <Card key={card.id} card={card} handleChoice={handleChoice} disabled={disabled} flipped={card === choiceOne || card === choiceTwo || card.matched} />
          ))}
        </div>

      </div>
    </>
  )
}

export default App
