import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
        <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stock">Stock</Link>
          </li>
          <li>
            <Link to="/users">Admin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
