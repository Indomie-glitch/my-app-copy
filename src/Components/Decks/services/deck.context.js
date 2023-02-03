import React, { createContext, useEffect, useState } from 'react';
import { get, getDatabase, ref, child, update } from 'firebase/database';
import { uid } from 'uid';
import { database } from '../../../firebase';

export const DeckContext = createContext({});

export const DeckProvider = ({ children }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [triggerReRender, setTriggerReRender] = useState(0);
  const [selectedDeckId, setSelectedDeckId] = useState('');
  const [addQuestionView, setAddQuestionView] = useState(false);
  const [quizMode, setQuizMode] = useState(false);

  const [level, setLevel] = useState(1);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchDeck();
  }, []);
console.log(userDecks);
  const fetchDeck = () => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}`)).then(snapshot => {
      if (snapshot.exists()) {
        if (snapshot.val().decks.length > 0) {
          setUserDecks(snapshot.val().decks);
          setSelectedDeckId(snapshot.val().decks[0].id);
          return;
        }
        setUserDecks([]);
      } else {
        setUserDecks([]);
      }
    });
  };

  const updateFirebase = newDecks => {
    setTriggerReRender(prev => prev + 1);
    update(ref(database, `users/${userId}`), { decks: newDecks });
  };

  const addNewDeck = () => {
    const defaultNewDeck = {
      id: uid(),
      data: {
        name: 'Title',
        content: {
          [uid()]: {
            answer: '',
            back: '',
            front: '',
            lastViewed: '',
            option: '',
            question: 'default card',
            status: '',
            wrongAnswer: '',
          },
        },
      },
      level,
      deckStatus: 'not done',
      lastViewed: new Date(),
      score: 0,
    };

    setUserDecks([...userDecks, defaultNewDeck]);
    updateFirebase([...userDecks, defaultNewDeck]);
  };

  const updateDeck = currentDeck => {
    const tempDeck = [...userDecks, currentDeck];

    const uniqueDeckList = [
      ...new Map(tempDeck.map(item => [item['id'], item])).values(),
    ];
    updateFirebase(uniqueDeckList);
    setUserDecks(uniqueDeckList);
  };

  const deleteDeck = () => {
    const unDeletedDeck = userDecks.filter(item => item.id !== selectedDeckId);

    setSelectedDeckId('');
    setUserDecks(unDeletedDeck);
    updateFirebase(unDeletedDeck);
  };

  const finishDeck = deckScore => {
    //deckScore define in deck component

    const currentDeckIndex = userDecks.findIndex(
      item => item.id === selectedDeckId,
    );
    //mutate deck
    userDecks[currentDeckIndex].deckStatus = 'done';
    userDecks[currentDeckIndex].lastViewed = new Date();
    userDecks[currentDeckIndex].score = deckScore;

    const newDeck = new Set(userDecks);

    setUserDecks([...newDeck]);
    updateFirebase([...newDeck]);
  };

  const addNewCard = () => {
    const uuid = uid();
    const defaultNewCard = {
      [uuid]: {
        front: 'front side',
        back: 'back side',
        question: '',
        answer: '',
        option: '',
        wrongAnswer: '',
        status: 'not done',
        lastViewed: new Date(),
      },
    };

    const currentDeckIndex = userDecks.findIndex(
      item => item.id === selectedDeckId,
    );

    const newContent = {
      ...userDecks[currentDeckIndex].data.content,
      ...defaultNewCard,
    };

    //mutate the userDeck
    const newDeck = [...userDecks];
    newDeck[currentDeckIndex].data.content = newContent;

    const newDecks = new Set(newDeck);

    setUserDecks([...newDecks]);

    updateFirebase([...newDeck]);
  };

  const updateCard = (currentCard, cardId) => {
    console.log("updateCard")
    const currentDeckIndex = userDecks.findIndex(
      item => item.id === selectedDeckId,
    );

    const test = userDecks[currentDeckIndex].data.content;

    test[cardId] = currentCard;

    setUserDecks(userDecks);
    updateFirebase(userDecks);
  };

  const deleteCard = cardId => {
    const currentDeckIndex = userDecks.findIndex(
      item => item.id === selectedDeckId,
    );

    const tempUserDeck = [...userDecks];
    const tempDeckContent = tempUserDeck[currentDeckIndex].data.content;

    delete tempDeckContent[cardId];

    setUserDecks(tempUserDeck);
    updateFirebase(tempUserDeck);
  };

  const play = () => {
    setQuizMode(true);
  };

  const stopPlaying = () => {
    setQuizMode(false);
  };

  const deleteAllDeck = () => {
    setUserDecks([]);
    updateFirebase([]);
  };

  return (
    <DeckContext.Provider
      value={{
        userDecks,
        setUserDecks,
        selectedDeckId,
        setSelectedDeckId,
        addQuestionView,
        setAddQuestionView,
        addNewDeck,
        addNewCard,
        deleteCard,
        updateCard,
        fetchDeck,
        deleteDeck,
        finishDeck,
        deleteAllDeck,
        updateDeck,
        play,
        stopPlaying,
        quizMode,
      }}>
      {children}
    </DeckContext.Provider>
  );
};
