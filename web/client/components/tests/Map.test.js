import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../Map.jsx';

test("Map renders the basic map container", () => {
    const map = renderer.create(
        <Map divRef={()=>{}}>Child content</Map>
    );
    let tree = map.toJSON();
    expect(tree).toMatchSnapshot();
});
