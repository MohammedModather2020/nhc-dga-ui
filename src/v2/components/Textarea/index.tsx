import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";

type Style = "default" | "filledDarker" | "filledLighter";

interface DGA_TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "size" | "style"
  > {
  label: React.ReactNode;
  style?: Style;
  error?: boolean;
  scrollBar?: boolean;
  resize?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, DGA_TextareaProps>(
  (
    { label, style, error, scrollBar = false, resize = true, ...props },
    ref
  ) => {
    const theme = useTheme();

    // Default
    let fontColor = theme.textColor;
    let placeholderFontColor = theme.palette.neutral[500];
    let border = `1px solid ${
      error ? theme.palette.error[700] : theme.palette.neutral[400]
    }`;
    let borderHovered = `1px solid ${
      error ? theme.palette.error[700] : theme.palette.neutral[700]
    }`;
    let backgroundColor = "#FFF";
    let animationColor = error ? theme.palette.error[700] : theme.textColor;
    let shadowFocus = theme.elevation.shadows.md;

    if (style === "filledDarker") {
      backgroundColor = theme.palette.neutral[100];
    }

    if (props.disabled) {
      fontColor = theme.palette.neutral[400];
      border = `1px solid ${theme.palette.neutral[200]}`;
      borderHovered = `1px solid ${theme.palette.neutral[200]}`;
    }

    return (
      <div
        style={{
          direction: theme.direction,
          display: "flex",
          flexDirection: "column",
          color: theme.textColor,
          width: "100%",
          overflow: "hidden",
        }}
        className={mergeStrings("dgaui dgaui_textarea", props.className)}
      >
        <label
          style={{ marginBottom: 8, textAlign: "start" }}
          htmlFor={props.id}
        >
          {label}
        </label>
        <StyledComponent
          $customStyle={{
            direction: theme.direction,
            placeholderFontColor,
            fontColor,
            border,
            borderHovered,
            backgroundColor,
            shadowFocus,
            scrollBar,
            resize,
          }}
          {...props}
          ref={ref}
        />
        <StyledComponentSpan
          $bgColor={animationColor}
          className="dgauiInputSeparator"
        />
      </div>
    );
  }
);

const StyledComponent = styled.textarea<{
  $customStyle: {
    direction: string;
    fontColor: string;
    border: string;
    shadowFocus: string;
    placeholderFontColor: string;
    borderHovered: string;
    backgroundColor: string;
    scrollBar?: boolean;
    resize?: boolean;
  };
}>`
  outline: none;
  direction: ${(props) => props.$customStyle.direction};
  border-radius: 4px;
  width: 100%;
  min-height: 96px;
  padding: 12px 16px;
  font-size: 16px;
  color: ${(props) => props.$customStyle.fontColor};
  border: ${(props) => props.$customStyle.border};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  box-sizing: border-box;

  resize: ${(p) => (p.$customStyle.resize ? "both" : "none")};
  overflow-y: ${(p) => (p.$customStyle.scrollBar ? "scroll" : "auto")};

  &::placeholder {
    color: ${(props) => props.$customStyle.placeholderFontColor};
    font-weight: 300;
  }
  &:focus {
    ${(props) => props.$customStyle.shadowFocus};
  }

  &:hover {
    border: ${(props) => props.$customStyle.borderHovered};
  }

  &:focus + .dgauiInputSeparator {
    transform: scaleX(0.995) translateY(-2.5px);
    opacity: 1;
  }
  &:active + .dgauiInputSeparator {
    transform: scaleX(0.5) translateY(-2.5px);
    opacity: 1;
  }
  &:read-only + .dgauiInputSeparator,
  &:disabled + .dgauiInputSeparator {
    transform: scaleX(0) translateY(-2.5px);
    opacity: 0;
  }
`;

const StyledComponentSpan = styled.span<{ $bgColor: string }>`
  height: 2px;
  background: ${(props) => props.$bgColor};
  display: block;
  transform: scaleX(0) translateY(-2.5px);
  transform-origin: 50%;
  opacity: 1;
  transition: all 0.2s;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export default Textarea;
