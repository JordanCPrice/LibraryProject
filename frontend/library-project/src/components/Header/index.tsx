import React from "react";
import logo from "../../assets/logo/library-book-image.png";
import "./styles.css";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BasicMenu from "./ProfileMenu";

function Header(){
    return (
    <div className="navbar">
      <div className="logo-container">
    <img src={logo} alt="library-book-image" className="navbar-logo" />
    <span className="navbar-text">Jordan's Library</span>
    </div>
      <div className="search-bar">
        <div className="search-bar-text">Search...</div>
        <div className="search-icon-div">
          <SearchRoundedIcon className="search-icon"/>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-div">
            <BasicMenu/>
        </div>
      </div>
    </div>
    );
}

export default Header;
