import useAuthentication from 'Pages/UserPage/auth.hook';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
  // const {signOut} = useAuth()
  const { logOut } = useAuthentication();

  return (
    <div className="nav">
      <Link to="/home" className="insidenav">
        Home
      </Link>
      <Link to="/decks" className="insidenav">
        Decks
      </Link>
      {/* <Link to="/today" className="insidenav">
        Today
      </Link> */}
      <Button
        onClick={() => logOut()}
        type="button"
        className="logout-custom"
        style={{ backgroundColor: '#0c2d48', border: 'none' }}>
        Log out
      </Button>
    </div>
  );
}

export default Navbar;
