import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useProtectedPage } from "../../hooks/useProtectedPage";

import Header from "./../Header/index";

import { ImageFeed, CreateImageForm } from "./styles";

const baseUrl = "http://localhost:3003/image";

function FeedPage() {
  let history = useHistory();
  useProtectedPage();
  const [images, setImages] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState("");

  /* Pegar token do LocalStorage */
  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    getFeed();
  }, []);

  const goToPost = (id) => {
    history.push(`/image/${id}`);
  };

  const getFeed = async () => {
    try {
      const response = await axios.get(`${baseUrl}/feed`, axiosConfig);
      setImages(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateImage = async (event) => {
    event.preventDefault();

    const body = {
      subtitle: subtitle,
      author: author,
      file: file,
    };

    try {
      await axios.post(`${baseUrl}/create`, body);
      alert("Imagem criada com sucesso!");
    } catch (e) {
      alert("Falha ao criar imagem");
    }
  };

  return (
    <div>
      <Header />
      <CreateImageForm>
        <form onSubmit={handleCreateImage}>
          <span>Cria sua imagem!</span>
          <label htmlFor="subtitle">Legenda</label>
          <input
            value={subtitle}
            id="subtitle"
            type="text"
            required
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <label htmlFor="author">Autor</label>
          <input
            value={author}
            id="author"
            type="text"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />

          <label htmlFor="file">URL</label>
          <input
            value={file}
            id="file"
            type="text"
            required
            onChange={(e) => setFile(e.target.value)}
            className="urlInput"
          />

          <button>Criar</button>
        </form>
      </CreateImageForm>
      <ImageFeed>
        {images.map((item) => {
          return (
            <div>
              <img src={item.file} onClick={() => goToPost(item.id)} />
              <p>{item.subtitle}</p>
            </div>
          );
        })}
      </ImageFeed>
    </div>
  );
}

export default FeedPage;
