import * as React from "react";
import * as renderer from "react-test-renderer";
import Header from "../Header";

test("Header renders correctly", () => {
  const header = renderer.create(<Header>Child content</Header>);
  let tree = header.toJSON();
  expect(tree).toMatchSnapshot();
});
