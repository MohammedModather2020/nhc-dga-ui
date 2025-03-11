import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import getButtonColors from "./buttonColors";

export const sizes = {
  small: { w: 74, h: 24, p: 8, f: 12 },
  medium: { w: 94, h: 32, p: 12, f: 14 },
  large: { w: 110, h: 40, p: 16, f: 16 },
};

interface DGA_ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  color?: ColorName;
}

const Button = React.forwardRef<HTMLButtonElement, DGA_ButtonProps>(
  ({ variant, size, color, children, ...props }, ref) => {
    const theme = useTheme();

    const colorNameResult: ColorName = color ?? "primary";
    const sizeResult: Size = size ?? "large";
    const variantResult: Variant = variant ?? "contained";
    const buttonColors = getButtonColors(theme);
    let backgroundColor = buttonColors[colorNameResult].default;
    let hoverBackgroundColor = buttonColors[colorNameResult].hovered;
    let activeBackgroundColor = buttonColors[colorNameResult].active;
    let fontColor = theme.palette[colorNameResult].contrastText;
    let fontColorHovered = "";
    let fontColorActive = "";
    let border = "border: none";
    let borderFocus = "border: 1px solid;";
    let cursor = "pointer";

    if (variantResult === "outlined") {
      backgroundColor = "transparent";
      hoverBackgroundColor = theme.palette[colorNameResult][100];
      activeBackgroundColor = theme.palette[colorNameResult][200];
      fontColor = buttonColors[colorNameResult].default;
      border = `border: 2px solid ${theme.palette[colorNameResult][200]}`;
      borderFocus = "border: 2px solid transparent;";
    }
    if (variantResult === "text") {
      backgroundColor = "transparent";
      hoverBackgroundColor = theme.palette[colorNameResult][100];
      activeBackgroundColor = theme.palette[colorNameResult][200];
      fontColor = buttonColors[colorNameResult].default;
      border = "border: none";
      borderFocus = "border: none;";
    }
    if (variantResult === "transparent") {
      backgroundColor = "transparent";
      hoverBackgroundColor = "transparent";
      activeBackgroundColor = "transparent";
      fontColor = buttonColors[colorNameResult].default;
      fontColorHovered = `color: ${buttonColors[colorNameResult].hovered}`;
      fontColorActive = `color: ${buttonColors[colorNameResult].active}`;
      border = "border: none";
      borderFocus = "border: none;";
    }
    if (variantResult === "solid") {
      backgroundColor = theme.palette[colorNameResult][100];
      hoverBackgroundColor = theme.palette[colorNameResult][200];
      activeBackgroundColor = theme.palette[colorNameResult][200];
      fontColor = buttonColors[colorNameResult].default;
      border = "border: none";
      borderFocus = "border: none;";
    }

    if (props.disabled) {
      cursor = "default";

      hoverBackgroundColor = theme.palette.neutral[200];
      backgroundColor = theme.palette.neutral[200];
      activeBackgroundColor = theme.palette.neutral[200];
      fontColor = theme.palette.neutral[400];
      border = "border: none";

      if (variantResult === "outlined") {
        backgroundColor = "transparent";
        fontColor = theme.palette.neutral[400];
        hoverBackgroundColor = "transparent";
        activeBackgroundColor = "transparent";
        borderFocus = "border: none;";
        border = `border: 1px solid ${theme.palette.neutral[200]}`;
      }
      if (variantResult === "text" || variantResult === "transparent") {
        backgroundColor = "transparent";
        fontColor = theme.palette.neutral[400];
        hoverBackgroundColor = "transparent";
        activeBackgroundColor = "transparent";
        borderFocus = "border: none;";
        border = `border: none`;
      }
    }

    return (
      <StyledComponent
        {...props}
        ref={ref}
        className={mergeStrings("dgaui dgaui_button", props.className)}
        $customStyle={{
          direction: theme.direction,
          minWidth: sizes[sizeResult].w,
          height: sizes[sizeResult].h,
          padding: sizes[sizeResult].p,
          fontSize: sizes[sizeResult].f,
          fontColor,
          fontColorHovered,
          fontColorActive,
          backgroundColor: backgroundColor,
          border,
          borderFocus,
          hoverBackgroundColor: hoverBackgroundColor,
          activeBackgroundColor: activeBackgroundColor,
          cursor,
          focusedBorderColor: theme.textColor,
        }}
      >
        {children}
      </StyledComponent>
    );
  }
);

const StyledComponent = styled.button<{
  $customStyle: {
    direction: string;
    minWidth: number;
    height: number;
    padding: number;
    fontSize: number;
    fontColor: string;
    fontColorHovered: string;
    fontColorActive: string;
    backgroundColor: string;
    border: string;
    borderFocus: string;
    hoverBackgroundColor: string;
    activeBackgroundColor: string;
    cursor: string;
    focusedBorderColor: string;
  };
}>`
  direction: ${(props) => props.$customStyle.direction};
  min-width: ${(props) => props.$customStyle.minWidth}px;
  height: ${(props) => props.$customStyle.height}px;
  padding: ${(props) => props.$customStyle.padding}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  ${(props) => props.$customStyle.border};
  outline: none;
  border-radius: 4px;
  cursor: ${(props) => props.$customStyle.cursor};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${(props) => props.$customStyle.hoverBackgroundColor};
    ${(props) => props.$customStyle.fontColorHovered}
  }
  &:active {
    background-color: ${(props) => props.$customStyle.activeBackgroundColor};
    outline: none;
    ${(props) => props.$customStyle.fontColorActive}
  }
  &:focus {
    position: relative;
    ${(props) => props.$customStyle.borderFocus}
    border-radius: 2px;
    outline: 2px solid ${(props) => props.$customStyle.focusedBorderColor};

    &:after {
      content: "";
      display: block;
      background-color: transparent;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      border-radius: 4px;
    }
  }
`;

export default Button;
