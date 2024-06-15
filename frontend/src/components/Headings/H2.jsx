import styled from "styled-components";

const H2 = styled.h2`
  text-align: center;
  margin-bottom: ${(props) => (props.$margin ? "25px" : "none")};
`;

export default H2;
