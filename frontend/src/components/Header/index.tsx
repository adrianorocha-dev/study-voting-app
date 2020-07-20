import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch, IoIosHome, IoIosAdd } from 'react-icons/io';

import './styles.css';
import SearchBoxContext from '../../contexts/SearchBoxContext';

const Header: React.FC = () => {
  const { searchBoxText, setSearchBoxText } = useContext(SearchBoxContext)!;

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchBoxText(event.target.value);
  }

  return (
    <header>
      <Link to="/" className="button-home">
        <IoIosHome size={26} />
      </Link>

      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search"
          value={searchBoxText}
          onChange={handleTextChange}
        />
        <button className="search-button">
          <IoIosSearch />
        </button>
      </div>

      <Link to="/create" className="button-add">
        <IoIosAdd size={26} />
      </Link>
    </header>
  );
};

export default Header;
