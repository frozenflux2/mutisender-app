import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
// -----------------------------------------------------------

export const HeaderWrapper = styled.div`
  color: ${themeGet("colors.white")};
  width: 100%;
  z-index: 10;
`;
export const IconWrapper = styled.div`
  font-size: 0;
  padding: 5px;
  cursor: pointer;
`;

export const ConnectButton = styled.button`
  background-color: #00a6ff;
  color: white;
  font-size: 20px;
  border: none;
  padding: 10px 25px;
  margin-left: 15px;
  border-radius: 10px;
  cursor: pointer;
`;
