import styled from "styled-components";
import device from "../../utils/mediaQuerySizes";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 500px;
  h1 {
    text-align: center;
    margin-bottom: 5rem;
  }
  div {
    text-align: center;
    min-height: 2.5rem;
  }
  @media ${device.custom1} {
    width: 90%;
  }
`;
