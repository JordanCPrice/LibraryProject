// Header.tsx
import React from "react";
import logo from "../../assets/logo/library-book-image.png";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BasicMenu from "./ProfileMenu";
import "./styles.css";

interface HeaderProps {
  query: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ query, onSearchChange }) => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="library-book-image" className="navbar-logo" />
        <span className="navbar-text">Jordan's Library</span>
      </div>
      
      <div className="search-bar">
        <div className="search-bar-text"></div>
        <input
          type="text"
          value={query} // Bind value to query state
          onChange={(e) => onSearchChange(e.target.value)}  // Notify parent on search change
          className="search-input"
          placeholder="Search books..."
        />
        <div className="search-icon-div">
          <SearchRoundedIcon className="search-icon" />
        </div>
      </div>

      <div className="profile-container">
        <BasicMenu />
      </div>
    </div>
  );
};

export default Header;
