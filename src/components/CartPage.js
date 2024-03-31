import React, { useState, useEffect } from "react";
import "./cartPage.css";

function CartPage() {
  // const [cartItems, setCartItems] = useState({});
  const [books, setBooks] = useState([]);
//витягується з локального стейту інформація про обрані книжки для відображення на сторінці кошика у таблиці
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    // setCartItems(storedCartItems);
    setBooks(
      Object.values(storedCartItems).map((item) => ({
        count: item.count,
        title: item.title,
        price: item.price,
      }))
    );
  }, []);

  const handlePurchaseClick = () => {
    localStorage.removeItem("cartItems");
    // setCartItems({});
    setBooks([]);
  };

  const totalPrice = books.reduce(
    (acc, { count, price }) => acc + count * price,
    0
  );

  return (
    <div>
      {books.length === 0 ? (
        <div className="empty-cart">
          <div className="button-purchase">
            <button type="submit" className="btn btn-success purchase" disabled>
              Purchase
            </button>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/images/cart.svg"}
            alt="Cart"
            className="img-cart-empty"
          />
          <span>Cart empty...</span>
        </div>
      ) : (
        <div className="cart-items">
          <div className="button-purchase">
            <button
              type="submit"
              className="btn btn-success purchase"
              onClick={handlePurchaseClick}
            >
              Purchase
            </button>
          </div>
          <table className="cart-book-list">
            <thead className="cart-book-list">
              <tr className="table-head">
                <td className="title-col">Title book</td>
                <td className="count">Count</td>
                <td className="price">Price</td>
              </tr>
            </thead>
            <tbody className="cart-book-list">
              {books.map((item, index) => (
                <tr key={index}>
                  <td className="title-col">{item.title}</td>
                  <td className="count">{item.count}</td>
                  <td className="price">${item.price}</td>
                </tr>
              ))}
              <tr className="cart-book-list" id="total-price">
                <td></td>
                <td></td>
                <td className="price">Total price: ${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CartPage;
