import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import laberestWhite from "./../../assets/Laberest_white.png";

import { HeaderContainer } from "./styles";

function Header() {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <HeaderContainer>
      <img src={laberestWhite} alt={"Laberest Logo"} />
      <div className="headerButton">
        <button>Coleções</button>
        <button>Hashtags</button>
      </div>
      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </HeaderContainer>
  );
}

export default Header;
