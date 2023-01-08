import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home_page/Home";
import Signin from "./Pages/UserPage/Signin";
import Login from "./Pages/UserPage/Logup";
import Footer from "Components/Footer/Footer";
import "react-datepicker/dist/react-datepicker.css";
import Logout from "Pages/UserPage/Logout";
import DeckPage from "Pages/DeckPage";

function App() {
  return (
    <div className="page">
      <Router>
        <Header clasName="Header" />
        <div className="Navigation">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/decks" element={<DeckPage />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer className="Footer" />
      </Router>
    </div>
  );
}

export default App;
