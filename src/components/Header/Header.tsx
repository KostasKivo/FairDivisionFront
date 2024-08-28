import {Link} from "react-router-dom";
import "./Header.css"; // Import the CSS file for styling

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo">
          Fair Division
        </Link>
      </div>
      <div className="auth-buttons">
        <Link to="/about" className="login-button custom-link">
          About
        </Link>
      </div>
    </header>
  );
}

export default Header;
