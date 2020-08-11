import { normalize } from 'path';

// Helpers
class Px {
  constructor(number) {
    this.number = number;
  }

  toString() {
    return `${this.number}px`;
  }
}
const px = number => new Px(number);

//Primary colors
const BLUE = '#4aa5de';
const GREEN = '#00afaa';
const LIGHT_GREEN = '#00beb7';

const LIGHT_GREY = '#f5f5f5';
const LIGHT_GREY_1 = '#e8e9ed';
const LIGHT_GREY_2 = '#dedede';
const LIGHT_GREY_3 = '#eaeaea';
const GREY = '#cccccc';
const GREY_1 = '#ebecf0';
const PURPLE = '#877daf';
const PINK = '#da5064';
const DARK_BLUE = '#31557d';
const BLUE_GRADIENT = 'linear-gradient(135deg,#07a7e3,#02bab6)';

export const COLORS = {
  BLUE,
  GREEN,
  LIGHT_GREEN,
  GREY,
  GREY_1,
  LIGHT_GREY,
  LIGHT_GREY_1,
  LIGHT_GREY_2,
  LIGHT_GREY_3,
  PURPLE,
  PINK,
  BLUE,
  DARK_BLUE,
  BLUE_GRADIENT
};

//Light theme

export const lightTheme = {
  // General theming
  colorGreen: GREEN,
  colorDarkBlue: DARK_BLUE,
  colorBlue: BLUE,
  blueGradient: BLUE_GRADIENT,
  link: BLUE,
  bgColor: LIGHT_GREY,
  fontGrey: LIGHT_GREY_2,

  leftShadow: '-12px 10px 20px 0px rgba(0, 0, 0, 0.24)',
  leftTopShadow: '-12px -10px 20px 0px rgba(0,0,0,0.24)',
  rightTopShadow: ' 12px -10px 20px 0px rgba(0,0,0,0.24)',
  bottomShadow: '  0 9px 23px rgba(0,0,0,.09), 0 5px 5px rgba(0,0,0,.06)',
  bottomShadowHover: '0 9px 23px rgba(0,0,0,.18),0 5px 5px rgba(0,0,0,.12)',

  borderRadius: px(50),
  borderRadiusLight: px(5),
  padding: px(20),
  margin: px(30),

  IntroPanel: {
    padding: px(50)
  },

  fontSizeBasic: px(18),
  fontSizeMedium: px(20),
  fontSizeBig: px(30),

  input: {
    borderColor: GREY,
    color: GREY,
    errorColor: BLUE,
    fontSize: '14px',
    padding: '15px',
    focus: {
      color: BLUE
    }
  },

  button: {
    disabled: {
      border: `1px solid ${LIGHT_GREY_2}`,
      color: LIGHT_GREY_2
    },
    active: {
      border: `1px solid ${BLUE}`,
      color: BLUE
    }
  },
  headers: {
    h1: {
      fontSize: '45px'
    },
    h2: {
      fontSize: '28px',
      fontWeight: 'normal',
      color: BLUE
    },
    h3: {
      fontSize: '18px',
      color: BLUE
    },
    border: LIGHT_GREY_3
  },
  TopNav: {
    size: px(90),
    backgroundColor: GREEN,
    Input: {
      backgroundColor: LIGHT_GREEN,
      fontSize: px(25)
    }
  },
  SideNav: {
    backgroundColor: DARK_BLUE,
    width: px(90),
    titleLabelBgColor: PINK
  },
  Dashboard: {
    backgroundColor: LIGHT_GREY
  },

  Table: {
    headerBg: GREY_1,
    headerTextColor: DARK_BLUE,
    headerPadding: '15px 20px',
    cellPadding: '10px 20px',
    rowBorderColor: LIGHT_GREY_3
  }
};

export default lightTheme;
