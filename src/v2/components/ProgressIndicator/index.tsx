import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";
import Base from "./Base";

export interface DGA_ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    title: React.ReactNode;
    description?: React.ReactNode;
  }[];
  activeStepIndex: number;
  alignment?: "vertical" | "horizontal";
  dot?: boolean;
  onStepClick?: (stepIndex: number) => void;
}

const ProgressIndicator: React.FC<DGA_ProgressIndicatorProps> = ({
  children,
  alignment,
  steps,
  activeStepIndex,
  dot,
  onStepClick,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      {...props}
      className={mergeStrings("dgaui dgaui_progressIndicator", props.className)}
      $theme={theme}
      $alignment={alignment || "horizontal"}
      $dot={dot}
    >
      {steps.map((el, index) => {
        const status =
          index < activeStepIndex
            ? "completed"
            : index === activeStepIndex
            ? "active"
            : "upComing";

        return (
          <div
            key={index}
            className={"step " + status}
            onClick={() => onStepClick?.(index)}
          >
            <Base dot={dot} status={status}>
              {!dot ? index + 1 : undefined}
            </Base>

            <div className="stepContent">
              <div className="title">{el.title}</div>
              <div className="description">{el.description}</div>
            </div>
          </div>
        );
      })}
    </StyledComponent>
  );
};

const getLineCss = (
  theme: Theme,
  status: "completed" | "active" | "upComing"
) => {
  switch (status) {
    case "completed": {
      return {
        bg: theme.palette.primary[600],
        bgHover: theme.palette.primary[700],
      };
    }
    case "active": {
      return {
        bg: theme.palette.neutral[300],
        bgHover: theme.palette.neutral[300],
      };
    }
    case "upComing": {
      return {
        bg: theme.palette.neutral[300],
        bgHover: theme.palette.neutral[400],
      };
    }
  }
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $alignment?: "vertical" | "horizontal";
  $dot?: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  display: flex;
  flex-direction: ${(p) => (p.$alignment === "horizontal" ? "row" : "column")};
  width: 100%;

  .step {
    min-width: 100px;
    min-height: 100px;
    width: 100%;
    position: relative;
    cursor: pointer;
    display: ${(p) => (p.$alignment === "horizontal" ? "block" : "flex")};

    .stepContent {
      margin-top: ${(p) => (p.$alignment === "horizontal" ? "8px" : "0")};
      margin-inline-start: ${(p) =>
        p.$alignment === "horizontal" ? "0" : "8px"};
      padding-inline-end: 16px;

      .title {
        font-size: 16px;
      }
      .description {
        margin-top: 4px;
      }
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: ${(p) => (p.$dot ? "8px" : "16px")};
      inset-inline-start: ${(p) => (p.$dot ? "8px" : "16px")};
      width: ${(p) => (p.$alignment === "horizontal" ? "100%" : "2px")};
      height: ${(p) => (p.$alignment === "horizontal" ? "2px" : "100%")};
    }

    &.completed {
      &:hover {
        &::after {
          background-color: ${(p) => getLineCss(p.$theme, "completed").bgHover};
        }
      }
      &::after {
        background-color: ${(p) => getLineCss(p.$theme, "completed").bg};
      }
    }

    &.active::after {
      background-color: ${(p) => getLineCss(p.$theme, "active").bg};
    }

    &.upComing {
      &:hover {
        &::after {
          background-color: ${(p) => getLineCss(p.$theme, "upComing").bgHover};
        }
      }
      &::after {
        background-color: ${(p) => getLineCss(p.$theme, "upComing").bg};
      }
    }

    &:last-child::after {
      display: none;
    }
  }
`;

export default ProgressIndicator;
