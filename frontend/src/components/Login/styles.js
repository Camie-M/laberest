import styled from "styled-components";

export const FormContainer = styled.div`
  height: 40vh;
  width: 30vw;

  margin-right: 10vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    height: 90px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      padding: 12px 0px;
    }

    input {
      border: solid 2px #f5266d;
      border-radius: 16px;
      width: 300px;
      height: 30px;

      margin-bottom: 8px;
      padding-left: 8px;
    }

    button {
      background-color: #f5266d;
      color: white;
      font-family: "Montserrat", sans-serif;
      font-weight: bold;

      border: solid 2px #a80f45;
      border-radius: 16px;
      height: 30px;
      margin-top: 12px;

      cursor: pointer;
      &:hover {
        background-color: #0a88a8;
        border: solid 2px #0a88a8;
        color: white;
        transition: 400ms;
      }
    }
  }

  p {
    font-size: 14px;

    span {
      font-weight: bold;
      color: #a80f45;

      cursor: pointer;

      &:hover {
        color: #0a88a8;
        transition: 400ms;
      }
    }
  }
`;
