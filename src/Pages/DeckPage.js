import React, { useEffect } from 'react';
import { DeckProvider } from 'Components/Decks/services/deck.context';
import NewDeckPage from './new_deck_page/newDeckPage';
import { useNavigate } from 'react-router-dom';

const DeckPage = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return navigate('/login');
  }, []);

  return (
    <DeckProvider>
      <NewDeckPage />
    </DeckProvider>
  );
};

export default DeckPage;
