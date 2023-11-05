import React from "react";
import { NavLink, Link } from "react-router-dom";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <h2 className="pe-4 ps-4">
              <TfiShoppingCartFull />
            </h2>
            <Link to="/" className="navbar-brand">
              Market Place
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link " aria-current="page">
                  Store
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link "
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link "
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard"
                      className="nav-link "
                      aria-current="page"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="dropdown nav-item">
                  <NavLink
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>

                    <ul
                      className="dropdown-menu "
                      
                    >
                      <li onClick={handleLogout} className="">
                        <NavLink
                          to="/login"
                          className="nav-optional "
                          aria-current="page"
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                    
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/auctionweb" className="nav-link " aria-current="page">
                  Auction
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
