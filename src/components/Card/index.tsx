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
  effect?: "withShadow" | "noShadow" | "strok";
  expandableContent?: React.ReactNode;
  actionsButtons?: React.ReactElement<typeof Button>[];
  selected?: boolean;
  onChange?: (event: React.SyntheticEvent, value: boolean) => void;
  defaultExpanded?: boolean;
  disabled?: boolean;
}

const Card: React.FC<DGA_CardProps> = ({
  title,
  description,
  icon,
  type = "default",
  effect = "withShadow",
  expandableContent,
  actionsButtons,
  selected,
  onChange,
  defaultExpanded,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const selectable = type === "selectable";
  const expandable = type === "expandable";
  const pointerEvents =
    type === "expandable" || type === "selectable" ? "all" : "none";

  React.useEffect(() => {
    if (expandable && contentRef.current?.clientHeight) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [expandable, contentRef.current?.clientHeight]);

  return (
    <StyledComponent
      className={mergeStrings(
        "dgaui dgaui_card" +
          (disabled ? " disabled" : "") +
          (selectable ? " selectable" : ""),
        props.className
      )}
      $theme={theme}
      $pointerEvents={pointerEvents}
      $effect={effect}
      $contentHeight={contentHeight}
      $expanded={expanded}
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
              <Checkbox value={selected} onChange={onChange} size="medium" />
            </div>
          )}
        </div>
      )}
      {title && <div className="titleContainer">{title}</div>}
      {description && <div className="descriptionContainer">{description}</div>}
      {!!actionsButtons && actionsButtons.length > 0 && (
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
              onClick={() => setExpanded((prevState) => !prevState)}
              style={{
                transition: "all 0.2s",
                transform: expanded ? "rotateZ(-180deg)" : "none",
              }}
            />
          </div>
          <div
            className="expandableContentContainer"
            style={{ height: expanded ? contentHeight : 0 }}
          >
            <div
              className="expandableContent"
              ref={contentRef}
              style={{ visibility: expanded ? "visible" : "hidden" }}
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
  $effect?: "withShadow" | "noShadow" | "strok";
  $contentHeight: number;
  $expanded?: boolean;
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
  color: ${(p) => p.$theme.palette.neutral[800]};
  border: 2px solid transparent;

  ${(p) => (p.$effect === "withShadow" ? p.$theme.elevation.shadows.md : "")};
  ${(p) =>
    p.$effect === "strok"
      ? "border: 1px solid " + p.$theme.palette.neutral[300]
      : ""};

  ${(p) =>
    p.$pointerEvents === "all"
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
    filter: grayscale(1);
    background-color: ${(p) => p.$theme.palette.neutral[200]};
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
