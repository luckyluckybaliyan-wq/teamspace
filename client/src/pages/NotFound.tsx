import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="center">
      <h2>404 - Page not found</h2>
      <Link to="/">Go home</Link>
    </div>
  );
}
