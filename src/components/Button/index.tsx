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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children?: React.ReactNode;
  size?: Size;
  style?:
    | "primary"
    | "neutral"
    | "secondary-solid"
    | "secondary-outline"
    | "subtle"
    | "transparent";
  buttonStyle?: React.CSSProperties;
  destructive?: boolean;
  iconOnly?: boolean;
  onColor?: boolean;
  leadIcon?: React.ReactNode;
  trailIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, DGA_ButtonProps>(
  (
    {
      children,
      size = "large",
      style = "primary",
      buttonStyle,
      destructive,
      iconOnly,
      onColor,
      leadIcon,
      trailIcon,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const buttonColors = getButtonColors(theme, onColor, destructive);
    const backgroundColor = buttonColors[style].backgroundColor;
    const fontColor = buttonColors[style].fontColor;
    const borderColor = buttonColors[style].borderColor;
    const innerBorderColor = buttonColors[style].innerBorderColor;

    return (
      <StyledComponent
        {...props}
        ref={ref}
        className={mergeStrings("dgaui dgaui_button", props.className)}
        $disabled={props.disabled}
        $customStyle={{
          theme,
          minWidth: iconOnly ? 0 : sizes[size].w,
          height: sizes[size].h,
          padding: sizes[size].p,
          fontSize: sizes[size].f,
          fontColor,
          backgroundColor,
          borderColor,
          innerBorderColor,
        }}
      >
        {iconOnly && <div className="iconOnly">{leadIcon || children}</div>}
        {!iconOnly && (
          <>
            <div className="leadIcon">{leadIcon}</div>
            {children}
            <div className="trailIcon">{trailIcon}</div>
          </>
        )}
      </StyledComponent>
    );
  }
);

const StyledComponent = styled.button<{
  $disabled?: boolean;
  $customStyle: {
    theme: Theme;
    minWidth: number;
    height: number;
    padding: number;
    fontSize: number;
    fontColor: SelectorsObject;
    backgroundColor: SelectorsObject;
    borderColor?: SelectorsObject;
    innerBorderColor?: SelectorsObject;
  };
}>`
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  direction: ${(props) => props.$customStyle.theme.direction};
  min-width: ${(props) => props.$customStyle.minWidth}px;
  height: ${(props) => props.$customStyle.height}px;
  padding: ${(props) => props.$customStyle.padding}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor.default};
  background-color: ${(props) => props.$customStyle.backgroundColor.default};
  border: none;
  ${(props) =>
    props.$customStyle.borderColor &&
    `border: 1px solid ${props.$customStyle.borderColor.default};`};
  transition: background-color 0.1s;

  &:hover {
    border: none;
    background-color: ${(props) => props.$customStyle.backgroundColor.hovered};
    color: ${(props) => props.$customStyle.fontColor.hovered};
    ${(props) =>
      props.$customStyle.borderColor &&
      `border: 1px solid ${props.$customStyle.borderColor.hovered};`};
  }

  &:focus {
    position: relative;
    border-radius: 4px;
    ${(props) =>
      props.$customStyle.borderColor?.focus &&
      `border: 2px solid ${props.$customStyle.borderColor.focus};`};

    &:after {
      content: "";
      display: block;
      background-color: transparent;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      border-radius: 2px;
      box-sizing: border-box;
      ${(props) =>
        props.$customStyle.innerBorderColor?.focus &&
        `border: 1px solid ${props.$customStyle.innerBorderColor.focus};`};
    }
  }

  &:active {
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: ${(props) => props.$customStyle.backgroundColor.active};
    color: ${(props) => props.$customStyle.fontColor.active};
    ${(props) =>
      props.$customStyle.borderColor?.active &&
      `border: 1px solid ${props.$customStyle.borderColor.active};`};
    &:after {
      display: none;
    }
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    background-color: ${(props) => props.$customStyle.backgroundColor.disabled};
    color: ${(props) => props.$customStyle.fontColor.disabled};
  }
  box-sizing: border-box;

  .leadIcon {
    margin-inline-end: 4px;
  }
  .trailIcon {
    margin-inline-start: 4px;
  }
`;

export default Button;
