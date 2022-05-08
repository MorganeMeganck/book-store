import { DescriptionOutlined } from "@mui/icons-material";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";

const Book = (props) => {
  const token = useSelector((state) => state.user.token);
  const URL = "http://localhost:8080/books";
  const history = useNavigate();
  const { _id, name, author, description, categorie, completed, image, note } =
    props.book;
  const deleteHandler = async () => {
    await axios
      .delete(`${URL}/${_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then(() => history("/"));
  };
  return (
    <div className="card w-25 p-3 text-black">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <h4>{categorie}</h4>
      <p>{description}</p>
      <div className="d-flex justify-content-around">
        <Link className="btn btn-primary fw-bold" to={`/books/${_id}`}>
          Update
        </Link>
        <a className="btn btn-outline-danger" onClick={deleteHandler} href="#">
          Delete
        </a>
      </div>
    </div>
  );
};

export default Book;
