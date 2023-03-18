import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("OR");
  expect(linkElement).toBeInTheDocument();
});

test("get 20 data from getData successfully", async () => {
  const res = await fetch("http://localhost:8080/feeds");
  const formatRes = await res.json();
  expect(formatRes.items.length).toBe(20);
});

test("get 20 data from getDataByTag successfully", async () => {
  const TEST_TAG = "coin";
  const res = await fetch(`http://localhost:8080/feeds/${TEST_TAG}`);
  const formatRes = await res.json();
  expect(formatRes.items.length).toBe(20);
});
