import styled from "styled-components";
import { greenColor, redColor } from "../../styles/colors";

const BannerMessage = styled.div`
  background-color: ${(props) => (props.$success ? greenColor : redColor)};
  border-radius: 5px;
  padding: 15px;
  margin: auto 30px;

  p {
    margin: 10px auto;
  }

  @media (min-width: 768px) {
    width: 650px;
  }
`;

export default BannerMessage