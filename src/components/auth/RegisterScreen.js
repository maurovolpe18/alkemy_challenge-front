import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startRegister } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "Nando",
    rPassword: "123456",
  });
  const { rName, rPassword } = formRegisterValues;
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(startRegister(rName, rPassword));
  };
  return (
    <>
      <div className="auth__container">
        <form className="auth__form" onSubmit={handleRegister}>
          <div className="auth__form-container">
            <h2 className="auth__h2">Register</h2>
            <div className="auth__box">
              <p className="auth__form-p">User: </p>
              <input
                className="auth__input"
                type="text"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="auth__box">
              <p className="auth__form-p">Password: </p>
              <input
                className="auth__input"
                type="password"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="auth__box">
              <button type="submit" className="auth__btn">
                Register
              </button>
              <div className="auth__line"></div>
              <div className="auth__verify">
                <p className="auth__form-p">Have an account? </p>
                <Link to="/login" className="auth__account">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
