"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var borderStyle = "1px solid grey";
var searchBarHeight = 38;
var goButtonWidth = searchBarHeight;
var filtersButtonWidth = 51;
var overallWrapper = { position: "relative" };
var searchInput = {
    width: "100%",
    padding: 10,
    paddingRight: goButtonWidth + filtersButtonWidth,
    fontSize: '90%',
    border: borderStyle,
    boxSizing: "border-box"
};
var acMenu = {
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'scroll',
    width: '100%',
    zIndex: 10,
    boxSizing: "border-box"
};
var acItem = {
    borderBottom: borderStyle,
    borderLeft: borderStyle,
    borderRight: borderStyle,
    zIndex: 10,
    padding: 10,
    paddingRight: 0
};
var goButton = {
    position: "absolute",
    top: 0,
    right: 0,
    height: searchBarHeight,
    width: goButtonWidth,
    border: borderStyle
};
var filtersButton = {
    position: "absolute",
    top: 0,
    right: goButtonWidth - 1,
    height: searchBarHeight,
    width: filtersButtonWidth,
    border: borderStyle
};
var acWrapper = { width: "100%", height: searchBarHeight };
exports.default = { overallWrapper: overallWrapper, searchInput: searchInput, acMenu: acMenu, acItem: acItem, goButton: goButton, filtersButton: filtersButton, acWrapper: acWrapper };
