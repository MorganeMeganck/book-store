import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Book from "./Book";
const URL = "http://localhost:8080/books";

const Books = () => {
  const [books, setBooks] = useState();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const fetchHandler = async () => {
      return await axios
        .get(URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data);
    };

    fetchHandler().then((data) => setBooks(data.books));
  }, []);
  console.log(books);
  return (
    <div>
      <ul>
        {books &&
          books.map((book, i) => (
            <div key={i}>
              <Book book={book} />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Books;
