import { DescriptionOutlined } from "@mui/icons-material";
import React from "react";

const Book = (props) => {
  const { _id, name, author, description, categorie, completed, image, note } =
    props.book;
  return (
    <div className="card w-25 p-3 text-black">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <h4>{categorie}</h4>
      <p>{description}</p>
      <div className="d-flex justify-content-around">
        <a className="btn btn-primary fw-bold" href="#">
          Update
        </a>
        <a className="btn btn-outline-danger" href="#">
          Delete
        </a>
      </div>
    </div>
  );
};

export default Book;
