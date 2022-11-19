import Navbar from "Components/Header/Navbar/Navbar";
import BOX from "Components/Body/Side_box/Sidebox";
import "./Home.css";
function Home() {
  return (
    <div className="bodywrapper">
      <Navbar />
      <div className="bigbox">
        <div className="Grid">
          <p className="innner">Deck 1</p>
        </div>
      </div>
      <BOX />
    </div>
  );
}

export default Home;
