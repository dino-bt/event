import React from "react";
import renderer from "react-test-renderer";


import App from "./App"

it("tests the App component", () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});
