import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { generateUniqueId, mergeStrings } from "../../../lib/helpers";
import switchColors from "./switchColors";
import feedbackIcon from "../../../assets/images/Feedback-Icon.png";

interface DGA_SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "checked" | "onChange"
  > {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  alertMessage?: React.ReactNode;
  color?: ColorName;
  checked?: boolean;
  trailSwitch?: boolean;
  icon?: React.ReactNode;
  onChange?: (event: React.SyntheticEvent, isChecked: boolean) => void;
}

const Switch: React.FC<DGA_SwitchProps> = ({
  label,
  helperText,
  color,
  alertMessage,
  checked,
  trailSwitch,
  icon,
  onChange,
  ...props
}) => {
  const theme = useTheme();
  const colors = switchColors(theme);

  const colorNameResult: ColorName = color ?? "primary";

  let fontColor = theme.textColor;
  let backgroundColor = colors[colorNameResult].default;
  let backgroundColorHovered = colors[colorNameResult].hovered;
  let backgroundColorActive = colors[colorNameResult].active;
  let sliderBg = theme.palette.neutral[950];
  let sliderBgHovered = theme.palette.neutral[600];
  let sliderBgActive = theme.palette.neutral[500];
  let sliderBgDisabled = theme.palette.neutral[300];

  const id = props.id || generateUniqueId();

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
      className={mergeStrings(
        "dgaui dgaui_switchContainer " + (trailSwitch ? "endSwitch" : ""),
        props.className
      )}
    >
      <div className="dgaui_switchHead">
        <label className="dgaui_switch">
          <input
            id={id}
            type="checkbox"
            {...props}
            checked={checked}
            onChange={(e) => onChange && onChange(e, e.target.checked)}
          />
          <span className="dgaui_switchSlider">
            {icon && <span className="icon">{icon}</span>}
          </span>
        </label>
        <label htmlFor={id} className="dgaui_switchLabel">
          {label}
        </label>
      </div>
      <div className="dgaui_switchDescription">
        {helperText && (
          <div className="dgaui_switchDescriptionText">{helperText}</div>
        )}
        {alertMessage && <div className="dgaui_switchDescriptionError">{alertMessage}</div>}
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

  .dgaui_switchLabel {
    cursor: pointer;
    text-align: start;
    margin-inline-start: 8px;
    font-weight: 500;
  }

  .dgaui_switchDescription {
    padding-inline-start: 64px;
    .dgaui_switchDescriptionText {
      margin: 4px 0;
    }
    .dgaui_switchDescriptionError {
      font-weight: 500;
      color: ${(props) => props.$customStyle.theme.palette.error[700]};
      position: relative;
      margin: 4px 0;

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

  &.endSwitch {
    .dgaui_switchLabel {
      margin-inline-start: 0px;
      margin-inline-end: 8px;
    }

    .dgaui_switchHead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row-reverse;
    }
    .dgaui_switchDescription {
      padding-inline-start: 0px;

      .dgaui_switchDescriptionText {
      }
      .dgaui_switchDescriptionError {
        display: flex;
        align-items: center;

        &::before {
          position: initial;
          margin-inline-end: 8px;
        }
      }
    }
  }

  .dgaui_switch {
    cursor: pointer;

    &:hover {
      border-radius: 24px;
      border: 4px solid #f3f4f6;

      .dgaui_switchSlider {
        border: 1px solid #4d5761;

        &::before {
          background-color: ${(props) => props.$customStyle.sliderBgHovered};
        }
      }
    }

    &:active {
      .dgaui_switchSlider {
        &::before {
          background-color: ${(props) => props.$customStyle.sliderBgActive};
        }
      }
    }

    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    outline: none;
    border: 4px solid transparent;

    &:focus-within {
      border: 4px solid #fff;
      z-index: 1;

      &::after {
        content: " ";
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 2px solid #0d121c;
        border-radius: 2px;
      }
    }

    .dgaui_switchSlider {
      border: 1px solid #0d121c;
      border-radius: 24px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: left;

      &::before {
        background-color: ${(props) => props.$customStyle.sliderBg};
        content: "";
        height: 16px;
        width: 16px;
        transition: 0.2s;
        border-radius: 50%;
        margin-left: 4px;
      }
    }

    input {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .dgaui_switchSlider {
        border: none;
        background-color: ${(props) => props.$customStyle.backgroundColor};

        &:before {
          background-color: #fff;
          transform: translateX(24px);
        }

        &:hover {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorHovered};
        }
        &:active {
          background-color: ${(props) =>
            props.$customStyle.backgroundColorActive};
        }
      }

      &:disabled + .dgaui_switchSlider {
        background-color: #fff;
        &:before {
          background-color: #d2d6db;
        }
      }
      &:disabled:checked + .dgaui_switchSlider {
        background-color: #d2d6db;
        &:before {
          background-color: #fff;
        }
      }
    }
    .icon {
      display: none;
    }
    &:has(input:checked) {
      .icon {
        position: absolute;
        z-index: 2;
        inset-inline-end: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    &:has(input:disabled:hover) {
      border: 4px solid transparent;
    }
  }
`;

export default Switch;
