import styled from "@emotion/styled";

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: #ececec;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const StyledBtn = styled(Btn)`
  padding: 0 10px;
  font-size: 12px;
`;

export const StyledIconBtn = styled(Btn)`
  width: 30px;
`;
