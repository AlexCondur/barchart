import React, { useEffect, useState, useMemo, useCallback } from "react";

import { mdiCogOutline } from "@mdi/js";

import { useGetDropoutData } from "../../hooks/useGetDropoutData";

import { convertNodesObjectToArray, generateBranches } from "../../utils/nodes";

import { IconButton } from "../Button";
import BarChart, { BarType, BarData } from "../BarChart";
import Dropdown from "../Dropdown";

import { NodeType, NodeElement } from "../../types/Node";

import { Container, Header, HeaderActions, Body } from "./styled";

const FlowDropout = () => {
  const [activeBranch, setActiveBranch] = useState<string[]>([]);
  const { isLoading, data } = useGetDropoutData();

  const nodeList = useMemo(() => convertNodesObjectToArray(data), [data]);
  const branches = useMemo(() => generateBranches(nodeList), [nodeList]);
  const nodesBasedOnBranch = data
    ? activeBranch.map(
        (nodeId: string): NodeElement => ({
          id: nodeId,
          ...data[nodeId],
        })
      )
    : [];
  const barchartData =
    nodesBasedOnBranch?.map(
      (node): BarData => ({
        id: node.id,
        label: node.label,
        value: node.value,
        type:
          node.type === NodeType.BASIC ? BarType.PRIMARY : BarType.SECONDARY,
      })
    ) || [];

  const handleBranchSelection = useCallback(
    (key: string) => setActiveBranch(key.split("-")),
    []
  );

  useEffect(() => {
    if (branches.length > 0) {
      setActiveBranch(branches[0]);
    }
  }, [branches]);

  return (
    <Container>
      <>
        <Header>
          <p>Flow dropout per step and service</p>
          <HeaderActions>
            <Dropdown
              toggle="Choose branches"
              options={branches.map((branch) => ({
                key: branch.join("-"),
                value: branch.join(" -> "),
              }))}
              onSelect={handleBranchSelection}
            />
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
