import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (user, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("login", { user, password }, "POST");
    const body = await resp.json();
    console.log(body);
    if (body.ok) {
      localStorage.setItem("token", body.token);
      dispatch(
        login({
          id: body.id,
          user: body.user,
        })
      );
    }
  };
};

export const startRegister = (user, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("user/new", { user, password }, "POST");
    const body = await resp.json();
    console.log(body);
    if (body.ok) {
      localStorage.setItem("token", body.token);
      dispatch(
        login({
          id: body.id,
          user: body.user,
        })
      );
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("renew", {}, "GET");
    const body = await resp.json();
    console.log(body, "start");
    if (body.ok) {
      localStorage.setItem("token", body.token);
      dispatch(
        login({
          id: body.id,
          user: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
