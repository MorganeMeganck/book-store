import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const userToken = createAction("user/token", ({ token, expire }) => {
  const { email } = jwtDecode(token.token);
  return {
    payload: {
      token: token.token,
      expire,
      email,
    },
  };
});

export const userLogout = createAction("user/logout");

export const userSendError = createAction("user/sendError");
export const userClearError = createAction("user/clearRrror");

export const userLogin = ({ email, password }) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/auth/login", { email, password })
      .then(({ data }) => {
        dispatch(userToken(data));
      })
      .catch(() => {
        dispatch(userSendError());
      });
  };
};

export const userRegister = ({ email, password }) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8080/auth/register", {
        email,
        password,
      })
      .then(({ data }) => {
        dispatch(userToken(data));
      })
      .catch(() => {
        dispatch(userSendError());
      });
  };
};
