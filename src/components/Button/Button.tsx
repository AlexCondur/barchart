import React from "react";

import { StyledBtn } from "./styled";

type Props = {
  children: string;
};

const Button = ({ children, ...props }: Props) => (
  <StyledBtn {...props}>{children}</StyledBtn>
);

export default Button;
