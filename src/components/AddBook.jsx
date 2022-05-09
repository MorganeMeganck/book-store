import { Rating, Typography } from "@mui/material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TitlePage from "./TitlePage";
import { useSelector } from "react-redux";
import NavbarComp from "./NavbarComp/NavbarComp";
import Footer from "./Footer/Footer";
const URL = "http://localhost:8080/books";

const AddBook = () => {
  const token = useSelector((state) => state.user.token);
  const history = useNavigate();
  const [note, setValue] = useState(0);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    category: "",
    author: "",
    image: "",
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    return await axios
      .post(
        URL,
        {
          name: String(inputs.name),
          author: String(inputs.author),
          description: String(inputs.description),
          category: String(inputs.category),
          note: Number(note),
          image: String(inputs.image),
          completed: Boolean(checked),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/"));
  };

  return (
    <>
      <NavbarComp />
      <div className="boxGlass text-white container p-5">
        <TitlePage content="Add a Book" />
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
              value={note}
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
            Add Book
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBook;
