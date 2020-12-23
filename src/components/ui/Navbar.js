import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  };
  return (
    <div className="navbar">
      <div className="navbar__container">
        <h3 className="navbar__user">{user}</h3>
        <button className="navbar__exit" onClick={handleLogout}>
          Exit
        </button>
      </div>
    </div>
  );
};
