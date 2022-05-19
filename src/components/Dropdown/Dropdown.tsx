import React, { useState, useCallback, useRef } from "react";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import Button from "../Button";

import { Container, DropdownList, DropdownElement } from "./styled";

type Option = {
  key: string;
  value: string;
};

type Props = {
  toggle: string;
  options: Option[];
  onSelect?: (key: string) => void;
};

const Dropdown = ({ toggle, options, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const $dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleClick = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleDropdownClose = useCallback(() => setIsOpen(false), []);

  const handleOptionClick = useCallback(
    (key: string) => {
      setSelectedOption(key);
      onSelect?.(key);
    },
    [onSelect]
  );

  useOnClickOutside($dropdownRef, handleDropdownClose);

  return (
    <Container ref={$dropdownRef}>
      <Button onClick={handleToggleClick}>{toggle}</Button>
      {isOpen && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownElement
              key={option.key}
              selected={
                selectedOption ? option.key === selectedOption : index === 0
              }
              onClick={() => handleOptionClick(option.key)}
            >
              {option.value}
            </DropdownElement>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;
