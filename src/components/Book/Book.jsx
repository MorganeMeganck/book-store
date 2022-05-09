import { DescriptionOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconButton, Rating, Typography } from "@mui/material";
import classNames from "classnames";

const Book = (props) => {
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [checked, setChecked] = useState(false);
  const handleClick = () => setClamped(!clamped);
  const token = useSelector((state) => state.user.token);
  const URL = "http://localhost:8080/books";
  const history = useNavigate();
  const { _id, name, author, description, category, completed, image, note } =
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
    <div className="card h-100 p-3 text-black align-items-center justify-content-between gap-2">
      <img src={image} alt={name} width="200px" height="300px" />
      <article>By {author}</article>
      <h3 className="mb-0">{name}</h3>
      <h4>{category}</h4>
      <div className={classNames("long-text", clamped && "clamp")}>
        {description}
      </div>
      {showButton && (
        <a className="text-primary" onClick={handleClick}>
          Read {clamped ? "more" : "less"}
        </a>
      )}
      {completed ? <div>Completed</div> : <div>Not Read</div>}
      {completed && (
        <div className="d-flex flex-column">
          <Rating name="simple-controlled" value={note} readOnly />
        </div>
      )}
      <div className="d-flex justify-content-around gap-3">
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
