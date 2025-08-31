import React from "react";
import { mergeStrings } from "../../lib/helpers";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { COLORS } from "../../lib/constants";

interface DGA_FloatingButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "style"> {
  style?: "Primary-Neutral" | "Primary-Brand" | "Secondary-Solid";
  iconOnly?: boolean;
  size?: "small" | "large";
  selected?: boolean;
  onColor?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  leadIcon?: React.ReactNode;
}

const FloatingButton: React.FC<DGA_FloatingButtonProps> = ({
  size = "large",
  style = "Primary-Neutral",
  onColor = false,
  selected = false,
  disabled = false,
  iconOnly = false,
  children,
  leadIcon,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $size={size}
      $theme={theme}
      $iconOnly={iconOnly}
      $selected={selected}
      className={mergeStrings(
        "dgaui dgaui_floatingButton" +
          (style === "Primary-Brand" ? " primaryBrand" : "") +
          (style === "Secondary-Solid" ? " secondarySolid" : "") +
          (disabled ? " disabled" : "") +
          (onColor ? " onColor" : ""),
        props.className
      )}
      {...props}
    >
      {leadIcon && <div className="leadIcon">{leadIcon}</div>}
      {children && !iconOnly && <div>{children}</div>}
    </StyledComponent>
  );
};

const StyledComponent = styled.button<{
  $size: "small" | "large";
  $theme: Theme;
  $selected: boolean;
  $iconOnly: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  height: ${(p) => (p.$size === "large" ? 64 : 56)}px;
  width: ${(p) =>
    p.$iconOnly ? (p.$size === "large" ? "64px" : "56px") : "initial"};
  padding: ${(p) => (p.$size === "large" ? 20 : 16)}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: ${(p) => (p.$size === "large" ? 14 : 12)}px;
  border-radius: 9999px;
  position: relative;
  outline: none;
  border: none;
  justify-content: ${(p) => (p.$iconOnly ? "center" : "flex-start")};
  background-color: ${(p) =>
    p.$selected
      ? p.$theme.palette.neutral[700]
      : p.$theme.palette.neutral[950]};
  color: ${COLORS.white};

  &:hover {
    background-color: ${(p) => p.$theme.palette.neutral[800]};
  }

  &:focus {
    &:after {
      display: block;
      content: "";
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border: 3px solid #000;
      border-radius: 9999px;
      position: absolute;
      top: -5px;
      left: -5px;
      z-index: 1;
    }
  }

  &:active {
    background-color: ${(p) => p.$theme.palette.neutral[600]};

    &:after {
      display: none;
    }
  }

  .leadIcon {
    margin-inline-end: ${(p) => (p.$iconOnly ? "initial" : "12px")};
  }

  &.primaryBrand {
    background-color: ${(p) =>
      p.$selected
        ? p.$theme.palette.primary[500]
        : p.$theme.palette.primary[600]};

    &:hover {
      background-color: ${(p) => p.$theme.palette.primary[700]};
    }
    &:active {
      background-color: ${(p) => p.$theme.palette.primary[900]};
    }
  }

  &.secondarySolid {
    color: ${(p) => p.$theme.textColor};
    background-color: ${(p) =>
      p.$selected
        ? p.$theme.palette.neutral[200]
        : p.$theme.palette.neutral[100]};

    &:hover {
      background-color: ${(p) => p.$theme.palette.neutral[200]};
    }
    &:active {
      background-color: ${(p) => p.$theme.palette.neutral[200]};
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

    &:focus {
      &:after {
        border-color: #fff;
      }
    }

    &.primaryBrand {
      color: ${COLORS.white};
      background-color: ${(p) =>
        p.$selected
          ? p.$theme.palette.primary[700]
          : p.$theme.palette.primary[600]};

      &:hover {
        background-color: ${(p) => p.$theme.palette.primary[700]};
      }
      &:active {
        background-color: ${(p) => p.$theme.palette.primary[900]};
      }
    }

    &.secondarySolid {
      color: ${COLORS.white};
      background-color: ${(p) =>
        p.$selected ? COLORS.white30 : COLORS.white20};

      &:hover {
        background-color: ${COLORS.white20};
      }
      &:focus {
        background-color: transparent;
      }
      &:active {
        background-color: ${COLORS.white40};
      }
    }

    &.disabled {
      background-color: ${COLORS.white20};
      color: ${COLORS.white40};
    }
  }
`;

export default FloatingButton;
