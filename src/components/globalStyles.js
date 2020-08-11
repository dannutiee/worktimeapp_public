import normalize from 'normalize.css';

export default `
  ${normalize}

  html, body, #root {
    height: 100%;
  }
  body {
    padding: 0px 0 0 90px;
    box-sizing: border-box;
    background: #f5f5f5;
  }
  input{
    border: none;
    outline: none;
  }
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:active,
  input:-webkit-autofill:focus {
      background-color: #FFFFFF !important;
      color: #555 !important;
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      -webkit-text-fill-color: #555555 !important;
      }
`;
