import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import arrowDownImage from "../../../assets/images/chevron.png";
import { mergeStrings } from "../../../lib/helpers";

export const sizes = {
  small: { h: 40, p: 8, f: 16 },
  medium: { h: 48, p: 12, f: 16 },
  large: { h: 56, p: 16, f: 16 },
};

interface DGA_AccordionProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onChange" | "title"
  > {
  title: React.ReactNode;
  children: React.ReactNode;
  size?: Size;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  defaultExpanded?: boolean;
  iconAlignment?: "leading" | "trailing";
  flush?: boolean;
}

const Accordion: React.FC<DGA_AccordionProps> = ({
  size = "medium",
  title,
  expanded,
  onChange,
  defaultExpanded,
  iconAlignment = "trailing",
  flush = false,
  children,
  ...props
}) => {
  const theme = useTheme();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(defaultExpanded);
  const [contentHeight, setContentHeight] = React.useState(0);

  let borderTop: string | undefined = `solid 1px ${theme.palette.neutral[300]}`;
  let border = `solid 2px transparent`;
  let cursor = "pointer";
  let fontColor = "#161616";

  const showContent = typeof expanded !== "undefined" ? expanded : open;

  if (showContent) {
    // border = `solid 2px #161616`;
  }

  if (props.disabled) {
    cursor = "default";
    borderTop = `solid 1px ${theme.palette.neutral[300]}`;
    border = `none`;
    fontColor = theme.palette.neutral[400];
  }

  const onTitleClickedHandler = (e: React.SyntheticEvent) => {
    onChange && onChange(e, !showContent);
    setOpen(!showContent);
  };

  React.useEffect(() => {
    if (contentRef.current?.clientHeight) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [contentRef.current?.clientHeight]);

  return (
    <div
      className={mergeStrings("dgaui dgaui_accordion", props.className)}
      tabIndex={1}
    >
      <StyledComponentTitle
        $customStyle={{
          direction: theme.direction,
          minHeight: sizes[size].h,
          padding: sizes[size].p,
          fontSize: sizes[size].f,
          fontColor,
          colors: theme.palette.neutral,
          border,
          borderTop,
          cursor,
        }}
        flush={flush}
        {...props}
        onClick={onTitleClickedHandler}
        className="dgaui dgaui_accordion_title"
      >
        {iconAlignment === "leading" && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyItems: "center",
              gap: 16,
            }}
          >
            <span>
              <img
                src={arrowDownImage}
                style={{
                  transition: "all 0.2s",
                  transform: showContent ? "rotateZ(180deg)" : "none",
                }}
              />
            </span>
            <span>{title}</span>
          </div>
        )}
        {iconAlignment === "trailing" && (
          <>
            <span>{title}</span>
            <img
              src={arrowDownImage}
              style={{
                transition: "all 0.2s",
                transform: showContent ? "rotateZ(180deg)" : "none",
              }}
            />
          </>
        )}
      </StyledComponentTitle>
      <div
        className="dgaui_accordionContent"
        style={{
          direction: theme.direction,
          height: showContent ? contentHeight : 0,
          overflow: "hidden",
          transition: "all 0.2s",
          color: fontColor,
        }}
      >
        <div ref={contentRef} style={{ padding: 16 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const StyledComponentTitle = styled.button<{
  $customStyle: {
    direction: string;
    border: string;
    borderTop?: string;
    minHeight: number;
    padding: number;
    fontSize: number;
    fontColor: string;
    colors: Color;
    cursor: string;
  };
  flush?: boolean;
}>`
  direction: ${(props) => props.$customStyle.direction};
  outline: none;
  min-height: ${(props) => props.$customStyle.minHeight}px;
  padding: ${(props) =>
    props.flush ? "0" : `${props.$customStyle.padding}px`};
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  background-color: #fff;
  border: ${(props) => props.$customStyle.border};
  ${(props) =>
    props.$customStyle.borderTop
      ? "border-top:" + props.$customStyle.borderTop
      : ""};
  cursor: ${(props) => props.$customStyle.cursor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: height 0.2s;

  &:hover {
    background-color: ${(props) => props.$customStyle.colors[100]};
  }
  &:active {
    background-color: ${(props) => props.$customStyle.colors[200]};
  }
  &:focus {
    border: solid 2px #161616;
  }
  &:disabled:hover {
    background-color: #fff;
  }
  &:disabled:active {
    background-color: #fff;
  }
`;

export default Accordion;
