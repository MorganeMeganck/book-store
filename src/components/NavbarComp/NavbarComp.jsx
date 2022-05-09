import React from "react";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { userLogout } from "../../store/actions/UserAction";
import style from "./NavbarComp.module.scss";

const NavbarComp = () => {
  const userToken = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

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
            {userToken ? (
              <a
                className="navbarLink"
                onClick={() => {
                  dispatch(userLogout());
                }}
              >
                Logout
              </a>
            ) : (
              <>
                <Link className="navbarLink" to="/login">
                  Login
                </Link>
                <Link className="navbarLink" to={"/register"}>
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
export default NavbarComp;
