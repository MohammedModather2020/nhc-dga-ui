import React from "react";
import useTheme from "../../lib/useTheme";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";

export interface DGA_ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  size?: Size;
  percentage?: number;
  error?: boolean;
  success?: boolean;
  style?: "primary" | "neutral";
}

const ProgressBar: React.FC<DGA_ProgressBarProps> = ({
  label = "",
  helperText = "",
  size = "medium",
  style = "primary",
  percentage = 0,
  error = false,
  success = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $size={size}
      $theme={theme}
      $percentage={percentage}
      $error={error}
      $success={success}
      $style={style}
      className={mergeStrings(
        "dgaui dgaui_progressBar" + (style === "neutral" ? " neutral " : ""),
        props.className
      )}
      {...props}
    >
      {label && <label>{label}</label>}
      <div className="dgaui indicator" />
      {helperText && <div className="helperText">{helperText}</div>}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $size: Size;
  $percentage: number;
  $error?: boolean;
  $success?: boolean;
  $style?: "primary" | "neutral";
}>`
  direction: ${(p) => p.$theme.direction};
  width: 100%;

  .indicator {
    margin: 8px 0;
    height: ${(p) =>
      p.$size === "large" ? 16 : p.$size === "medium" ? 8 : 4}px;
    background-color: ${(p) => p.$theme.palette.neutral[100]};
    border-radius: ${(p) => (p.$size === "large" ? 8 : 4)}px;
    position: relative;

    &::before {
      position: absolute;
      display: block;
      content: "";
      top: 0;
      inset-inline-start: 0;
      z-index: 1;
      transition: width 0.2s;
      border-radius: ${(p) => (p.$size === "large" ? 8 : 4)}px;
      height: ${(p) =>
        p.$size === "large" ? 16 : p.$size === "medium" ? 8 : 4}px;
      background-color: ${(p) =>
        p.$success
          ? p.$theme.palette.success[600]
          : p.$error
          ? p.$theme.palette.error[600]
          : p.$style === "primary"
          ? p.$theme.palette.primary[600]
          : p.$theme.palette.neutral[700]};
      width: ${(p) => (p.$percentage <= 100 ? p.$percentage : 100)}%;
    }

    &::after {
      position: absolute;
      z-index: 2;
      color: #fff;
      font-size: 12px;
      transition: left 0.2s;
      top: -1px;
      inset-inline-start: calc(
        ${(p) => ((p.$percentage <= 100 ? p.$percentage : 100) + "%")} -
          ${(p) => (p.$percentage < 100 ? 30 : 40)}px
      );
      display: ${(p) =>
        p.$percentage >= 10 && p.$size === "large" ? "block" : "none"};
      content: "${(p) => Math.min(p.$percentage, 100)}%";
    }
  }
  .helperText {
    color: ${(p) =>
      p.$success
        ? p.$theme.palette.success[700]
        : p.$error
        ? p.$theme.palette.error[700]
        : "initial"};
  }
`;

export default ProgressBar;
