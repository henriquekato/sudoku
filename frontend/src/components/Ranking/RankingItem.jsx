import styled from "styled-components";

const RankingItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
  margin: 25px 20px;
  padding: 15px;
  line-height: 25px;

  div {
    margin: auto 10px;
    text-align: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default RankingItem;
