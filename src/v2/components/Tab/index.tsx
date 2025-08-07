import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";

export const sizes = {
  small: { w: 73, h: 36, p: "8px 12px" },
  medium: { w: 81, h: 44, p: "12px 16px" },
  large: { w: 81, h: 52, p: "16px" },
};

export interface DGA_TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: Size;
  selected?: boolean;
  vertical?: boolean;
}

const Tab: React.FC<DGA_TabProps> = ({
  children,
  size,
  selected,
  vertical,
  ...props
}) => {
  const theme = useTheme();

  const sizeResult: Size = size ?? "large";

  return (
    <StyledComponent
      {...props}
      className={mergeStrings("dgaui dgaui_tab", props.className)}
      $theme={theme}
      $customStyle={{
        w: sizes[sizeResult].w,
        h: sizes[sizeResult].h,
        p: sizes[sizeResult].p,
      }}
      $selected={selected}
      $vertical={vertical}
    >
      {children}
    </StyledComponent>
  );
};

const StyledComponent = styled.button<{
  $theme: Theme;
  $customStyle: {
    w: number;
    h: number;
    p: string;
  };
  $selected?: boolean;
  $vertical?: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  min-width: ${(p) => p.$customStyle.w}px;
  height: ${(p) => p.$customStyle.h}px;
  outline: none;
  background-color: transparent;
  border-radius: 4px;
  font-weight: ${(p) => (p.$selected ? 700 : 500)};
  color: ${(p) => p.$theme.palette.neutral[700]};
  padding: ${(p) => p.$customStyle.p};
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-inline-end: 4px;
  }

  &::after {
    content: "";
    display: block;
    opacity: ${(p) => (p.$selected ? 1 : 0)};
    height: ${(p) => (p.$vertical ? "50%" : "3px")};
    width: ${(p) => (p.$vertical ? "3px" : "80%")};
    border-radius: 10px;
    bottom: ${(p) => (p.$vertical ? "auto" : "1px")};
    inset-inline-start: ${(p) => (p.$vertical ? "1px" : "auto")};
    position: absolute;
    z-index: 2;
    background: ${(p) =>
      p.$selected ? p.$theme.palette.primary[600] : p.$theme.textColor};
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
  &:active {
    background-color: transparent;
    &::after {
      opacity: 1;
    }
  }

  &:focus {
    border: 2px solid ${(p) => p.$theme.textColor};
    &::after {
      opacity: ${(p) => (p.$selected ? 1 : 0)};
    }
  }
  &:disabled {
    color: ${(p) => p.$theme.palette.neutral[400]};
    cursor: default;
    pointer-events: none;
    &::after {
      opacity: ${(p) => (p.$selected ? 1 : 0)};
      background: ${(p) => (p.$selected ? p.$theme.palette.neutral[400] : "")};
    }
    img {
      filter: opacity(0.5) grayscale(100%);
    }
  }
`;

export default Tab;
