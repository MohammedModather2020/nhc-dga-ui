import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";

export interface DGA_HeaderMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  selected?: boolean;
}

const HeaderMenuItem: React.FC<DGA_HeaderMenuItemProps> = ({
  children,
  selected,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      {...props}
      className={mergeStrings("dgaui dgaui_headerMenuItem", props.className)}
      $theme={theme}
      $selected={selected}
    >
      {children}
    </StyledComponent>
  );
};

const StyledComponent = styled.button<{
  $theme: Theme;
  $selected?: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  height: 72px;
  outline: none;
  background-color: ${(p) =>
    p.$selected ? p.$theme.palette.primary[600] : "transparent"};
  border-radius: 4px;
  font-weight: ${(p) => (p.$selected ? 600 : 500)};
  color: ${(p) => (p.$selected ? "#fff" : p.$theme.textColor)};
  padding: 8px 16px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    display: block;
    opacity: ${(p) => (p.$selected ? 1 : 0)};
    position: absolute;
    z-index: 2;
    height: 6px;
    width: 90%;
    bottom: -2px;
    border-radius: 100px;
    background: ${(p) =>
      p.$selected ? p.$theme.palette.primary[400] : p.$theme.textColor};
  }

  &:hover {
    background-color: ${(p) =>
      p.$selected
        ? p.$theme.palette.primary[700]
        : p.$theme.palette.neutral[100]};
    &::after {
      opacity: 1;
      background: ${(p) =>
        p.$selected ?p.$theme.palette.primary[400] : p.$theme.palette.neutral[400]};
    }
  }
  &:active {
    background-color: ${(p) =>
      p.$selected
        ? p.$theme.palette.primary[900]
        : p.$theme.palette.neutral[200]};
    &::after {
      opacity: 1;
      background: ${(p) =>
        p.$selected ? p.$theme.palette.primary[400] : p.$theme.palette.neutral[800]};
    }
  }

  &:focus {
    border: 2px solid ${(p) => p.$theme.textColor};
    &::after {
      opacity: ${(p) => (p.$selected ? 1 : 0)};
    }
  }
`;

export default HeaderMenuItem;
