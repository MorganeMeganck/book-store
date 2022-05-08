import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TitlePage from "../TitlePage";

const BookDetail = () => {
  const token = useSelector((state) => state.user.token);
  const URL = "http://localhost:8080/books";
  const [inputs, setInputs] = useState();
  const [note, setValue] = useState(0);
  const id = useParams().id;
  const [checked, setChecked] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`${URL}/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data)
        .then((data) => setInputs(data.book));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    return await axios
      .put(`${URL}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        category: String(inputs.category),
        note: Number(inputs.note),
        image: String(inputs.image),
        completed: Boolean(checked),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/books"));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="boxGlass text-white container p-5">
      <TitlePage content="Update This Book" />
      {inputs && (
        <form onSubmit={handleSubmit}>
          <FormLabel>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="filled"
            name="name"
          />
          <FormLabel>Author</FormLabel>
          <TextField
            value={inputs.author}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="filled"
            name="author"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="filled"
            name="description"
          />
          <FormLabel>Category</FormLabel>
          <TextField
            value={inputs.category}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="filled"
            name="category"
          />

          <FormLabel>Image</FormLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="filled"
            name="image"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="Completed"
          />
          <div className="d-flex flex-column my-3">
            <Typography component="legend">Note</Typography>
            <Rating
              name="simple-controlled"
              value={inputs.note}
              onChange={(event, newNote) => {
                setValue(newNote);
              }}
            />
          </div>

          <Button
            sx={{
              backgroundColor: "white",
              color: "#ffa07a",
            }}
            variant="contained"
            type="submit"
          >
            Update Book
          </Button>
        </form>
      )}
    </div>
  );
};

export default BookDetail;
