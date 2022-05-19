import React from "react";

import { StyledBtn } from "./styled";

type Props = {
  children: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, ...props }: Props) => (
  <StyledBtn {...props}>{children}</StyledBtn>
);

export default Button;
