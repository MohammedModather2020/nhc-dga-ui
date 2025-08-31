import React from "react";
import { mergeStrings } from "../../lib/helpers";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { COLORS } from "../../lib/constants";

interface DGA_ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  size?: Size;
  style?: "primary" | "neutral";
  rounded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onColor?: boolean;
  children?: React.ReactNode;
  leadIcon?: React.ReactNode;
  trailIcon?: React.ReactNode;
}

const Chip: React.FC<DGA_ChipProps> = ({
  size = "large",
  style = "primary",
  rounded = true,
  onColor = false,
  selected = false,
  disabled = false,
  children,
  leadIcon,
  trailIcon,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $size={size}
      $theme={theme}
      $rounded={rounded}
      $selected={selected}
      className={mergeStrings(
        "dgaui dgaui_chip" +
          (style === "neutral" ? " neutral" : "") +
          (disabled ? " disabled" : "") +
          (onColor ? " onColor" : ""),
        props.className
      )}
      tabIndex={0}
      {...props}
    >
      {leadIcon && <div className="leadIcon">{leadIcon}</div>}
      <div>{children}</div>
      {trailIcon && <div className="trailIcon">{trailIcon}</div>}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $size: Size;
  $theme: Theme;
  $rounded: boolean;
  $selected: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  height: ${(p) =>
    p.$size === "large" ? 32 : p.$size === "medium" ? 24 : 20}px;
  padding: ${(p) => (p.$size === "large" ? 4 : 3)}px 12px;
  background-color: ${(p) =>
    p.$selected ? p.$theme.palette.primary[600] : p.$theme.palette.primary[50]};
  color: ${(p) => (p.$selected ? "#fff" : p.$theme.palette.primary[800])};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: ${(p) => (p.$size === "small" ? 600 : 500)};
  font-size: ${(p) => (p.$size === "large" ? 14 : 12)}px;
  border-radius: ${(p) => (p.$rounded ? 9999 : 4)}px;
  position: relative;
  outline: none;
  &:hover {
    background-color: ${(p) => p.$theme.palette.primary[200]};
  }

  &:focus {
    &:after {
      display: block;
      content: "";
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      border: 3px solid #000;
      border-radius: ${(p) => (p.$rounded ? 9999 : 4)}px;
      position: absolute;
      top: -4px;
      left: -4px;
      z-index: 1;
    }
  }
  &:active {
    background-color: ${(p) => p.$theme.palette.primary[400]};
    color: ${(p) => p.$theme.palette.primary[900]};
    &:after {
      display: none;
    }
  }

  .leadIcon {
    margin-inline-end: 4px;
  }
  .trailIcon {
    margin-inline-start: 4px;
  }

  &.neutral {
    background-color: ${(p) =>
      p.$selected
        ? p.$theme.palette.neutral[700]
        : p.$theme.palette.neutral[100]};

    &:hover {
      background-color: ${(p) => p.$theme.palette.neutral[200]};
    }
    &:active {
      background-color: ${(p) => p.$theme.palette.neutral[300]};
    }
  }

  &.disabled {
    background-color: ${(p) => p.$theme.palette.neutral[200]};
    color: ${(p) => p.$theme.palette.neutral[400]};
    pointer-events: none;
  }

  &.onColor {
    background-color: ${(p) => (p.$selected ? COLORS.white70 : COLORS.white)};
    color: ${(p) => p.$theme.textColor};

    &:hover {
      background-color: ${COLORS.white80};
    }
    &:active {
      background-color: ${COLORS.white60};
    }

    &.disabled {
      background-color: ${COLORS.white20};
      color: ${COLORS.white40};
    }
  }
`;

export default Chip;
