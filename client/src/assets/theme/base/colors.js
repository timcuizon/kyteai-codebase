/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
 * The base colors for the Soft UI Dashboard React.
 * You can add new color using this file.
 * You can customized the colors for the entire Soft UI Dashboard React using thie file.
 */

const colors = {
  background: {
    default: "#f8f9fa",
  },

  colorScheduled: {
    default: "#0d6efd"
  },

  colorISMgreen: {
    main: "#1E4C2B",
    focus: "#296b3b",
  },

  lightGreen: {
    main: "#698771",
    focus: "#698771",
  },

  colorISMyellow: {
    main: "#FDB813",
  },

  text: {
    main: "#67748e",
    focus: "#67748e",
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  gradientGreen: {
    main: "#36624B",
    focus: "#1EAB89",
  },

  black: {
    light: "#141414",
    main: "#292627",
    focus: "#292627",
  },

  primary: {
    main: "#1E4C2B",
    focus: "#0d6efd",
  },

  secondary: {
    main: "#6c757d",
    focus: "#6c757d",
  },

  info: {
    main: "#1E4C2B",
    focus: "#296b3b",
  },

  success: {  
    main: "#198754",
    focus: "#198754",
  },

  warning: {
    main: "#ffc107",
    focus: "#ffc107",
  },

  error: {
    main: "#dc3545",
    focus: "#dc3545",
  },

  light: {
    main: "#f8f9fa",
    focus: "#f8f9fa",
  },

  dark: {
    main: "#212529",
    focus: "#212529",
  },

  grey: {
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },

  gradients: {
    primary: {
      main: "#198754",
      state: "#1EAB89",
    },

    secondary: {
      main: "#6c757d",
      state: "#a8b8d8",
    },

    info: {
      main: "#1E4C2B",
      state: "#1E4C2B",
    },

    success: {
      main: "#198754",
      state: "#98ec2d",
    },

    warning: {
      main: "#ffc107",
      state: "#fbcf33",
    },

    error: {
      main: "#dc3545",
      state: "#ff667c",
    },

    light: {
      main: "#f8f9fa",
      state: "#ebeff4",
    },

    dark: {
      main: "#212529",
      state: "#212529",
    },

    pendingTag:{
      main:"#0D6EFD",
      state:"#0D6EFD",
    },

    approvedTag:{
      main:"#198754",
      state:"#198754",
    }, 

    activityTag:{
      main:"#ffa31a",
      state:"#ffa31a",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  
  },

  alertColors: {
    primary: {
      main: "#7928ca",
      state: "#d6006c",
      border: "#efb6e2",
    },

    secondary: {
      main: "#627594",
      state: "#8ca1cb",
      border: "#dadee6",
    },

    info: {
      main: "#17c1e8",
      focus: "#1EAB89",
      border: "#b9ecf8",
    },

    success: {
      main: "#17ad37",
      state: "#84dc14",
      border: "#daf3b9",
    },

    warning: {
      main: "#ffc107",
      state: "#ffc107",
      border: "#fef1c2",
    },

    error: {
      main: "#ea0606",
      state: "#ff3d59",
      border: "#f9b4b4",
    },

    light: {
      main: "#ced4da",
      state: "#d1dae6",
      border: "#f8f9fa",
    },

    dark: {
      main: "#141727",
      state: "#2c3154",
      border: "#c2c8d1",
    },
  },

  badgeColors: {
    primary: {
      background: "#0d6efd",
      text: "#FFFFFF",
    },

    secondary: {
      background: "#6c757d",
      text: "#FFFFFF",
    },

    info: {
      background: "#0dcaf0",
      text: "#FFFFFF",
    },

    success: {
      background: "#198754",
      text: "#FFFFFF",
    },

    warning: {
      background: "#ffc107",
      text: "#FFFFFF",
    },

    error: {
      background: "#dc3545",
      text: "#FFFFFF",
    },

    light: {
      background: "#f8f9fa",
      text: "#FFFFFF",
    },

    dark: {
      background: "#212529",
      text: "#FFFFFF",
    },
  },

  inputColors: {
    borderColor: { main: "#d2d6da", focus: "#35d1f5" },
    boxShadow: "#81e3f9",
    error: "#fd5c70",
    success: "#66d432",
  },

  sliderColors: {
    thumb: { borderColor: "#d9d9d9" },
  },

  circleSliderColors: {
    background: "#d3d3d3",
  },

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
