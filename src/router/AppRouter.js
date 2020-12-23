import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlkemyScreen } from "../components/alkemy/AlkemyScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { startChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { checking, id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h2>Wait</h2>;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/login"
          component={LoginScreen}
          isAuthenticated={!!id}
        />
        <PublicRoute exact path="/register" component={RegisterScreen} />
        <PrivateRoute
          exact
          path="/"
          component={AlkemyScreen}
          isAuthenticated={!!id}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
