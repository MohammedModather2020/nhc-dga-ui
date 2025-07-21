import React from "react";
import styled, { css } from "styled-components";
import checkWhiteIcon from "../../../assets/images/checkWhite.png";
import useTheme from "../../../lib/useTheme";

type DGA_AIBaseProps = {
  status: "completed" | "active" | "upComing";
  dot?: boolean;
  children?: number;
};

const Base: React.FC<DGA_AIBaseProps> = ({ status, dot, children }) => {
  const theme = useTheme();

  if (dot) {
    return (
      <StyledDot
        $theme={theme}
        $status={status}
        className="dgaui_stepperBase dot"
      />
    );
  }

  return (
    <StyledComponent
      $theme={theme}
      $status={status}
      className="dgaui_stepperBase circle"
    >
      <span className="content">{children}</span>
    </StyledComponent>
  );
};

const getCircleCss = (
  theme: Theme,
  status: "completed" | "active" | "upComing"
) => {
  switch (status) {
    case "completed": {
      return css`
        border: 1px solid #fff;
        background-color: ${theme.palette.primary[600]};
        background-image: url(${checkWhiteIcon});
        background-repeat: no-repeat;
        background-position: center;

        &:hover {
          background-color: ${theme.palette.primary[700]};
        }
        &:focus {
          border: 1px solid #fff;

          &::after {
            content: "";
            display: block;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            border: 2px solid ${theme.textColor};
            position: absolute;
            border-radius: 100%;
          }
        }
        .content {
          display: none;
        }
      `;
    }
    case "active": {
      return css`
        border: 2px solid ${theme.palette.primary[600]};
        background-color: #fff;

        &:hover {
          border-color: ${theme.palette.primary[700]};
        }
        &:focus {
          &::after {
            content: "";
            display: block;
            width: calc(100% + 6px);
            height: calc(100% + 6px);
            border: 2px solid ${theme.textColor};
            position: absolute;
            border-radius: 100%;
          }
        }
      `;
    }
    case "upComing": {
      return css`
        border: 2px solid ${theme.palette.neutral[300]};
        background-color: #fff;
        color: ${theme.palette.neutral[300]};

        &:hover {
          border-color: ${theme.palette.neutral[400]};
          color: ${theme.palette.neutral[400]};
        }
      `;
    }
    default: {
      return "";
    }
  }
};

const getDotCss = (
  theme: Theme,
  status: "completed" | "active" | "upComing"
) => {
  switch (status) {
    case "completed": {
      return css`
        background-color: ${theme.palette.primary[600]};

        &:hover {
          background-color: ${theme.palette.primary[700]};
        }
      `;
    }
    case "active": {
      return css`
        background-color: #fff;
        border: 4px solid ${theme.palette.primary[600]};

        &:hover {
          border-color: ${theme.palette.primary[700]};
        }

        width: 8px;
        height: 8px;
      `;
    }
    case "upComing": {
      return css`
        background-color: #fff;
        border: 2px solid ${theme.palette.neutral[300]};
        &:hover {
          border-color: ${theme.palette.neutral[400]};
        }
        width: 12px;
        height: 12px;
      `;
    }
    default: {
      return "";
    }
  }
};

const StyledComponent = styled.button<{
  $theme: Theme;
  $status: "completed" | "active" | "upComing";
}>`
  border: none;
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  z-index: 1;

  ${(p) => getCircleCss(p.$theme, p.$status)}
`;

const StyledDot = styled.div<{
  $theme: Theme;
  $status: "completed" | "active" | "upComing";
}>`
  border: none;
  outline: none;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  z-index: 1;

  ${(p) => getDotCss(p.$theme, p.$status)}
`;

export default Base;
