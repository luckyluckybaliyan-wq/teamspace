import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        TeamSpace
      </Link>
      {user && (
        <div className="nav-right">
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
