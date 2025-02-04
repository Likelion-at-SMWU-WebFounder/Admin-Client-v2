import { createGlobalStyle, css } from "styled-components";
import notosanBlack from "../assets/font/NotoSansKR-Black.woff2";
import notosanBold from "../assets/font/NotoSansKR-Bold.woff2";
import notosanLight from "../assets/font/NotoSansKR-Light.woff2";
import notosanMedium from "../assets/font/NotoSansKR-Medium.woff2";
import notosanRegular from "../assets/font/NotoSansKR-Regular.woff2";
import notosanThin from "../assets/font/NotoSansKR-Thin.woff2";
const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    /* font-size: 62.5%; */
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
  }
`;

export const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
    font-family: 'Noto Sans Thin';
    src: url(${notosanThin}) format('woff2');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Noto Sans Light';
    src: url(${notosanLight}) format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Noto Sans Regular';
    src: url(${notosanRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Noto Sans Medium';
    src: url(${notosanMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Noto Sans Bold';
    src: url(${notosanBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Noto Sans Black';
    src: url(${notosanBlack}) format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}
#root, body, html {
    width:100%;
    height: 100vh;
    margin: 0 auto;
}

* {
    font-family: 'Noto Sans Medium';
    box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: #eb9537;
  text-decoration: underline;
}

a:active {
  color: #eb9537;
  text-decoration: underline;
}

ul {
  list-style: none;
  padding-left: 0px;
}
    
`;

export default GlobalStyle;
