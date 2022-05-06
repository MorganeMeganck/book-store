import { createReducer } from "@reduxjs/toolkit";
import {
  userClearError,
  userLogout,
  userSendError,
  userToken,
} from "../actions/UserAction";

const initialState = {
  token: null,
  expire: null,
  email: null,
  error: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userToken.type, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(userLogout.type, (state, action) => {
      return {
        ...initialState,
      };
    })
    .addCase(userSendError.type, (state, action) => {
      return {
        ...state,
        error: true,
      };
    })
    .addCase(userClearError.type, (state, action) => {
      return {
        ...state,
        error: false,
      };
    });
  // .addDefaultCase((state) => {
  //     return state;
  // });
});

export default userReducer;
