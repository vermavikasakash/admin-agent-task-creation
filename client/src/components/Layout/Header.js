import React from "react";
import { NavLink, Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  let user = localStorage.getItem("user");
  // console.log("user", user);

  // ?? LOGOUT HANDLER
  const logOutHandler = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  // ! JSX START
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={user && "/home-page"} className="navbar-brand">
            Machine Test
          </Link>

          <div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* //?? REGISTER LOGIN LOGOUT */}
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/home-page" className="nav-link ">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" onClick={logOutHandler}>
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
