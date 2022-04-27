import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {

    //Status colors
    COMPLETED:"#e9fff4",
    COMPLETED1:"#58daa3d7",
    UNCOMPLETED:"#e7f8ff",
    BUG:"#ffe2e2",
    EXPIRED:"#eff3f6",
    DELETED:"",

    // base colors
    primary: "#fe6332", // orange
    primary1:'#ffe5e3',
    secondary: "#0C381F",   // dark green

    green: "#66D59A",
    lightGreen: "#E6FEF0",

    lime: "#00BA63",
    emerald: "#2BC978",

    red: "#FF4134",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightPurple: "#F3EFFF",

    yellow: "#FFC664",
    lightYellow: "#FFF9EC",

    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#FCFBFC",
    lightGray1: "rgb(213 213 213)",
    lightGray2:"#eff3f6",
    lightGray3:"#fbfbfb",

    gray: "#C1C3C5",
    gray2: "#8b8b8b",
    darkGray: "#C3C6C7",
    darkGray1:"#898989",

    transparent: "transparent",
    transparentBlack:"#00000012",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius:  13,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;