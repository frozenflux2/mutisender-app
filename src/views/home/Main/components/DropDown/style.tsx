import styled from "styled-components";
// -----------------------------------------------------------

export const DropDownWrapper = styled.div`
  border: 1px solid #415d9f;
  border-radius: 10px;
  width: 100%;
  /* max-width: 50 0px; */
  margin-right: 30px;
  /* outline: none;
  background-color: transparent; */

  max-width: 100%;
  padding: 0 1.5em;
  background: white;
  /* overflow: hidden; */
  &:hover,
  &.focus {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
  .search {
    display: flex;
    height: 3em;
    align-items: center;
    input {
      flex: 1;
      width: 100%;
      border: 0;
    }
    i {
      color: tomato;
    }
  }
`;
