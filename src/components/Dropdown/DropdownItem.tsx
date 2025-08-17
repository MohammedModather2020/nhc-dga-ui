import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import checkIcon from "../../assets/images/check.png";
import { mergeStrings } from "../../lib/helpers";
import Checkbox from "../Checkbox";

export interface DGA_DropdownItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  selected?: boolean;
  multiple?: boolean;
  value?: any;
  onClick?: (e: React.SyntheticEvent, value: any) => void;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DGA_DropdownItemProps> = ({
  selected,
  multiple,
  value,
  onClick,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      className={mergeStrings(
        "dgaui dgaui_dropdownItem" + (selected ? " selected" : ""),
        props.className
      )}
      $theme={theme}
      $selected={selected}
      $multiple={multiple}
      onClick={(e) => {
        onClick && onClick(e, value);
      }}
    >
      {multiple && <Checkbox color="neutral" size="small" value={selected} />}
      {children}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $selected?: boolean;
  $multiple?: boolean;
}>`
  direction: ${(props) => props.$theme.direction};
  color: ${(p) => p.$theme.textColor};
  padding: 8px;
  height: 36px;
  display: flex;
  align-items: center;
  background-color: #fff;
  transition: background-color 0.1s;
  position: relative;

  &::after {
    position: absolute;
    content: url(${checkIcon});
    display: ${(p) => (!p.$multiple && p.$selected ? "block" : "none")};
    inset-inline-end: 16px;
  }

  &:hover {
    background-color: ${(p) => p.$theme.palette.neutral[25]};
  }
  &:active {
    background-color: ${(p) => p.$theme.palette.neutral[50]};
  }

  .dgaui_checkbox {
    margin-bottom: 0;
    margin-inline-end: 8px;
  }
`;

export default DropdownItem;
