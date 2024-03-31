import React, { useContext, useState } from "react";
import "./book-list.css";
import { Link } from "react-router-dom";
import { BooksContext } from "../contexts/BooksContextProvider";

function BookList() {
  const books = useContext(BooksContext);
  
  //стейт для пошуку назви
  const [searchText, setSearchText] = useState("");

  //стейт для фільтрування за ціною
  const [filterByPrice, setFilterByPrice] = useState("all");
  
  //умова фільтру за ціною
  const filterBooksByPrice = (book) => {
    switch (filterByPrice) {
      case "all":
        return true;
      case "0-15":
        return book.price > 0 && book.price < 15;
      case "15-30":
        return book.price >= 15 && book.price < 30;
      case "30+":
        return book.price >= 30;
      default:
        return true;
    }
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(filterBooksByPrice);

  return (
    <main className="book-list">
      <section className="search">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn bg-body-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Price
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setFilterByPrice("all");
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setFilterByPrice("0-15");
                }}
              >
                0 - 15
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setFilterByPrice("15-30");
                }}
              >
                15 - 30
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setFilterByPrice("30+");
                }}
              >
                30 +
              </button>
            </li>
          </ul>
        </div>
      </section>
      <section className="books">
        <div className="books">
          {/* відображення тільки відфільтрованих книг */}
          {filteredBooks.map((book) => (
            <div className="book-in-books" key={book.id}>
              <img
                src={
                  book.image ||
                  process.env.PUBLIC_URL + "/images/imageNotFound.png"
                }
                alt={book.title}
                className="cart-size"
              />
              {/* додано перевірку на довжину назви та заміну трикрапкою, якщо потрібно */}
              <h5 className="cart-size">
                {book.title.length > 24
                  ? book.title.substring(0, 24) + "..."
                  : book.title}
              </h5>
              <h6 className="cart-size">by {book.author}</h6>
              <div className="button-view cart-size">
                <h6>{book.price} USD </h6>
                <Link to={`/specific-book/${book.id}`}>
                  <button
                    type="button"
                    className="view btn btn-outline-info"
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookList;
