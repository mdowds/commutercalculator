import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Header from '../Header';

test("Header renders the title", () => {
    const header = renderer.create(<Header />);
    let tree = header.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Header renders children", () => {
    const header = renderer.create(<Header>Child content</Header>);
    let tree = header.toJSON();
    expect(tree).toMatchSnapshot();
});
