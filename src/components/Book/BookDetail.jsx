import {
  Alert,
  AlertTitle,
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
import Footer from "../Footer/Footer";
import NavbarComp from "../NavbarComp/NavbarComp";
import TitlePage from "../TitlePage";

const BookDetail = () => {
  const token = useSelector((state) => state.user.token);
  const URL = "http://localhost:8080/books";
  const [inputs, setInputs] = useState();
  const [note, setValue] = useState(0);
  const id = useParams().id;
  const [isToast, setToaster] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`${URL}/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setInputs(data.book);
          setValue(data.book.note);
          setChecked(data.book.completed);
        });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    return await axios
      .put(
        `${URL}/${id}`,
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
    sendRequest().then(() => {
      const timeout = setTimeout(() => {
        setToaster(false);
      }, 3000);
      setToaster(true);
    });
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <NavbarComp />
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
              Update Book
            </Button>
          </form>
        )}
        {isToast && (
          <Alert variant="outlined" className="mt-3" severity="success">
            <AlertTitle>Updated !</AlertTitle>
            The book had been successfully <strong>updated!</strong>
          </Alert>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookDetail;
