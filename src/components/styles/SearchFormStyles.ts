import {CSSProperties} from "react";
const borderStyle = "1px solid grey";
const searchBarHeight = 38;
const goButtonWidth = searchBarHeight;
const filtersButtonWidth = 51;

const overallWrapper: CSSProperties = {display: "flex"};

const searchInput: CSSProperties = {
    width: "100%",
    padding: 10,
    paddingRight: goButtonWidth + filtersButtonWidth,
    fontSize: '90%',
    border: borderStyle,
    borderRight: 0,
    boxSizing: "border-box",
    height: searchBarHeight
};

const acMenu: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '90%',
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    boxSizing: "border-box"
};

const acItem: CSSProperties = {
    borderBottom: borderStyle,
    borderLeft: borderStyle,
    borderRight: borderStyle,
    zIndex: 10,
    padding: 10,
    paddingRight: 0
};

const goButton: CSSProperties = {
    height: searchBarHeight,
    width: goButtonWidth,
    border: borderStyle
};

const filtersButton: CSSProperties = {
    height: searchBarHeight,
    width: filtersButtonWidth,
    border: borderStyle,
    borderRight: 0
};

const acWrapper: CSSProperties = {width: "100%", height: searchBarHeight};

export default {overallWrapper, searchInput, acMenu, acItem, goButton, filtersButton, acWrapper};
