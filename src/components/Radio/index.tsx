import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import radioColors from "./radioColors";
import feedbackIcon from "../../assets/images/Feedback-Icon.png";

export interface DGA_RadioProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "style"
  > {
  label: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  style?: "primary" | "neutral";
  onChange?: (e: React.SyntheticEvent, value: any) => void;
  value?: any;
  groupValue?: any;
}

const Radio: React.FC<DGA_RadioProps> = ({
  label,
  description,
  error,
  onChange,
  value,
  groupValue,
  style = "primary",
  ...props
}) => {
  const theme = useTheme();
  const colors = radioColors(theme);

  const colorNameResult: "primary" | "neutral" = style ?? "primary";

  let fontColor = theme.textColor;
  let backgroundColor = colors[colorNameResult].default;
  let backgroundColorHovered = colors[colorNameResult].hovered;
  let backgroundColorActive = colors[colorNameResult].active;
  let sliderBg = theme.palette.neutral[950];
  let sliderBgHovered = theme.palette.neutral[600];
  let sliderBgActive = theme.palette.neutral[500];
  let sliderBgDisabled = theme.palette.neutral[300];

  const id = props.id;

  return (
    <StyledComponent
      $customStyle={{
        theme,
        fontColor,
        backgroundColor,
        backgroundColorHovered,
        backgroundColorActive,
        sliderBg,
        sliderBgHovered,
        sliderBgActive,
        sliderBgDisabled,
      }}
      className={mergeStrings("dgaui dgaui_radioContainer", props.className)}
    >
      <div className="dgaui_radioHead">
        <label className="dgaui_radio">
          <input
            id={id}
            type="radio"
            {...props}
            checked={groupValue === value}
            onChange={(e) => onChange && onChange(e, value)}
          />
          <span className="dgaui_radioDot" />
        </label>
        <label htmlFor={id} className="dgaui_radioLabel">
          {label}
        </label>
      </div>

      <div className="dgaui_radioDescription">
        {description && (
          <div className="dgaui_radioDescriptionText">{description}</div>
        )}
        {error && <div className="dgaui_radioDescriptionError">{error}</div>}
      </div>
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
    sliderBg: string;
    sliderBgHovered: string;
    sliderBgActive: string;
    sliderBgDisabled: string;
  };
}>`
  direction: ${(props) => props.$customStyle.theme.direction};
  color: ${(props) => props.$customStyle.fontColor};

  .dgaui_radioLabel {
    cursor: pointer;
    text-align: start;
    margin-inline-start: 16px;
    font-weight: 500;
  }

  .dgaui_radioDescription {
    padding-inline-start: 40px;
    .dgaui_radioDescriptionText {
      margin-top: 8px;
      color: ${(props) => props.$customStyle.theme.palette.neutral[700]};
    }
    .dgaui_radioDescriptionError {
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

  .dgaui_radioHead {
    display: flex;
    align-items: center;

    &:hover {
      .dgaui_radio {
        box-shadow: 0 0 0px 12px #f3f4f6;
        background-color: #f3f4f6;
      }
      &:has(input:checked) {
        .dgaui_radioDot {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorActive};
        }
      }
    }

    &:active {
      .dgaui_radio {
        background-color: #d2d6db;
      }
      &:has(input:checked) {
        &:active {
          .dgaui_radioDot {
            background-color: ${(props) =>
              props.$customStyle.backgroundColorActive};
          }
        }
      }
    }

    &:has(input:disabled) {
      color: #9da4ae;

      &:hover {
        .dgaui_radio {
          box-shadow: none;
          background-color: transparent;
        }
      }
      &:has(input:checked) {
        &:active {
          .dgaui_radioDot {
            background: #9da4ae;
          }
        }
      }
    }

    &:focus-within {
      .dgaui_radio {
        box-shadow: none;
        z-index: 1;

        &::after {
          content: " ";
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #0d121c;
        }
      }
    }
  }

  .dgaui_radio {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    outline: none;
    border: 1px solid #000;
    border-radius: 50px;
    transition: all 0.1s;

    .dgaui_radioDot {
      border-radius: 50px;
      position: absolute;
      top: 3.5px;
      left: 3.5px;
      z-index: 1;
      width: 15px;
      height: 15px;
      background-color: none;
    }

    input {
      flex: 0;
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .dgaui_radioDot {
        background-color: ${(props) => props.$customStyle.backgroundColor};
      }
      &:checked:disabled + .dgaui_radioDot {
        background-color: #9da4ae;
      }
    }

    &:has(input:checked) {
      &:hover {
        background-color: #f3f4f6;
        .dgaui_radioDot {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorHovered};
        }
      }
      &:active {
        background-color: #f3f4f6;
        .dgaui_radioDot {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorActive};
        }
      }
      &:disabled {
        background-color: red;
        &:hover,
        &:active {
          background-color: #9da4ae;
        }
      }
    }

    &:has(input:disabled) {
      border: 1px solid #9da4ae;
      background-color: transparent;
      .dgaui_radioDot {
        background-color: transparent;
      }

      &:hover,
      &:active {
        box-shadow: none;
        background-color: transparent;
        .dgaui_radioDot {
          background-color: transparent;
        }
      }
      &:has(input:checked) {
        .dgaui_radioDot {
          background-color: #9da4ae;
          &:active {
            background-color: #9da4ae;
          }
        }
      }
    }
  }
`;

export default Radio;
