import React from "react";
import TitlePage from "../TitlePage";
import bookIcon from "../../favicon.svg";
import style from "./Main.module.scss";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const Main = () => {
  return (
    <>
      <div
        className={`${style.boxGlass} text-white p-5 d-flex justify-content-between align-items-center gap-3`}
      >
        <div className="d-flex justify-content-start align-items-center gap-3">
          <div className="bg-white rounded-circle p-3">
            <img
              className=""
              src={bookIcon}
              alt="book"
              width={50}
              height={50}
            />
          </div>
          <TitlePage content="Book App" />
        </div>
        <a className="btn btn-light text-primary fw-bold">Add a book</a>
      </div>
    </>
  );
};

export default Main;
