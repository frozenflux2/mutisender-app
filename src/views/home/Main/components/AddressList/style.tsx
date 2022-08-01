import styled from "styled-components";
// -----------------------------------------------------------

export const AddressListWrapper = styled.div`
  border: 1px solid #415d9f;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  padding: 30px;
  .itemContainer {
    height: 300px;
    overflow-y: auto;
  }

  .addressitem {
    display: flex;
    justify-content: space-between;
    :hover {
      background: aliceblue;
      .cross {
        opacity: 100%;
        pointer-events: all;
      }
    }
  }
  .cross {
    opacity: 0;
    pointer-events: none;
  }
`;
