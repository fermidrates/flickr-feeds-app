import trimText from "./trimText";

test("trim text longer than 20 characters", () => {
  expect(
    trimText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    )
  ).toBe("Lorem ipsum dolor si..");
});

test("do nothing to text shorter than 20 character", () => {
  expect(trimText("Flickr feeds app!")).toBe("Flickr feeds app!");
});
