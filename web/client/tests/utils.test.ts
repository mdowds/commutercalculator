import {isEmptyObject} from '../utils';

test("isEmptyObject() returns correct results", () => {
    expect(isEmptyObject({})).toEqual(true);
    expect(isEmptyObject({foo: "bar"})).toEqual(false);
});
