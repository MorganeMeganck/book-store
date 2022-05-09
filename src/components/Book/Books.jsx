import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Book from "./Book";
const URL = "http://localhost:8080/books";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState();
  const [categoryItems, setCategoryItems] = useState();
  const [filterBook, setfilterBook] = useState("");
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

    fetchHandler().then((data) => {
      setBooks(data.books);
      const categoryItems = [...new Set(data.books.map((Val) => Val.category))];
      setCategoryItems(categoryItems);
    });
  }, []);

  return (
    <>
      {categoryItems && (
        <Buttons
          filterBook={setfilterBook}
          categoryItems={categoryItems}
          books={books}
        />
      )}
      <div>
        {books && (
          <Link to="/add" className="btn btn-light text-primary fw-bold">
            Add a book
          </Link>
        )}
        <ul className="d-flex justify-content-between gap-3 p-0 flex-wrap">
          {books &&
            books
              .filter((book) =>
                filterBook ? book.category === filterBook : true
              )
              .map((book, i) => (
                <div className="bg-white rounded" key={i}>
                  <Book book={book} />
                </div>
              ))}
          {!books && (
            <h3>You must be connected to your account to see your books</h3>
          )}
        </ul>
      </div>
    </>
  );
};

export default Books;
const Buttons = ({ filterBook, categoryItems, books }) => {
  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        {categoryItems.map((category) => {
          return (
            <button
              className="btn btn-outline-dark p-1 px-2 mx-5 btn fw-bold"
              onClick={() => {
                console.log(category);
                filterBook(category);
              }}
              key={category}
            >
              {category}
            </button>
          );
        })}
        {books.length > 2 && (
          <button
            className="btn btn-outline-dark p-1 px-3 mx-5 fw-bold btn"
            onClick={() => filterBook("")}
          >
            All
          </button>
        )}
      </div>
    </>
  );
};
