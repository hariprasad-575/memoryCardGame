import React from 'react'

const Card = ({ card, handleChoice,disabled ,flipped}) => {
  function handleClick() {
    if(!disabled){
      handleChoice(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped?"flipped":""} >
        <img className="front" src={card.value} alt="" />
        <img className='back' onClick={handleClick} src="./images/cover.jpg" alt="" />
      </div>
    </div>
  )
}

export default Card
