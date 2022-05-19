import React from "react";
import Icon from "@mdi/react";

import { StyledIconBtn } from "./styled";

type Props = {
  path: string;
};

const IconButton = ({ path, ...props }: Props) => (
  <StyledIconBtn {...props}>
    <Icon style={{ width: 16, height: 16 }} path={path} />
  </StyledIconBtn>
);

export default IconButton;
