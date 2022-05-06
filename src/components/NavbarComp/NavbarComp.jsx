import React from "react";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import style from "./NavbarComp.module.scss";

const NavbarComp = () => {
  return (
    <Navbar id="header" className={style.navbar}>
      <div id="header-container" className="container navbar-container">
        <div className="navbar-header">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              className={(navData) =>
                navData.isActive ? "navbarLink active" : "navbarLink"
              }
              to="/"
            >
              Books
            </NavLink>
            <a className="navbarLink" href="/login">
              Login
            </a>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
export default NavbarComp;
