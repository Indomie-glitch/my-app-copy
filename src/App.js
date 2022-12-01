import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home_page/Home";
import Welcome from "./Pages/Welcome_page/Welcome";
import Signin from "./Pages/UserPage/Signin";
import Login from "./Pages/UserPage/Login";
import Deck_page from "./Pages/Deck_page/decks";
import Today_page from "./Pages/Today_page/todays";
import Flashcard from "./Pages/Flashcard/flashcard";
import Footer from "Components/Footer/Footer";
import Flashpage from "./Pages/Flashcard_page/flashpage";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div className="page">
      <Router>
        <Header clasName="Header" />
        <div className="Navigation">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/decks" element={<Deck_page />} />
            <Route exact path="/today" element={<Today_page />} />
            <Route exact path="/welcome" element={<Welcome />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/flashcard" element={<Flashcard />} />
            <Route exact path="/flashcard_page" element={<Flashpage />} />
          </Routes>
        </div>
        <Footer className="Footer" />
      </Router>
    </div>
  );
}

export default App;
