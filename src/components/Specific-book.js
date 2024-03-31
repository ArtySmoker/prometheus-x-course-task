import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContextProvider";
import "./specific-book.css";

function SpecificBook() {
  const { bookId } = useParams(); //параметр з динамічного шляху URL-адреси, зазначений в роумінгу
  const books = useContext(BooksContext);
  const [book, setBook] = useState(null);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState({}); //стейт для кошика
//пошук потрібної книги
  useEffect(() => {
    const book = books.find((book) => book.id === parseInt(bookId));
    setBook(book);
  }, [books, bookId]);
//розрахунок загальної вартості
  useEffect(() => {
    if (book && count > 0 && count <= 42) {
      const totalPrice = count * book.price;
      setTotalPrice(totalPrice);
    }
  }, [book, count]);
//запускається лише один раз, коли компонент монтується
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems && Object.keys(storedCartItems).length > 0) {
      setCartItems(storedCartItems);
    }
  }, []);
//встановлення кількості книг після повернення на сторінку
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems && storedCartItems[bookId]) {
      setCount(storedCartItems[bookId].count);
    }
  }, [bookId]);
//оновлення у локальний стейт
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
//відображення кількості обраних книг
  const handleCountChange = (event) => {
    const quantity = parseInt(event.target.value);
    if (quantity > 0 && quantity <= 42) {
      setCount(quantity);
    }
  };
//додавання книг до кошику та локального стейту
  const handleAddToCart = (event) => {
    event.preventDefault();
    const totalPrice = count * book.price;
    setTotalPrice(totalPrice);

    // add the book to the cartItems state
    setCartItems((prevCartItems) => {
      const updatedCartItems = {
        ...prevCartItems,
        [bookId]: {
          count,
          title: book.title,
          price: book.price,
        },
      };
      return updatedCartItems;
    });
  };

  if (!book) {
    return <div>Loading...</div>; 
  }

 

  return (
    <main className="only-book">
      <section className="specific-book">
        <div className="col-3 image_book">
          <img
            src={
              book.image || process.env.PUBLIC_URL + "/images/imageNotFound.png"
            }
            alt={book.title}
            className="img-book container"
          />
        </div>
        <div className="book container">
          <p>
            <strong>Book name: </strong>
            <i>{book.title}</i>
          </p>
          <p>
            <strong>Book author: </strong>
            <i>{book.author}</i>
          </p>
          <p className="text-aling">
            <strong>About: </strong>
            <i>{book.shortDescription}</i>
          </p>
        </div>
        <div className="col-3 add-to-cart">
          <form
            onSubmit={handleAddToCart}
            action="/cart-page"
            method="post"
            className="container add-form"
          >
            <div>
              <p className="align">
                <span className="bold">Price, $: </span>
                <span className="bold" id="price" data-testid="price">
                  {book.price}
                </span>
              </p>
            </div>
            <div className="label-input">
              <label htmlFor="count" className="form-label align bold">
                Count:{" "}
              </label>
              <div className="input-group">
                <input
                  type="number"
                  id="count"
                  name="Count_book"
                  className="form-control"
                  min="1"
                  max="42"
                  value={count}
                  onChange={handleCountChange}
                />
                <div className="button-plus-minus">
                  <button
                    data-testid="plus"
                    type="button"
                    className="btn btn-outline-secondary plus"
                    onClick={() => setCount(count < 42 ? count + 1 : 42)}
                  >
                    +
                  </button>
                  <button
                    data-testid="minus"
                    type="button"
                    className="btn btn-outline-secondary minus"
                    onClick={() => setCount(count > 1 ? count - 1 : 1)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="align">
                <span className="bold">Total price, $: </span>
                <span className="bold" id="total-price" data-testid="total-price">
                  {totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="add-card">
              <button type="submit" className="btn btn-secondary add">
                Add to card
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="description container">
        <p>
          <strong>Description: </strong>
          <i>{book.description}{" "}</i>
        </p>
      </section>
    </main>
  );
}

export default SpecificBook;
