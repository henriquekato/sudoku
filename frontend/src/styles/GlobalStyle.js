import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Open Sans', sans-serif;
    }
    button {
        cursor: pointer;
    }
    a{
        text-decoration: none;
    }
    ul {
        list-style: none;
    }
`;
