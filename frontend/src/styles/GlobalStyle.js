import { createGlobalStyle, styled } from "styled-components";
import {
  darkColor,
  greenColor,
  lightBlueColor,
  redColor,
  whiteColor,
} from "./colors";
import { Link } from "react-router-dom";

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

export const H1 = styled.h1`
  text-align: center;
  margin: 20px 5px;
  font-size: 48px;
`;

export const ButtonContainer = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 30px auto;
  flex-wrap: wrap;
  align-content: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

export const Button = styled.button`
  color: ${(props) => props.color || darkColor};
  background-color: ${(props) => props.bg || whiteColor};
  font-size: 20px;
  padding: 12px 20px;
  text-align: center;
  border: ${(props) =>
    (props.bordercolor && "3px solid " + props.bordercolor) ||
    "3px solid " + lightBlueColor};
  border-radius: 3px;
  margin: 5px;
  &:hover {
    background-color: ${(props) => props.hoverbg || lightBlueColor};
    color: ${(props) => props.hovercolor || darkColor};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.color || whiteColor};
`;

export const ButtonLink = styled(Link)`
  display: inline-block;
  text-align: center;
  padding: 12px 20px;
  margin: 5px;
  font-size: 20px;
  min-width: 140px;
  background-color: ${whiteColor};
  color: ${darkColor};
  border: 3px solid ${lightBlueColor};
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: ${lightBlueColor};
  }
`;

export const BannerMessage = styled.div`
  background-color: ${(props) =>
    props.success == "true" ? greenColor : redColor};
  border-radius: 5px;
  padding: 15px;
  max-width: 400px;
  margin: auto auto 30px;

  p {
    margin: 10px auto;
  }
`;
