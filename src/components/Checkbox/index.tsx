import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { generateUniqueId, mergeStrings } from "../../lib/helpers";
import checkboxColors from "./checkboxColors";
import feedbackIcon from "../../assets/images/Feedback-Icon.png";
import Icon from "./Icon";

export const sizes = {
  small: { w: 14, h: 14, svgW: 9, svgH: 9, svgLeft: 2.5, svgTop: 3 },
  medium: { w: 18, h: 18, svgW: 12, svgH: 12, svgLeft: 3, svgTop: 4 },
  large: { w: 22, h: 22, svgW: 14, svgH: 14, svgLeft: 4, svgTop: 5 },
};

export interface DGA_CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size"
  > {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  color?: ColorName;
  onChange?: (e: React.SyntheticEvent, value: boolean) => void;
  value?: any;
  size?: Size;
}

const Checkbox: React.FC<DGA_CheckboxProps> = ({
  label,
  description,
  color,
  error,
  onChange,
  value,
  size,
  ...props
}) => {
  const theme = useTheme();
  const colors = checkboxColors(theme);

  const colorNameResult: ColorName = color ?? "primary";
  const sizeResult: Size = size ?? "large";

  let fontColor = theme.textColor;
  let backgroundColor = colors[colorNameResult].default;
  let backgroundColorHovered = colors[colorNameResult].hovered;
  let backgroundColorActive = colors[colorNameResult].active;

  const id = generateUniqueId();

  return (
    <StyledComponent
      $customStyle={{
        theme,
        fontColor,
        backgroundColor,
        backgroundColorHovered,
        backgroundColorActive,
        width: sizes[sizeResult].w,
        height: sizes[sizeResult].h,
        svgW: sizes[sizeResult].svgW,
        svgH: sizes[sizeResult].svgW,
        svgLeft: sizes[sizeResult].svgLeft,
        svgTop: sizes[sizeResult].svgTop,
      }}
      className={mergeStrings("dgaui dgaui_checkboxContainer", props.className)}
    >
      <div className="dgaui_checkboxHead">
        <label className="dgaui_checkbox">
          <input
            id={id}
            type="checkbox"
            {...props}
            checked={value}
            onChange={(e) => {
              onChange && onChange(e, e.target.checked);
            }}
          />
          <Icon />
        </label>
        {label && (
          <label htmlFor={props.id || id} className="dgaui_checkboxLabel">
            {label}
          </label>
        )}
      </div>
      {(description || error) && (
        <div className="dgaui_checkboxDescription">
          {description && (
            <div className="dgaui_checkboxDescriptionText">{description}</div>
          )}
          {error && (
            <div className="dgaui_checkboxDescriptionError">{error}</div>
          )}
        </div>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $customStyle: {
    theme: Theme;
    fontColor: string;
    backgroundColor: string;
    backgroundColorHovered: string;
    backgroundColorActive: string;
    width: number;
    height: number;
    svgW: number;
    svgH: number;
    svgLeft: number;
    svgTop: number;
  };
}>`
  direction: ${(props) => props.$customStyle.theme.direction};
  color: ${(props) => props.$customStyle.fontColor};

  .dgaui_checkbox svg {
    position: absolute;
    width: ${(props) => props.$customStyle.svgW}px;
    height: ${(props) => props.$customStyle.svgH}px;
    left: ${(props) => props.$customStyle.svgLeft}px;
    top: ${(props) => props.$customStyle.svgTop}px;

    .checkmark {
      fill: transparent;
    }
  }

  .dgaui_checkboxLabel {
    cursor: pointer;
    text-align: start;
    margin-inline-start: 16px;
    font-weight: 500;
  }

  .dgaui_checkboxDescription {
    padding-inline-start: 40px;
    .dgaui_checkboxDescriptionText {
      margin-top: 8px;
    }
    .dgaui_checkboxDescriptionError {
      font-weight: 500;
      color: ${(props) => props.$customStyle.theme.palette.error[700]};
      position: relative;
      margin-top: 8px;

      &::before {
        content: "";
        background: url("${feedbackIcon}");
        width: 18px;
        height: 18px;
        background-repeat: no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        inset-inline-start: -40px;
      }
    }
  }

  .dgaui_checkboxHead {
    display: flex;
    align-items: flex-start;
    /* justify-content: center; */

    &:hover {
      .dgaui_checkbox {
        &::after {
          content: "";
          border-radius: 50%;
          background: #f3f4f6;
          width: ${(props) => props.$customStyle.width + 18}px;
          height: ${(props) => props.$customStyle.height + 18}px;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      &:has(input:checked) {
        .dgaui_checkbox {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorHovered};
        }
      }
    }

    &:active {
      .dgaui_checkbox {
        background-color: #d2d6db;
      }

      &:has(input:checked) {
        .dgaui_checkbox {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorActive};
        }
      }

      &:has(input:disabled) {
        .dgaui_checkbox {
          background-color: transparent;
        }
      }
    }

    &:focus-within {
      .dgaui_checkbox {
        &::before {
          content: "";
          display: block;
          width: ${(props) => props.$customStyle.width + 6}px;
          height: ${(props) => props.$customStyle.height + 6}px;
          border: 2px solid #000;
          position: absolute;
          left: -5px;
          top: -5px;
          border-radius: 2px;
        }
      }
    }

    &:has(input:checked) {
      .dgaui_checkbox {
        background-color: ${(props) => props.$customStyle.backgroundColor};

        svg .checkmark {
          fill: #fff;
        }
      }
    }

    &:has(input:disabled) {
      .dgaui_checkbox {
        &:hover {
          background-color: transparent;
        }

        &::after {
          display: none;
        }
      }
    }
    &:has(input:disabled:checked) {
      .dgaui_checkbox {
        background-color: #9da4ae;
      }
    }
  }

  .dgaui_checkbox {
    background-color: transparent;
    cursor: pointer;
    position: relative;
    display: inline-block;
    min-width: ${(props) => props.$customStyle.width}px;
    height: ${(props) => props.$customStyle.height}px;
    outline: none;
    border: 1px solid #6c737f;
    border-radius: 2px;
    transition: all 0.1s;

    &::after {
      content: "";
      border-radius: 50%;
      background: #f3f4f6;
      width: 0;
      height: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: all 0.2s;
      z-index: -1;
    }

    input {
      flex: 0;
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`;

export default Checkbox;
