import { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

function App() {
  const DECK_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

  const id = useRef()

  const [cards, setCards] = useState([])

  useEffect(() => async () => {
    const res = await axios.get(DECK_URL)
    id.current = res.data.deck_id
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();
    const DRAW_URL = `https://deckofcardsapi.com/api/deck/${id.current}/draw/?count=1`
    if (cards.length != 52) {
      const res = await axios.get(DRAW_URL)
      setCards(cards => [...cards, { imgSrc: res.data.cards[0].image }])
    } else {
      alert("Error: no cards remaining!")
    }
  }

  const shuffle = async (deck_id) => {
    const SHUFFLE_URL = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`
    const res = await axios.get(SHUFFLE_URL)
    setCards([])
  }
  return (
    <div className="App">
      <button onClick={() => shuffle(id.current)}>Shuffle Deck</button>
      <button onClick={handleClick}>Gimme A Card</button>
      {cards.map(({ imgSrc }) => <img key={uuid()} src={imgSrc} />)}
    </div>
  );
}

export default App;
