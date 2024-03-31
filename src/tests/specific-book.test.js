import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SpecificBook from "../components/Specific-book";

//екземпляр книги для створення мок-об'єкту
const books = [
  {
    id: 1,
    author: "David Flanagan",
    price: 10.99,
    image:
      "https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg",
    title: "JavaScript: The Definitive Guide, 7th Edition",
    shortDescription:
      "JavaScript is the programming language of the web and is used by more software developers today than any other programming language.",
    description:
      "JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and engaging example code throughout. This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js.",
  },
];

//імітація контексту
const mockUseContext = jest.fn(() => books);
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

//імітація useParams (id книги)
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    bookId: "1",
  }),
}));

describe("SpecificBook", () => {
  test("increments count on clicking + button", () => {
    const { getByTestId, getByLabelText } = render(<SpecificBook />);

    const incrementButton = getByTestId("plus");
    const countInput = getByLabelText("Count:");

    fireEvent.click(incrementButton);

    expect(countInput.value).toBe("2");
  });

  test("decrements count on clicking - button", () => {
    const { getByTestId, getByLabelText } = render(<SpecificBook />);

    const decrementButton = getByTestId("minus");
    const countInput = getByLabelText("Count:");

    fireEvent.click(decrementButton);

    expect(countInput.value).toBe("1");
  });

  test("updates total price when count changes", () => {
    const { getByLabelText, getByText, getElementById, getByTestId } = render(
      <SpecificBook />
    );
    const countInput = getByLabelText("Count:");
    const priceElement = getByTestId("price");
    const totalPriceElement = getByTestId("total-price");

    fireEvent.change(countInput, { target: { value: "10" } });

    expect(priceElement.textContent).toEqual("10.99");
    expect(totalPriceElement.textContent).toEqual("109.90");
  });
});
