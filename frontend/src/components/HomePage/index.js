import React from "react";
import folderImage from "./../../assets/folderImage.svg";

import Login from "./../Login/index";

import { HomeContainer, HomeImage } from "./styles.js";

function HomePage() {
  return (
    <HomeContainer>
      <HomeImage src={folderImage} alt={"Pastas e coleções de imagens"} />
      <Login />
    </HomeContainer>
  );
}

export default HomePage;
