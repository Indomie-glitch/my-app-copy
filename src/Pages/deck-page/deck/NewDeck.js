import { useRef, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import './Newdeck.css';

const NewDeck = ({ currentCard, updateDeck, deleteDeck, activeDeck }) => {
  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef(null);

  const submitUpdate = () => {
    const title = titleRef.current.value;

    const newCurrentCard = {
      ...currentCard,
      data: { ...currentCard.data, name: title },
    };

    updateDeck(newCurrentCard);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    if (window.confirm('decks is going to be deleted')) {
      return deleteDeck();
    }
    console.log('no');
  };

  return (
    <div className="wrapper-deck-card">
      {isEditing ? (
        <div className="deck-card-save">
          <input ref={titleRef}></input>
          <button type="button " onClick={submitUpdate}>
            Save
          </button>
        </div>
      ) : (
        <div className="deck-card-edit">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <h1 className="dummy-deck-title">{currentCard.data.name}</h1>
            {activeDeck && <AiFillCheckCircle color="#E1D7C6" size={16} />}
          </div>
          <div className="wrapper-button">
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
              }}>
              Edit
            </button>
            <button type="button" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewDeck;
