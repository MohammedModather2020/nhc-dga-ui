import React from "react";
import { mergeStrings } from "../../lib/helpers";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { COLORS } from "../../lib/constants";

type RadialStepperSize = "40px" | "48px" | "64px" | "80px" | "120px";

const sizes = {
  "40px": {
    borderWidth: 2,
    width: 40,
    circleRadius: 2,
    magicNumber: 118,
    stepNameFontSize: 12,
    descriptionFontSize: 10,
    innerCircleFontSize: 9,
  },
  "48px": {
    borderWidth: 4,
    width: 48,
    circleRadius: 4,
    magicNumber: 136,
    stepNameFontSize: 14,
    descriptionFontSize: 12,
    innerCircleFontSize: 10.5,
  },
  "64px": {
    borderWidth: 5,
    width: 64,
    circleRadius: 5,
    magicNumber: 185,
    stepNameFontSize: 14,
    descriptionFontSize: 12,
    innerCircleFontSize: 14,
  },
  "80px": {
    borderWidth: 8,
    width: 80,
    circleRadius: 8,
    magicNumber: 225,
    stepNameFontSize: 16,
    descriptionFontSize: 14,
    innerCircleFontSize: 16,
  },
  "120px": {
    borderWidth: 10,
    width: 120,
    circleRadius: 10,
    magicNumber: 340,
    stepNameFontSize: 20,
    descriptionFontSize: 14,
    innerCircleFontSize: 24,
  },
};

interface DGA_RadialStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  size?: RadialStepperSize;
  style?: "primary" | "neutral";
  onColor?: boolean;
  stepsCount: number;
  activeStep: number;
  innerCircleText?: React.ReactNode;
  description?: React.ReactNode;
  preStepName?: React.ReactNode;
  stepName?: React.ReactNode;
  nextStepName?: React.ReactNode;
}

const RadialStepper: React.FC<DGA_RadialStepperProps> = ({
  size = "64px",
  style = "primary",
  onColor = false,
  stepsCount,
  activeStep,
  innerCircleText,
  description,
  preStepName,
  stepName,
  nextStepName,
  ...props
}) => {
  const theme = useTheme();

  const circleRadius = sizes[size].circleRadius;

  return (
    <StyledComponent
      $size={size}
      $circleRadius={circleRadius}
      $theme={theme}
      className={mergeStrings(
        "dgaui dgaui_radialStepper" +
          (style === "neutral" ? " neutral" : "") +
          (onColor ? " onColor" : ""),
        props.className
      )}
      {...props}
      $stepsCount={stepsCount}
      $activeStep={activeStep}
    >
      <div className="dgaui dgaui_circle">
        <div className="innerCircleText">{innerCircleText}</div>
        <svg
          className="dgaui_circle-svg"
          width={sizes[size].width}
          height={sizes[size].width}
        >
          <circle
            className="dgaui_circle-path"
            cx={sizes[size].width / 2}
            cy={sizes[size].width / 2}
            r={sizes[size].width / 2 - circleRadius / 2}
            strokeWidth={sizes[size].borderWidth}
          />
        </svg>
      </div>
      <div className="dgaui_content">
        <div className="preStepName">{preStepName}</div>
        <div className="stepName">{stepName}</div>
        <div className="description">{description}</div>
        <div className="nextStepName">{nextStepName}</div>
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $size: RadialStepperSize;
  $circleRadius: number;
  $theme: Theme;
  $stepsCount: number;
  $activeStep: number;
  $innerCircleTextWidth?: number;
}>`
  direction: ${(p) => p.$theme.direction};
  display: flex;
  align-items: center;

  .dgaui_circle {
    position: relative;
    width: ${(p) => p.$size};
    height: ${(p) => p.$size};
    border: ${(p) => sizes[p.$size].borderWidth}px solid
      ${(p) => p.$theme.palette.neutral[200]};
    border-radius: 50%;

    .dgaui_circle-svg {
      border-radius: 50%;
      position: absolute;
      top: -${(p) => p.$circleRadius}px;
      left: -${(p) => p.$circleRadius}px;
      transform: rotate(-90deg); /* Start animation from the top */
    }

    .dgaui_circle-path {
      fill: none;
      stroke: ${(p) => p.$theme.palette.primary[600]};
      stroke-width: ${(p) => sizes[p.$size].borderWidth}px;
      stroke-linecap: round;
      stroke-dasharray: ${(p) => sizes[p.$size].magicNumber};
      stroke-dashoffset: -${(p) => sizes[p.$size].magicNumber - (sizes[p.$size].magicNumber / p.$stepsCount) * p.$activeStep};
      transition: stroke-dashoffset 0.5s;
    }

    .innerCircleText {
      text-align: ${(p) => p.$theme.direction === 'ltr' ? 'left' : 'right'};
      font-weight: 500;
      position: absolute;
      z-index: 1;
      top: 35%;
      justify-self: center;
      font-size: ${(p) => sizes[p.$size].innerCircleFontSize}px;
    }
  }

  .dgaui_content {
    margin-inline-start: 8px;
    padding: 8px;

    .preStepName {
      color: ${(p) => p.$theme.palette.neutral[500]};
      font-size: ${(p) => sizes[p.$size].descriptionFontSize};
    }
    .stepName {
      color: ${(p) => p.$theme.palette.neutral[950]};
      font-size: ${(p) => sizes[p.$size].stepNameFontSize};
      font-weight: 500;
    }
    .description {
      color: ${(p) => p.$theme.palette.neutral[500]};
      font-size: ${(p) => sizes[p.$size].descriptionFontSize};
    }
    .nextStepName {
      color: ${(p) => p.$theme.palette.neutral[500]};
      font-size: ${(p) => sizes[p.$size].descriptionFontSize};
    }
  }

  &.neutral {
    .dgaui_circle {
      .dgaui_circle-path {
        stroke: ${(p) => p.$theme.textColor};
      }
    }
  }

  &.onColor {
    color: ${COLORS.white};
    .dgaui_circle {
      border-color: ${COLORS.white30};
      .dgaui_circle-path {
        stroke: ${COLORS.white};
      }
    }

    .dgaui_content {
      .preStepName {
        color: ${COLORS.white70};
      }
      .stepName {
        color: ${COLORS.white};
      }
      .description {
        color: ${COLORS.white80};
      }
      .nextStepName {
        color: ${COLORS.white70};
      }
    }
  }
`;

export default RadialStepper;
