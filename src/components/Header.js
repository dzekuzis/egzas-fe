import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const Header = () => {
    const auth = useContext(AuthContext);
    return (
        <>
        <nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light px-5">
          <Link className="navbar-brand" to="/home">
            Ugdymo Istaigu CRUD
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Pagrindinis
                </Link>
              </li>
              {auth.isLoggedin() ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/schools">
                      Ugdymo Istaigos
                    </Link>
                  </li>
                </>
              ) : (
                " "
              )}
            </ul>
            {!auth.isLoggedin() ? (
              <ul className="navbar-nav d-flex">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Prisijungimas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registracija
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav d-flex">
                <li className="nav-item">
                  <span className="nav-link mx-4">{`Sveiki, ${
                    auth.getUser().name
                  }`}</span>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={() => auth.logout()}
                  >
                    Atsijungti
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </>
  
    );
};

export default Header;