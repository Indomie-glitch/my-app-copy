import { DeckContext } from 'Components/Decks/services/deck.context';
import { useContext, useState } from 'react';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import NewCard from '../deck-page/card/NewCard';
import NewDeck from '../deck-page/deck/NewDeck';
import Display from '../deck-page/display/display.js';
import { ACTIVE_DECK_DEFAULT_OBJECT } from '../deck-page/display/display.constant.js';
import './newDeckPage.css';
import Navbar from 'Components/Header/Navbar/Navbar';
import addDays from 'date-fns/addDays';

const NewDeckPage = () => {
  const {
    userDecks,
    addNewCard,
    deleteCard,
    updateCard,
    addNewDeck,
    selectedDeckId,
    setSelectedDeckId,
    deleteDeck,
    finishDeck,
    updateDeck,
    quizMode,
    deleteAllDeck,
    stopPlaying,
    play,
  } = useContext(DeckContext);

  const [isCorrect, setIsCorrect] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const isTomorrowTime = currentDate => {
    const tomorrow = addDays(new Date(currentDate), 1);

    return new Date(currentDate) < tomorrow;
  };

  const confirmDeleteAll = () => {
    if (window.confirm('all decks is going to be deleted')) {
      return deleteAllDeck();
    }
    console.log('no');
  };

  const mapContents = currentDeck => {
    const contentList = Object.entries(currentDeck.data.content);
    const mapContentList = contentList.map((item, index) => {
      const itemId = item[0];
      const itemDetails = item[1];
      return (
        <NewCard
          key={index}
          currentCard={itemDetails}
          updateCard={updateCard}
          cardId={itemId}
          deleteCard={deleteCard}
        />
      );
    });
    return mapContentList;
  };

  const activeDeck =
    userDecks.find(item => item.id === selectedDeckId) ||
    ACTIVE_DECK_DEFAULT_OBJECT;

  const isDeckEnd =
    activeIndex > Object.entries(activeDeck?.data?.content).length;

  const isLastCard =
    activeIndex === Object.entries(activeDeck?.data?.content).length - 1;

  return (
    <div className="container-pages">
      <div>
        <Navbar />
      </div>
      <div style={{ width: '100%' }}>
        <div className="container-decks-button">
          {!quizMode && (
            <>
              <div className="container-decks">
                {userDecks.length === 0 && (
                  <div className="empty-state">
                    <h1>You Need To Input Your Decks First</h1>
                  </div>
                )}
                {userDecks
                  .sort(
                    (prev, next) =>
                      new Date(next.lastViewed) - new Date(prev.lastViewed),
                  )
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="dummy-button-container"
                        onClick={() => {
                          // if (isTomorrowTime) return;
                          setSelectedDeckId(item.id);
                        }}>
                        <NewDeck
                          currentCard={item}
                          updateDeck={updateDeck}
                          deleteDeck={deleteDeck}
                          activeDeck={item.id === selectedDeckId}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="wrapper-button-deck">
                <button className="button-add-decks" onClick={addNewDeck}>
                  Add Decks
                </button>
                {userDecks.length > 0 && (
                  <>
                    <button
                      className="button-delete-decks"
                      onClick={confirmDeleteAll}>
                      Delete All
                    </button>
                    <button
                      className="button-finish-decks"
                      onClick={finishDeck}>
                      Finish Deck
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div className="wrapper-card-sidebar">
          {!quizMode && (
            <div>
              {userDecks.length > 0 && (
                <button onClick={addNewCard} className="add-card-button">
                  Add Card
                </button>
              )}
              {userDecks.map((item, index) => {
                const shouldShowItems = item.id === selectedDeckId;
                return (
                  <div key={index} className="container-card">
                    {!!shouldShowItems && <>{mapContents(item)}</>}
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ width: '70%' }}>
            <div style={{ marginLeft: '52px' }}>
              <button
                onClick={play}
                className="play-button"
                // disabled={isTomorrowTime(activeDeck.lastViewed)}
              >
                Play
              </button>
              <button onClick={stopPlaying} className="stop-button">
                Stop
              </button>
            </div>

            {!!selectedDeckId && quizMode && (
              <>
                <div className="wrapper-display">
                  <div className="arrow-left">
                    <BsCaretLeftFill
                      disabled={!isCorrect}
                      onClick={() => {
                        setIsCorrect(false);
                        if (activeIndex === 0) return;
                        setActiveIndex(prev => prev - 1);
                      }}
                    />
                  </div>

                  <Display
                    activeDeck={activeDeck}
                    finishDeck={finishDeck}
                    updateCard={updateCard}
                    stopPlaying={stopPlaying}
                    setIsCorrect={setIsCorrect}
                    isCorrect={isCorrect}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />

                  <div className="arrow-right">
                    <BsCaretRightFill
                      disabled={!isCorrect}
                      onClick={() => {
                        if (isLastCard) return;
                        setIsCorrect(false);
                        setActiveIndex(prev => prev + 1);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDeckPage;
