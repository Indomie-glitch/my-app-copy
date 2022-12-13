import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import SideBar from "./SideBar";
import { getDatabase, ref, set } from "firebase/database";
// import { initialDecks } from "./InitialData/InitialDecks";

const initialDecks = [
  {
    id: 0,
    data: { name: "I'm no math magician or anything" },
    content: [
      { front: "2+2", back: "4" },
      {
        front: "What is the pythagorean theorem?",
        back: "Sounds like it's just a theory to me!",
      },
      {
        front: "What is math?",
        back: "Well that's just like, your opinion, man.",
      },
      {
        front:
          "How many flaps per second for a 5 ounce swallow to carry a 1 pound coconut?",
        back: "An african swallow, or a European swallow?! ",
      },
    ],
  },
];

function Deck() {
  const [userDecks, setUserDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  const [addQuestionsView, setAddQuestionsView] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const [knowItCards, setKnowItCards] = useState([]);
  const [dontKnowItCards, setDontKnowItCards] = useState([]);
  const [level, setLevel] = useState(1);

  // retrieves persisted decks through local storage

  //fetchfromfirebase
  // const fetchUserDecks = async() => {
  //   // const fetchfromfirebase = await axios.get(firebaselink)

  //   setUserDecks(fetchfromfirebase)
  // }
  function writeUserData() {
    const db = getDatabase();
    set(ref(db, "deck/" + 1), {
      decks: userDecks,
    });
  } 


  useEffect(() => {
    const data = localStorage.getItem("deck-list");
    if (data) {
      setUserDecks(JSON.parse(data));
    } else {
      setUserDecks(initialDecks);
    }
  }, []);

  // persists decks to local storage
  useEffect(() => {
    localStorage.setItem("deck-list", JSON.stringify(userDecks));
  });

  //creates a new deck and adds it to the user deck list state: userDecks
  const createNewDeck = () => {
    const newDeck = {
      id: userDecks.length,
      data: { name: "Click title area to name your new deck" },
      content: [],
      level: 1,
    };
    setUserDecks([...userDecks, newDeck]);
  };

  // Creates a new card, and adds it to the selected deck
  const addCard = () => {
    const newCard = {
      front: "Front Side",
      back: "Back Side",
      answer: "4",
      options: "1,2,3,4",
    };
    const newCardList = [...selectedDeck.content, newCard];
    const index = selectedDeck.id;

    const updatedDeckData = {
      id: index,
      data: selectedDeck.data,
      content: newCardList,
    };

    setSelectedDeck(updatedDeckData);

    const newDecks = [...userDecks];

    newDecks
      .filter((deck) => deck.id !== selectedDeck.id)
      .splice(index, 1, updatedDeckData);
    //addingtofirebase
    setUserDecks(newDecks);
  };

  // Removes the selected card from the selected deck
  const deleteCard = (currentCard) => {
    const filteredCardList = selectedDeck.content.filter(
      (card) => card.front !== currentCard.front
    );
    userDecks.filter((deck) => deck.id !== selectedDeck.id);

    const newSelectedDeck = {
      id: selectedDeck.id,
      data: selectedDeck.data,
      content: filteredCardList,
    };
    setSelectedDeck(newSelectedDeck);

    const newDecks = [...userDecks];
    newDecks.splice(selectedDeck.id, 1, newSelectedDeck);

    //deleteonfirebase
    setUserDecks(newDecks);
  };

  //Updates the selected card to user inputs
  const updateCard = async ({
    index,
    front,
    back,
    answer,
    options,
    question,
    wrongAnswer,
  }) => {
    const newCardData = {
      front: front,
      back: back,
      answer,
      options,
      question,
      wrongAnswer,
    };

    const cardList = [...selectedDeck.content];
    cardList.splice(index, 1, newCardData);

    const newSelectedDeckData = {
      id: selectedDeck.id,
      data: selectedDeck.data,
      content: cardList,
    };
    setSelectedDeck(newSelectedDeckData);

    const newDecks = [...userDecks];

    newDecks.splice(selectedDeck.id, 1, newSelectedDeckData);
    // const updateToFirebase = () => {
    //   response = axios.post('firebaseurl', newDecks)
    // }

    setUserDecks(newDecks);
  };

  // Removes the selected deck from deck list state: userDecks
  const removeDeck = (deck) => {
    const updatedDeckList = [...userDecks];
    updatedDeckList.splice(deck.id, 1);
    setUserDecks(updatedDeckList);
  };

  return (
    <div className="App">
      <SideBar
        userDecks={userDecks}
        setUserDecks={setUserDecks}
        removeDeck={removeDeck}
        createNewDeck={createNewDeck}
        addQuestionsView={addQuestionsView}
        setAddQuestionsView={setAddQuestionsView}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        addCard={addCard}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        cardSide={cardSide}
        setCardSide={setCardSide}
        deleteCard={deleteCard}
        updateCard={updateCard}
      />
      <HomePage
        userDecks={userDecks}
        setUserDecks={setUserDecks}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        selectedDeck={selectedDeck}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        cardSide={cardSide}
        setCardSide={setCardSide}
        deleteCard={deleteCard}
        knowItCards={knowItCards}
        setKnowItCards={setKnowItCards}
        dontKnowItCards={dontKnowItCards}
        setDontKnowItCards={setDontKnowItCards}
        updateCard={updateCard}
        writeUserData={writeUserData}
      />
    </div>
  );
}

export default Deck;
