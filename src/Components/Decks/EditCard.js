import { useState } from "react";
import { MdSwapVert } from "react-icons/md";
import "./Card.css";

export default function EditCard({
  currentCard,
  setEditCard,
  updateCard,
  cardNumber,
}) {
  const [cardFront, setCardFront] = useState(currentCard.front);
  const [cardBack, setCardBack] = useState(currentCard.back);
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState('')

  // switches card front and card back
  const swapCardSides = () => {
    const frontSide = cardFront;
    setCardFront(cardBack);
    setCardBack(frontSide);
  };

  return (
    <div className="small-card">
      <div className="small-card-front">
        <p className="edit-card-side-choice">Questions</p>
        <input
          className="edit-card-input"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></input>
      </div>

      <div className="edit-card-center">
        <div className="edit-card-separator"></div>
        <MdSwapVert className="swap-button" onClick={swapCardSides} />
        <div className="edit-card-separator"></div>
      </div>

      <div className="small-card-back">
        <p className="edit-card-side-choice">Answer</p>
        <input
          className="edit-card-input"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></input>
      </div>
      <div className="small-card-back">
        <p className="edit-card-side-choice">Options (multiple options required, separate by comma)</p>
        <input
          className="edit-card-input"
          type="text"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        ></input>
      </div>
      <div className="edit-card-buttons">
        <button onClick={() => setEditCard(false)}>Cancel</button>
        <button
          onClick={() => {
            setEditCard(false);
            updateCard({index: cardNumber, front: cardFront, back: cardBack, answer,question, options, wrongAnswer : 0} );
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
