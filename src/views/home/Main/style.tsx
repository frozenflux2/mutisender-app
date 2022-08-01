import styled from "styled-components";
// -----------------------------------------------------------

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AddressInput = styled.input`
  font-size: 20px;
  padding: 8px;
  outline: none;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #415d9f;
  font-size: 16px;
`;

export const AddButton = styled.button`
  background-color: #00a6ff;
  color: white;
  border: none;
  padding: 10px 25px;
  margin-left: 15px;
  border-radius: 10px;
`;

export const InputToolContainer = styled.div`
  padding: 20px 0;
  display: flex;
`;

export const SaveButton = styled.button`
  padding: 0%;
  background-color: #0044ff;
  color: white;
  border: none;
  padding: 10px 25px;
  margin: 10px 0;
  width: 500px;
  border-radius: 10px;
  cursor: pointer;
`;

export const TokenAddressInput = styled.input`
  padding: 8px;
  border: 1px solid #415d9f;
  border-radius: 10px;
  width: 100%;
  margin-right: 30px;
  font-size: 20px;
  max-width: 100%;
  background: white;
  font-size: 16px;

  /* overflow: hidden; */
  &:hover,
  &.focus {
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  }
`;
