import { Link } from "react-router-dom";
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
        <Link to="/login" className="login-button custom-link">
          Login
        </Link>
        <Link to="/register" className="register-button custom-link">
          Register
        </Link>
      </div>
    </header>
  );
}

export default Header;
