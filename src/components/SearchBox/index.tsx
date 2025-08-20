import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import TextInput from "../TextInput";
import searchByVoiceIcon from "../../assets/images/searchByVoice.png";

const sizes = {
  medium: { w: 320, h: 32, p: 8, f: 14, prefixW: 72 },
  large: { w: 320, h: 40, p: 8, f: 16, prefixW: 61 },
};

type Style = "default" | "filledDarker" | "filledLighter";

export interface DGA_SeachBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "style"> {
  label?: React.ReactNode;
  size?: "large" | "medium";
  style?: Style;
  icon?: React.ReactNode;
  showTrailingIcon?: boolean;
  showLabel?: boolean;
  helperText?: React.ReactNode;
  onSearchByVoiceClicked?: Function;
}

const SearchBox: React.FC<DGA_SeachBoxProps> = ({
  label,
  icon,
  showTrailingIcon = true,
  showLabel = true,
  helperText,
  onSearchByVoiceClicked,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      className={mergeStrings("dgaui dgaui_searchBox", props.className)}
      $showTrailingIcon={showTrailingIcon}
      $showLabel={showLabel && !!label}
      $disabled={props.disabled}
      $theme={theme}
    >
      {showLabel && (
        <label
          style={{ marginBottom: 13, textAlign: "start" }}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <TextInput {...props} icon={icon} />
      {showTrailingIcon && (
        <img
          className="dgaui_searchBox_trailIcon"
          src={searchByVoiceIcon}
          onClick={() => onSearchByVoiceClicked?.()}
        />
      )}
      {helperText && (
        <div className="dgaui dgaui_searchBox_helperText">{helperText}</div>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $showTrailingIcon: boolean;
  $showLabel: boolean;
  $disabled?: boolean;
  $theme: Theme;
}>`
  direction: ${(props) => props.$theme.direction};

  .dgaui_searchBox_trailIcon {
    width: 16px;
    height: auto;
    position: absolute;
    inset-inline-end: 16px;
    top: ${({ $showLabel }) => ($showLabel ? "50px" : "30px")};
    cursor: pointer;
  }

  ${(p) =>
    p.$showTrailingIcon
      ? `
  .dgaui_textInput_input{
    padding-inline-end: 24px;
  }
  `
      : ""}

  .dgaui_searchBox_helperText {
    margin-top: 8px;
    color: ${p => p.$disabled ? p.$theme.palette.neutral[400] : "unset"};
  }
`;

export default SearchBox;
