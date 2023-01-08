import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'Components/Header/Navbar/Navbar';
import './Home.css';
import Calendar from 'Components/Body/calendar/calendar';
function Home() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return navigate('/login');
  }, []);

  return (
    <div className="bodywrapper">
      <Navbar />
      <div className="bigbox">
        <div className="Grid">
          <div>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
