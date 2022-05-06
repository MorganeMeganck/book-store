import { Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import TitlePage from "./TitlePage";

const AddBook = () => {
  const [note, setValue] = useState(0);
  return (
    <>
      <div className="boxGlass text-white container p-5">
        <TitlePage content="Add a Book" />
        <Form className="flex-column">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Tape the name of the book" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="author"
              placeholder="Tape the author of the book"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <FormControl as="textarea" aria-label="With textarea" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="category"
              placeholder="Tape the category of the book"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Completed" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRating">
            <Typography component="legend">Note</Typography>
            <Rating
              name="simple-controlled"
              value={note}
              onChange={(event, newNote) => {
                setValue(newNote);
              }}
            />
          </Form.Group>
          <a className="btn btn-light text-primary fw-bold">Submit</a>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
