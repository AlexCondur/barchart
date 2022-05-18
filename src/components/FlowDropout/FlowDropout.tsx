import React, { useState } from "react";

import { mdiCogOutline } from "@mdi/js";

import { useGetDropoutData } from "../../hooks/useGetDropoutData";

import Button, { IconButton } from "../Button";
import BarChart, { BarType, BarData } from "../BarChart";

import { NodeType } from "../../types/Node";

import { Container, Header, HeaderActions, Body } from "./styled";

const FlowDropout = () => {
  const [branch, setBranch] = useState();
  const { isLoading, data } = useGetDropoutData();

  console.log(isLoading, data);
  const parsedData =
    data &&
    Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

  const barchartData =
    parsedData?.map(
      (node): BarData => ({
        id: node.id,
        label: node.label,
        value: node.value,
        type:
          node.type === NodeType.BASIC ? BarType.PRIMARY : BarType.SECONDARY,
      })
    ) || [];

  return (
    <Container>
      <>
        <Header>
          <p>Flow dropout per step and service</p>
          <HeaderActions>
            <Button>Choose branches</Button>
            <IconButton path={mdiCogOutline} />
          </HeaderActions>
        </Header>
        <Body>
          {!barchartData.length || isLoading ? (
            "loading"
          ) : (
            <BarChart data={barchartData} />
          )}
        </Body>
      </>
    </Container>
  );
};

export default FlowDropout;
