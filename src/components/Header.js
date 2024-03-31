import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  //поведінка кнопки виходу
  const handleSignoutClick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("cartItems");
    navigate("/signin");
  };

  if (!username) {
    return (
      <header className="header">
        <h4>X-course task / Kurilov Arthur</h4>
        <div className="header-right-block"></div>
      </header>
    ); // якщо користувач не авторизований, правий блок не буде відображений
  }

  return (
    <header className="header">
      <h4 className="header">X-course task / Kurilov Arthur</h4>
      <div className="header-right-block">
        <Link to="cart-page">
          <img
            src={process.env.PUBLIC_URL + "/images/cart.svg"}
            alt="Busket"
            className="busket header-right"
          />
        </Link>
        <button
          type="submit"
          className="btn btn-outline-dark btn-sm header-right"
          onClick={handleSignoutClick}
        >
          Sign-out
        </button>
        <img
          src={process.env.PUBLIC_URL + "/images/avatar.png"}
          alt="Avatar"
          className="avatar header-right"
        />
        <p className="header-right">{username}</p>
      </div>
    </header>
  );
}

export default Header;
