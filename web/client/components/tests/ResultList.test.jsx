"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var renderer = require("react-test-renderer");
var enzyme_1 = require("enzyme");
var ResultList_1 = require("../ResultList");
var Result_1 = require("../Result");
test("ResultList renders the container", function () {
    var list = renderer.create(<ResultList_1.default results={[]} isLoading={false} onSelectResult={function () { }}/>);
    expect(list.toJSON()).toMatchSnapshot();
});
test("ResultList renders the container with custom styles", function () {
    var list = renderer.create(<ResultList_1.default results={[]} isLoading={false} styles={{ height: 200 }} onSelectResult={function () { }}/>);
    expect(list.toJSON()).toMatchSnapshot();
});
test("ResultList renders the loading indicator", function () {
    var list = renderer.create(<ResultList_1.default results={[]} isLoading={true} onSelectResult={function () { }}/>);
    expect(list.toJSON()).toMatchSnapshot();
});
test("ResultList renders results", function () {
    var list = enzyme_1.shallow(<ResultList_1.default results={[mockResult("foo", 10), mockResult("bar", 20)]} isLoading={false} onSelectResult={function () { }}/>);
    expect(list.find(Result_1.default).length).toEqual(2);
});
test("ResultList renders details for one result when selectedResult is set", function () {
    var res = mockResult("foo", 10);
    var list = enzyme_1.shallow(<ResultList_1.default results={[res, mockResult("bar", 20)]} isLoading={false} onSelectResult={function () { }} selectedResult={res}/>);
    expect(list.find('[isSelected=true]').length).toEqual(1);
});
function mockResult(id, time) {
    return {
        origin: { id: id, name: id, position: { lat: 0, lng: 0 } },
        journeyTime: time,
        seasonTicket: {}
    };
}
