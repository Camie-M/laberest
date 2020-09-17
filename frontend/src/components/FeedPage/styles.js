import styled from "styled-components";

export const ImageFeed = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 40px;

  div {
    margin: 10px 10px;
  }

  img {
    display: flex;
    width: 400px;
    height: 200px;

    border-radius: 16px;
  }
`;

export const CreateImageForm = styled.div`
  height: 10vh;
  width: 70vw;

  position: relative;
  left: 15vw;
  top: 20px;

  border: 2px solid #f5266d;
  border-radius: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  form {
    span {
      margin-right: 18px;
    }
    label {
      margin: 0px 4px 0px 12px;
      font-size: 14px;
    }

    input {
      border: solid 2px #0a88a8;
      border-radius: 16px;
      width: 100px;
      height: 30px;
      padding-left: 8px;

      &:hover {
        border: solid 2px #f5266d;
        transition: 400ms;
      }
    }

    .urlInput {
      width: 250px;
    }

    button {
      background-color: #0a88a8;
      color: white;
      font-family: "Montserrat", sans-serif;
      font-weight: bold;
      font-size: 16px;

      border: solid 2px #0a88a8;
      border-radius: 16px;
      height: 35px;
      width: 90px;
      margin-left: 12px;

      cursor: pointer;
      &:hover {
        background-color: #f5266d;
        border: solid 2px #f5266d;
        transition: 400ms;
      }
    }
  }
`;
