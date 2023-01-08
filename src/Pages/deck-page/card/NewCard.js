import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import './NewCard.css';

const NewCard = ({ currentCard, updateCard, cardId, deleteCard, key }) => {
  const [isEditing, setIsEditing] = useState(false);

  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const optionsRef = useRef(null);

  const submitUpdate = () => {
    const question = questionRef.current.value;
    const answer = answerRef.current.value;
    const options = optionsRef.current.value;

    const newCurrentCard = {
      ...currentCard,
      question,
      answer,
      option: options,
    };

    updateCard(newCurrentCard, cardId);
    setIsEditing(false);
  };

  return (
    <div className="question-card" key={key}>
      {isEditing ? (
        <div className="input-question-answer-card">
          <div className="wrapper-input">
            <div>
              <h1>Question</h1>
              <input ref={questionRef}></input>
            </div>
            <div>
              <h1>Answer</h1>
              <input ref={answerRef}></input>
            </div>
            <div>
              <h1>Options</h1>
              <input ref={optionsRef}></input>
            </div>
          </div>
          <div className="wrapper-button-question-card-individual">
            <Button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={submitUpdate}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="question-card-individual">
          {!currentCard.question && !currentCard.answer && (
            <h2>You Need To Input Your Question And Answer</h2>
          )}
          <div>
            <h1>{currentCard.question}</h1>
          </div>
          <div>
            <p>{currentCard.answer}</p>
          </div>
          <div className="wrapper-button-question-card-individual">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="button-edit-delete">
              Edit
            </button>
            <button
              type="button"
              onClick={() => deleteCard(cardId)}
              className="button-edit-delete">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCard;
