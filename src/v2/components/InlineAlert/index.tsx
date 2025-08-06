import React from "react";
import colors, { InlineAlertColor } from "./colors";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";

import buttonCloseIcon from "../../../assets/images/x.png";
import useScreenSizes from "../../../lib/hooks/useScreenSizes";

export interface DGA_InlineAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  leadText: React.ReactNode;
  helperText?: string;
  type?: "neutral" | "destructive" | "warning" | "success" | "info";
  closeButton?: boolean;
  actions?: React.ReactNode;
  secondryAction?: React.ReactNode;
  onClose?: Function;
  background?: "white" | "color";
}

const InlineAlert: React.FC<DGA_InlineAlertProps> = ({
  leadText,
  helperText,
  type,
  actions,
  closeButton,
  onClose,
  background,
  secondryAction,
  ...props
}) => {
  const theme = useTheme();
  const screenSizes = useScreenSizes();
  const colorNameResult = type ?? "neutral";
  const colorsResult: InlineAlertColor = colors(theme)[colorNameResult];
  const isColored = background === "color";
  const isMinimal = !helperText && !actions;

  return (
    <StyledComponent
      $theme={theme}
      $colors={colorsResult}
      $isColored={isColored}
      {...props}
      className={mergeStrings(
        "dgaui dgaui_inlineAlert " +
          (screenSizes.isMobile ? " mobile " : "") +
          (isMinimal ? " minimal " : ""),
        props.className
      )}
    >
      <div className="icon" />
      <div className="content">
        <div className="contentText">
          <div className="title">{leadText}</div>
          {helperText && <div className="description">{helperText}</div>}
        </div>
        {(actions || secondryAction) && (
          <div className="actions">
            {actions} {secondryAction}
          </div>
        )}
      </div>
      {closeButton && <div className="close" onClick={() => onClose?.()} />}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $colors: InlineAlertColor;
  $isColored: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  width: 100%;
  display: flex;
  position: relative;
  padding: 16px 24px;
  background-color: ${({ $colors, $isColored }) =>
    $isColored ? $colors.bg : "#fff"};
  border-radius: 8px;
  border: 1px solid
    ${({ $colors, $isColored, $theme }) =>
      $isColored ? $colors.border : $theme.palette.neutral[300]};

  box-sizing: border-box;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 100%;
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    background-color: ${(p) => p.$colors.vLine};
  }

  .icon {
    min-width: 40px;
    height: 40px;
    background-image: url(${(p) => p.$colors.icon});
    background-repeat: no-repeat;
    background-size: contain;
    margin-inline-end: 12px;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .contentText {
      justify-content: center;
      min-height: 40px;
      gap: var(--Text-text-content-gap, 8px);
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      min-height: 40px;
      display: flex;
      align-items: center;
      color: ${({ $colors, $isColored, $theme }) =>
        $isColored ? $colors.font : $theme.palette.neutral[800]};
    }
    .description {
      font-size: 14px;
      color: ${(p) => p.$theme.palette.neutral[700]};
      margin-top: 8px;
    }
    .actions {
      margin-top: 16px;
      gap: 8px;
    }
  }
  .close {
    margin-inline-start: 12px;
    cursor: pointer;
    background-image: url(${buttonCloseIcon});
    background-repeat: no-repeat;
    min-width: 20px;
    height: 20px;
    margin-top: 10px;
    &:hover {
      transform: scale(1.1);
    }
  }

  &.mobile {
    flex-direction: column;

    &::before {
      width: 100%;
      height: 8px;
      position: absolute;
      top: 0;
    }
    .icon {
      margin-bottom: 16px;
    }
    .content {
      .title {
        margin-inline-end: 16px;
      }
      .actionButtons {
        display: flex;
        flex-direction: column;

        button {
          margin-inline-end: 0;
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .close {
      margin-inline-start: 0;
      position: absolute;
      inset-inline-end: 16px;
      top: 16px;
    }
  }

  &.minimal {
    padding: 16px 24px;

    &.mobile {
      padding-top: 14px;
      flex-direction: row;
      align-items: center;

      .icon {
        margin-bottom: 0;
      }
      .close {
        position: initial;
        margin-top: 0;
        margin-inline-start: 16px;
      }
    }
  }
`;

export default InlineAlert;
