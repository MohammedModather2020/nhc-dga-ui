import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import Button from "../Button";
import useTheme from "../../lib/useTheme";
import arrowDownImage from "../../assets/images/chevron.png";
import Checkbox from "../Checkbox";

interface DGA_CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  type?: "default" | "expandable" | "selectable";
  state?: "default" | "disabled" | "focused" | "hover";
  effect?: "withShadow" | "noShadow" | "stroke";
  expandableContent?: React.ReactNode;
  actionsButtons?: React.ReactElement<typeof Button>[];
  expanded?: boolean;
  selected?: boolean;
  onChange?: (event: React.SyntheticEvent, value: boolean) => void;
}

const Card: React.FC<DGA_CardProps> = ({
  title,
  description,
  icon,
  type = "default",
  state = "default",
  effect = "withShadow",
  expandableContent,
  actionsButtons,
  selected,
  expanded,
  onChange,
  ...props
}) => {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Use expanded prop if provided, otherwise use internal state
  const isExpanded = expanded !== undefined ? expanded : internalExpanded;

  const selectable = type === "selectable";
  const expandable = type === "expandable";
  const pointerEvents =
    type === "expandable" || type === "selectable" ? "all" : "none";

  React.useEffect(() => {
    if (expandable && contentRef.current?.clientHeight) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [expandable, contentRef.current?.clientHeight]);

  const handleExpandToggle = () => {
    if (expanded === undefined) {
      // Only use internal state if expanded prop is not controlled
      setInternalExpanded((prevState: boolean) => !prevState);
    }
  };

  return (
    <StyledComponent
      className={mergeStrings(
        "dgaui dgaui_card" +
          (state === "disabled" ? " disabled" : "") +
          (selectable ? " selectable" : ""),
        props.className
      )}
      $theme={theme}
      $pointerEvents={pointerEvents}
      $effect={effect}
      $contentHeight={contentHeight}
      $expanded={isExpanded}
      $state={state}
      {...props}
      tabIndex={0}
      onClick={(e) => {
        props.onClick && props.onClick(e);
        onChange?.(e, !selected);
      }}
    >
      {(icon || selectable) && (
        <div className="cardHeader">
          <div className="iconContainer">{icon}</div>
          {selectable && (
            <div
              className="checkboxContainer"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                value={selected}
                onChange={onChange}
                size="medium"
                disabled={state === "disabled"}
              />
            </div>
          )}
        </div>
      )}
      {title && <div className="titleContainer">{title}</div>}
      {description && <div className="descriptionContainer">{description}</div>}
      {!!actionsButtons && actionsButtons.length > 0 && type === "default" && (
        <div
          className="actionsButtonsContainer"
          onClick={(e) => e.stopPropagation()}
        >
          {actionsButtons}
        </div>
      )}
      {expandable && (
        <>
          <div className="caretButtonContainer">
            <img
              src={arrowDownImage}
              onClick={handleExpandToggle}
              style={{
                transition: "all 0.2s",
                transform: isExpanded ? "rotateZ(-180deg)" : "none",
              }}
            />
          </div>
          <div
            className="expandableContentContainer"
            style={{ height: isExpanded ? contentHeight : 0 }}
          >
            <div
              className="expandableContent"
              ref={contentRef}
              style={{ visibility: isExpanded ? "visible" : "hidden" }}
            >
              {expandableContent}
            </div>
          </div>
        </>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $pointerEvents: string;
  $effect?: "withShadow" | "noShadow" | "stroke";
  $contentHeight: number;
  $expanded?: boolean;
  $state?: "default" | "disabled" | "focused" | "hover";
}>`
  direction: ${(p) => p.$theme.direction};
  /* pointer-events: ${(p) => p.$pointerEvents}; */
  border: none;
  outline: none;
  width: 350px;
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
  text-align: start;
  overflow: hidden;
  color: ${(p) =>
    p.$state === "disabled"
      ? p.$theme.palette.neutral[400]
      : p.$theme.palette.neutral[800]};
  border: 2px solid transparent;

  /* Apply background color based on state prop */
  background-color: ${(p) => {
    if (p.$state === "hover") return p.$theme.palette.neutral[50];
    return "#fff";
  }};

  /* Apply border color based on state prop */
  ${(p) =>
    p.$state === "focused" ? `border: 2px solid ${p.$theme.textColor};` : ""}

  ${(p) => (p.$effect === "withShadow" ? p.$theme.elevation.shadows.md : "")};
  ${(p) =>
    p.$effect === "stroke"
      ? "border: 1px solid " + p.$theme.palette.neutral[300]
      : ""};

  /* CSS hover and focus states - work when state prop is default */
  ${(p) =>
    p.$pointerEvents === "all" && p.$state !== "disabled"
      ? css`
          &:hover {
            background-color: ${p.$theme.palette.neutral[50]};
          }
          &:focus {
            border: 2px solid ${p.$theme.textColor};
          }
        `
      : ""}

  &.selectable {
    cursor: pointer;
  }
  &.disabled {
    pointer-events: none;
    background-color: ${(p) => p.$theme.palette.neutral[200]};

    .iconContainer {
      opacity: 0.5;
      filter: grayscale(1);
    }

    .checkboxContainer {
      opacity: 0.5;
      filter: grayscale(1);
    }
  }

  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 48px;
    margin-bottom: 24px;

    .iconContainer {
      max-height: 48px;
    }
  }

  .titleContainer {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .descriptionContainer {
    font-size: 16px;
  }
  .actionsButtonsContainer {
    margin-top: 24px;
    button {
      margin-inline-end: 16px;
      &:last-child {
        margin-inline-end: 0;
      }
    }
  }

  .caretButtonContainer {
    height: 40px;
    margin-top: 24px;
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
  .expandableContentContainer {
    transition: all 0.2s;
    font-size: 16px;

    .expandableContent {
    }
  }
`;

export default Card;
