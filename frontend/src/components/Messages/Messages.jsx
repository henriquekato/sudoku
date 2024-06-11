import styled from "styled-components";
import BannerMessage from "./BannerMessage";

const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

function Messages(props) {
  return (
    <StyledMessages>
      {props.success && <BannerMessage $success>{props.success}</BannerMessage>}
      {props.errors.length > 0 && (
        <BannerMessage>
          {props.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </BannerMessage>
      )}
    </StyledMessages>
  );
}
export default Messages;
