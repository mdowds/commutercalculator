const borderStyle = "1px solid grey";
const searchBarHeight = 38;
const goButtonWidth = searchBarHeight;
const filtersButtonWidth = 51;

const overallWrapper = {position: "relative"};

const searchInput = {
    width: "100%",
    padding: 10,
    paddingRight: goButtonWidth + filtersButtonWidth,
    fontSize: '90%',
    border: borderStyle,
    boxSizing: "border-box"
};

const acMenu = {
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'scroll',
    width: '100%',
    zIndex: 10,
    boxSizing: "border-box"
};

const acItem = {
    borderBottom: borderStyle,
    borderLeft: borderStyle,
    borderRight: borderStyle,
    zIndex: 10,
    padding: 10,
    paddingRight: 0
};

const goButton = {
    position: "absolute",
    top: 0,
    right: 0,
    height: searchBarHeight,
    width: goButtonWidth,
    border: borderStyle
};

const filtersButton = {
    position: "absolute",
    top: 0,
    right: goButtonWidth - 1,
    height: searchBarHeight,
    width: filtersButtonWidth,
    border: borderStyle
};

const acWrapper = {width: "100%", height: searchBarHeight};

export default {overallWrapper, searchInput, acMenu, acItem, goButton, filtersButton, acWrapper};
