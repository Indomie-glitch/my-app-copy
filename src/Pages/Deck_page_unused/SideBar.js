import { AiFillPlayCircle } from 'react-icons/ai';
import { HiPlusCircle, HiStop } from 'react-icons/hi';
import Deck from '../../Components/Decks/Deck';
import Card from '../../Components/Decks/Card';
import './SideBar.css';
import { Button } from 'react-bootstrap';

export default function SideBar({
  userDecks,
  createNewDeck,
  removeDeck,
  addQuestionsView,
  setAddQuestionsView,
  selectedDeck,
  setSelectedDeck,
  setUserDecks,
  addCard,
  quizMode,
  setQuizMode,
  questionNumber,
  setQuestionNumber,
  cardSide,
  setCardSide,
  deleteCard,
  updateCard,
  submitDeck,
  fetchDeck,
  localUserDecks,
  setLocalUserDecks,
}) {
  const currentSelectedDeck = userDecks.find(
    item => item.id === selectedDeck,
  ) || {
    data: { name: '' },
    content: [],
    id: '',
  };

  return (
    <div>
      {addQuestionsView === false ? (
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Flashcards</h1>
            <HiPlusCircle className="add-deck-button" onClick={createNewDeck} />
          </div>
          <div className="separator"></div>
          {userDecks.length > 0 &&
            userDecks.map((userDeck, i) => (
              <Deck
                key={`deck ${i}`}
                deck={userDeck}
                removeDeck={removeDeck}
                setAddQuestionsView={setAddQuestionsView}
                setSelectedDeck={setSelectedDeck}
                userDecks={userDecks}
                setUserDecks={setUserDecks}
                setQuizMode={setQuizMode}
                setQuestionNumber={setQuestionNumber}
                setCardSide={setCardSide}
                localUserDecks={localUserDecks}
                setLocalUserDecks={localUserDecks}
              />
            ))}
        </div>
      ) : (
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">{currentSelectedDeck.data.name}</h1>
            <div className="deck-data">
              <p className="deck-length">
                {currentSelectedDeck.content.length} cards
              </p>
              {quizMode === false ? (
                <AiFillPlayCircle
                  className="deck-button"
                  onClick={() => setQuizMode(!quizMode)}
                />
              ) : (
                <HiStop
                  className="deck-button"
                  onClick={() => setQuizMode(!quizMode)}
                />
              )}
              <HiPlusCircle className="deck-button" onClick={addCard} />
              <Button
                className=""
                onClick={() => {
                  submitDeck(userDecks);
                }}>
                Submit Deck
              </Button>
            </div>
          </div>
          <div className="separator"></div>
          {currentSelectedDeck
            ? currentSelectedDeck.content.map((currentCard, i) => (
                <Card
                  key={i}
                  currentCard={currentCard}
                  cardNumber={i}
                  deleteCard={deleteCard}
                  updateCard={updateCard}
                  setCardSide={setCardSide}
                />
              ))
            : null}
        </div>
      )}
    </div>
  );
}
