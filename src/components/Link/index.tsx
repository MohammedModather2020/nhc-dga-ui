import React from "react";
import colors, { LinkColor } from "./colors";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";

interface DGA_LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "style"> {
  size?: "medium" | "small";
  style?: "primary" | "neutral" | "on-color";
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
  style = "primary",
  size = "medium",
  inline,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const focusBorderColor = style === "on-color" ? "#FFF" : theme.textColor;
  const selectedColors = colors(theme)[style];

  return (
    <StyledComponent
      $theme={theme}
      $fontSize={sizes[size].f}
      $lineHeight={sizes[size].lh}
      $focusBorderColor={focusBorderColor}
      $style={selectedColors}
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
  $inline?: boolean;
  $disabled?: boolean;
  $style: LinkColor;
}>`
  font-size: ${(p) => p.$fontSize}px;
  line-height: ${(p) => p.$lineHeight}px;
  color: ${(p) => (p.$disabled ? p.$style.disabled : p.$style.default)};
  text-decoration: ${(p) => (p.$inline ? "underline" : "none")};
  text-underline-offset: 2px;
  transition: color 0.2s;
  cursor: ${(p) => (p.$disabled ? "default" : "pointer")};
  ${(p) => (p.$disabled ? "pointer-events: none;" : "")}
  outline: none;
  box-sizing: border-box;

  &:visited {
    color: ${(p) => (p.$disabled ? p.$style.disabled : p.$style.visited)};
  }
  &:focus {
    color: ${(p) => (p.$disabled ? p.$style.disabled : p.$style.default)};
    border: 2px solid
      ${(p) => (p.$disabled ? "transparent" : p.$theme.textColor)};
  }
  &:active {
    color: ${(p) => (p.$disabled ? p.$style.disabled : p.$style.active)};
  }
  &:hover {
    color: ${(p) => (p.$disabled ? p.$style.disabled : p.$style.hovered)};
  }
`;

export default Link;
