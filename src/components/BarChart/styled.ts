import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { BarType } from "./types";

type BarProps = {
  percent: number;
  type: BarType;
};

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:not(:first-of-type) {
    margin-left: 80px;
  }
`;

export const BarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
`;

export const Bar = styled.div`
  position: relative;
  width: 80px;
  border-radius: 10px;

  ${({ percent, type }: BarProps) => css`
    height: ${percent}%;
    background-color: ${type === BarType.PRIMARY ? "#d7ebff" : "#d4eeea"};
  `}
`;

export const BarText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  width: max-content;
`;

export const Percentage = styled.p`
  font-weight: 600;
`;

type DifferenceProps = {
  value: number;
};

export const Difference = styled.div`
  position: absolute;
  left: -15px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3e3e3;
  border-radius: 60%;
  transform: translateX(-100%);

  &::after {
    content: "${({ value }: DifferenceProps) =>
      value > 0 ? "+" : "" + value}%";
    color: #9b9b9b;
    position: absolute;
    bottom: -10px;
    transform: translateY(100%);
  }
`;
