import React from "react";
import colors, { LinkColor } from "./colors";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";

interface DGA_LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "medium" | "small";
  color?: AllColorsNames;
  inline?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const sizes = {
  medium: { f: 16, lh: 24 },
  small: { f: 14, lh: 20 },
};

const Link: React.FC<DGA_LinkProps> = ({
  children,
  color,
  size,
  inline,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const colorNameResult: AllColorsNames = color ?? "primary";
  const sizeResult: Size = size ?? "medium";
  const focusBorderColor =
    colorNameResult === "onColor" ? "#FFF" : theme.textColor;
  const selectedColors = colors(theme)[colorNameResult];

  return (
    <StyledComponent
      $theme={theme}
      $fontSize={sizes[sizeResult].f}
      $lineHeight={sizes[sizeResult].lh}
      $focusBorderColor={focusBorderColor}
      $colors={selectedColors}
      $inline={inline}
      $disabled={disabled}
      {...props}
      href={!disabled ? props.href : ""}
      className={mergeStrings("dgaui dgaui_link", props.className)}
    >
      {children}
    </StyledComponent>
  );
};

const StyledComponent = styled.a<{
  $theme: Theme;
  $fontSize: number;
  $lineHeight: number;
  $focusBorderColor: string;
  $colors: LinkColor;
  $inline?: boolean;
  $disabled?: boolean;
}>`
  font-size: ${(p) => p.$fontSize}px;
  line-height: ${(p) => p.$lineHeight}px;
  color: ${(p) => (p.$disabled ? p.$colors.disabled : p.$colors.default)};
  text-decoration: ${(p) => (p.$inline ? "underline" : "none")};
  text-underline-offset: 2px;
  transition: color 0.2s;
  cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
  ${(p) => (p.$disabled ? "pointer-events: none;" : "")}
  outline: none;
  box-sizing: border-box;

  &:visited {
    color: ${(p) => (p.$disabled ? p.$colors.disabled : p.$colors.visited)};
  }
  &:focus {
    color: ${(p) => (p.$disabled ? p.$colors.disabled : p.$colors.default)};
    border: 2px solid
      ${(p) => (p.$disabled ? "transparnet" : p.$theme.textColor)};
  }
  &:active {
    color: ${(p) => (p.$disabled ? p.$colors.disabled : p.$colors.active)};
  }
  &:hover {
    color: ${(p) => (p.$disabled ? p.$colors.disabled : p.$colors.hovered)};
  }
`;

export default Link;
