import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { useProtectedPage } from "../../hooks/useProtectedPage";

const baseUrl = "http://localhost:3003/image";

function ImageModal() {
  useProtectedPage();
  const { imageId } = useParams();
  const history = useHistory();

  const token = localStorage.getItem("token");

  const [image, setImage] = useState({});
  const [hashtag, setHashtag] = useState({});

  useEffect(() => {
    getImageDetail();
  }, []);

  const getImageDetail = async () => {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(`${baseUrl}/${imageId}`, axiosConfig);
      setImage(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img src={image.file} />
      <p>{image.subtitle}</p>
      <label htmlFor="hashtag">Adicionar hashtag</label>
      <input
        value={hashtag}
        id="hashtag"
        type="text"
        required
        onChange={(e) => setHashtag(e.target.value)}
      />
    </div>
  );
}

export default ImageModal;
