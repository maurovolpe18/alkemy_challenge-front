import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startLogin } from "../../actions/auth";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    lName: "test5",
    lPassword: "12345",
  });
  const { lName, lPassword } = formLoginValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lName, lPassword));
  };

  return (
    <>
      <>
        <div className="auth__container">
          <form className="auth__form" onSubmit={handleLogin}>
            <div className="auth__form-container">
              <h2 className="auth__h2">Login</h2>
              <div className="auth__box">
                <p className="auth__form-p">User: </p>
                <input
                  className="auth__input"
                  type="text"
                  name="lName"
                  value={lName}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="auth__box">
                <p className="auth__form-p">Password: </p>
                <input
                  className="auth__input"
                  type="password"
                  name="lPassword"
                  value={lPassword}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="auth__box">
                <button type="submit" className="auth__btn">
                  Login
                </button>
                <div className="auth__line"></div>
                <div className="auth__verify">
                  <p className="auth__form-p">Don't have an account? </p>
                  <Link to="/register" className="auth__account">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
};
