import { createGlobalStyle } from "styled-components";

// reset 말고 normalize 사용
const GlobalStyle = createGlobalStyle`
  /* *,
  *:after,
  *::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  *:focus {
    outline: none;
  }
  html,
  body,
  div,
  span,
  object,
  iframe,
  figure,
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
  code,
  em,
  img,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  b,
  u,
  i,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  main,
  canvas,
  embed,
  footer,
  header,
  nav,
  section,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: inherit;
    line-height: 1;
    vertical-align: baseline;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-size-adjust: none;
  }
  input[type='text'],
  input[type='password'],
  textarea,
  select {
    border-radius: 0;
    border: none;
    outline: none;
    -webkit-appearance: none;
  }
  textarea {
    resize: none;
  }
  footer,
  header,
  nav,
  section,
  main {
    display: block;
  }
  body {
    font-family: "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
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
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border: none;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
  a {
    color: #000;
    text-decoration: none;
    &:link &:visited &:hover &:active {
      text-decoration: none;
    }
  } */
  
  #__next {
    height: 100%;
  }

  html, body {
    margin: 0;
    height: 100%;
  }

  .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
    min-height: 100%;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
`;

export default GlobalStyle;
