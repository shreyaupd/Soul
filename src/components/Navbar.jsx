import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-row gap-8 ml-0">
      <Link
        to="/"
        className={`font-semibold transition-colors ${
          location.pathname === '/' ? 'text-white underline' : 'text-white/70 hover:text-white'
        }`}
      >
        Search
      </Link>
      <Link
        to="/collection"
        className={`font-semibold transition-colors ${
          location.pathname === '/collection' ? 'text-white underline' : 'text-white/70 hover:text-white'
        }`}
      >
        Collection
      </Link>
    </nav>
  );
};

export default Navbar;