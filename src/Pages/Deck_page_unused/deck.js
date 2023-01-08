import { useState, useEffect } from "react";
import { uid } from 'uid';
import HomePage from "./HomePage";
import SideBar from "./SideBar";
import { get, getDatabase, ref, remove, set, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
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
  const [localUserDecks, setLocalUserDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState('');
  const [addQuestionsView, setAddQuestionsView] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const [knowItCards, setKnowItCards] = useState([]);
  const [dontKnowItCards, setDontKnowItCards] = useState([]);
  const [level, setLevel] = useState(1);

  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')


  function writeUserData() {
    const db = getDatabase();

    // set(ref(db, `users/${userId}`), {
    //   decks: userDecks,
    // });
  } 

  useEffect(() => {
    if(!userId){
      navigate('/signin')
    }
  }, [])

  useEffect(() => {
    fetchDecks()
  }, [])

  const fetchDecks = () => {


    const dbRef = ref(getDatabase())

    get(child(dbRef,`users/${userId}`)).then(snapshot => {
      if(snapshot.exists()){
        if(snapshot.val().decks.length > 0) {
          setUserDecks(snapshot.val().decks)
          setLocalUserDecks(snapshot.val().decks)
          return
        }
        setUserDecks([])
        setLocalUserDecks(snapshot.val().decks)
      }
      else{
        console.log('lkajsdflk')
      }
    })

  }


  useEffect(() => {
    const data = localStorage.getItem("deck-list");
    if (data) {
      setUserDecks(JSON.parse(data));
    } else {
      setUserDecks(initialDecks);
    }
  }, []);

  //creates a new deck and adds it to the user deck list state: userDecks
  const createNewDeck = () => {
    const db = getDatabase();

    const newDeck = {
      id : uid(),
      data: { name: "Click title area to name your new deck" },
      content: [],
      level: 1,
    };
    setUserDecks([...userDecks, newDeck]);

    console.log([...userDecks, newDeck])
  };

  const submitDeck = (list) => {
    console.log(list, 'ini submit deck')

    // const db = getDatabase();

    // set(ref(db, `users/${userId}`), {
    //   decks : list
    // })
  }



  const deleteDeck = (list) => {
    const db = getDatabase();

    remove(ref(db, `users/${userId}/decks`)).then(() => {
      setUserDecks([])
      setSelectedDeck([])
      setAddQuestionsView(false)
    })
  }


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
      id: selectedDeck,
      data: selectedDeck.data,
      content: newCardList,
    };

    const newDecks = [...userDecks];

    newDecks
      .filter((deck) => deck.id !== selectedDeck.id)
      
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
  const updateCard = ({
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
        submitDeck={submitDeck}
        fetchDeck = {fetchDecks}
        localUserDecks = {localUserDecks}
        setLocalUserDecks = {setLocalUserDecks}
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
        submitDeck={submitDeck}
      />
    </div>
  );
}

export default Deck;
