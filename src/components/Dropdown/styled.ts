import styled from "@emotion/styled";
import { css } from "@emotion/react";

type DropdownElementProps = {
  selected?: boolean;
};

export const Container = styled.div`
  position: relative;
  z-index: 1;
`;

export const DropdownList = styled.ul`
  position: absolute;
  list-style-type: none;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  margin: 0;
  padding: 0;
  width: max-content;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 4px;
`;

export const DropdownElement = styled.li`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #9accea;
  }

  ${({ selected }: DropdownElementProps) =>
    selected &&
    css`
      background-color: #cce6f5;
    `}
`;
