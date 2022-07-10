import styled from "styled-components";

export const StyledProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 90%;
  height: 90vh;
  .userInfo {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h2 {
      text-align: center;
      font-size: 5rem;
    }
    img {
      width: 70%;
      align-self: center;
    }
  }
  .reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
