import React from "react";

import Icon from "@mdi/react";
import { mdiArrowDownCircleOutline } from "@mdi/js";

import {
  Container,
  BarContainer,
  BarWrapper,
  Bar,
  BarText,
  Percentage,
  Difference,
} from "./styled";

import { BarData } from "./types";

type Props = {
  data: BarData[];
};

const BarChart = ({ data }: Props) => {
  return (
    <Container>
      {data.map((barData: BarData, index: number) => (
        <BarWrapper key={barData.id}>
          <BarContainer>
            <Bar percent={barData.value} type={barData.type}>
              <BarText>{barData.label}</BarText>
            </Bar>
            {index > 0 && (
              <Difference value={barData.value - data[index - 1].value}>
                <Icon
                  style={{ width: 20, height: 20 }}
                  color="#323a44"
                  path={mdiArrowDownCircleOutline}
                />
              </Difference>
            )}
          </BarContainer>
          <Percentage>{barData.value}%</Percentage>
        </BarWrapper>
      ))}
    </Container>
  );
};

export default BarChart;
