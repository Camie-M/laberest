import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100vw;
  height: 70px;

  background-color: #87dff5;

  img {
    width: 200px;
    margin-left: 20px;
  }

  button {
    color: white;
    background-color: #87dff5;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    font-size: 16px;

    border: none;

    cursor: pointer;
    &:hover {
      color: #0a88a8;
      transition: 400ms;
    }
  }

  .headerButton {
    position: absolute;
    left: 350px;

    button {
      width: 120px;

      border: 2px solid white;
      border-radius: 24px;
      margin-right: 24px;

      padding: 10px;
    }
  }

  .logoutButton {
    position: absolute;
    right: 20px;
  }
`;
