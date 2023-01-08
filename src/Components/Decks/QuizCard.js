import { useState, useEffect } from "react";
import { GiRapidshareArrow } from "react-icons/gi";
import "./Card.css";

export default function QuizCard({
  selectedDeck,
  questionNumber,
  cardSide,
  setCardSide,
  theirAnswer,
  updateCard
}) {
  const [cardContent, setCardContent] = useState(
    selectedDeck.content[questionNumber]
  );


  useEffect(() => {
    setCardSide("front");
  }, [setCardSide]);

  useEffect(() => {
    setCardContent(selectedDeck.content[questionNumber]);
  }, [cardContent, questionNumber, selectedDeck]);

  const flipCard = () => {
    cardSide === "front" ? setCardSide("back") : setCardSide("front");
  };

  return (
    <div className="quiz-card">
      <div className="quiz-card-top">
        <GiRapidshareArrow className="flip-card-button" onClick={flipCard} />
      </div>
      <div className="quiz-card-content">
        {selectedDeck.content.length === 0 ? (
          <p>Add questions to this deck to study</p>
        ) : (
          <div>
            {cardSide === "front" ? (
              <p>{cardContent.question || cardContent.front}</p>
            ) : (
              <p>{cardContent.back}</p>
            )}
          </div>
        )}

        {cardContent.answer === theirAnswer && (
          <div>
            Correct!
          </div>
        )}
      </div>
      <div className="quiz-card-bottom"></div>
    </div>
  );
}
