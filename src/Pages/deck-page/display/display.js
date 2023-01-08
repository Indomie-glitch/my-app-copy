import { useState, useEffect } from 'react';
import { GiRapidshareArrow } from 'react-icons/gi';
import './display.css';

const Display = ({
  activeDeck,
  finishDeck,
  updateCard,
  setIsCorrect,
  isCorrect,
  activeIndex,
  setActiveIndex,
  stopPlaying,
}) => {
  const [cardScore, setCardScore] = useState(0);
  const [cardSide, setCardSide] = useState('front');
  const [attempt, setAttempt] = useState(0);

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setIsCorrect(false);
  }, [activeIndex]);

  const handleAnswer = (userAnswer, answer, currentCard, currentId) => {
    if (userAnswer === answer) {
      const newCurrentCard = {
        ...currentCard,
        wrongAnswer: attempt,
        status: 'done',
      };

      if (timer > 50) {
        setCardScore(prev => prev + 10);
      }
      if (timer > 40 && timer < 49) setCardScore(prev => prev + 8);
      if (timer > 30 && timer < 39) setCardScore(prev => prev + 6);
      if (timer > 20 && timer < 29) setCardScore(prev => prev + 4);
      setCardScore(2);
      setIsCorrect(true);
      updateCard(newCurrentCard, currentId);
      return;
    }
    console.log(answer);
    setAttempt(prev => prev + 1);
  };

  const handlefinishdeck = () =>{
    stopPlaying();
    finishDeck(cardScore)
  }
  // handling timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log('time up');
      setActiveIndex(prev => prev + 1);
      setTimer(60);
    }
  }, [timer]);

  const displayCard = () => {
    const isDeckEnd =
      activeIndex > Object.entries(activeDeck.data.content).length;

    const contentList = Object.entries(activeDeck?.data?.content);

    const sortedContentList = contentList.sort((a, b) => {
      return b[1].wrongAnswer - a[1].wrongAnswer;
    });

    const mapContentList = sortedContentList.map(item => {
      const itemId = item[0];
      const itemDetails = item[1];

      const itemOptions = itemDetails.option.split(', ');

      return (
        <div className="quiz-card" key={itemId}>
          {!isDeckEnd ? (
            <>
              <div className="quiz-card-top">
                <GiRapidshareArrow
                  className="flip-card-button"
                  onClick={flipCard}
                  color="#E1D7C6"
                />
              </div>
              <div className="quiz-card-content">
                <div>
                  {cardSide === 'front' ? (
                    <p>{itemDetails.question}</p>
                  ) : (
                    <p>{itemDetails.answer}</p>
                  )}
                </div>

                {isCorrect && <div>Correct!</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!isCorrect && (
                  <div className="wrapper-answer">
                    {itemOptions.map(item => {
                      return (
                        <button
                          onClick={event => {
                            handleAnswer(
                              event.target.value,
                              itemDetails.answer,
                              itemDetails,
                              itemId,
                            );
                          }}
                          value={item}
                          type="button">
                          {item}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="quiz-card-bottom"></div>
            </>
          ) : (
            <h1 className="text-finish-quiz">Done</h1>
          )}
        </div>
      );
    });
    return mapContentList;
  };

  const flipCard = () => {
    cardSide === 'front' ? setCardSide('back') : setCardSide('front');
  };

  return !!activeDeck ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {displayCard()[activeIndex]}
      <button
        className="button-finish-decks"
        onClick={() => finishDeck(cardScore)}>
        Finish Deck
      </button>
    </div>
  ) : null;
};

export default Display;
