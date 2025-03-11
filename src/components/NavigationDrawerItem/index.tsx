import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import arrowDownImage from "../../assets/images/chevron.png";

export interface DGA_NavigationDrawerItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  type?: "divider" | "parent" | "link";
  level?: 1 | 2;
}

const NavigationDrawerItem: React.FC<DGA_NavigationDrawerItemProps> = ({
  children,
  title,
  selected,
  type = "link",
  level = 1,
  disabled,
  expanded,
  defaultExpanded,
  ...props
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(defaultExpanded);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const showContent = typeof expanded !== "undefined" ? expanded : open;

  const onTitleClickedHandler = () => {
    setOpen(!showContent);
  };

  const className = mergeStrings(
    "dgaui dgaui_ndi" +
      (disabled ? " disabled" : "") +
      (type === "parent" ? " parent" : ""),
    props.className
  );

  React.useEffect(() => {
    if (contentRef.current?.clientHeight) {
      setContentHeight(contentRef.current.clientHeight+10);//10 for content padding
    }
  }, [contentRef.current?.clientHeight]);

  if (type === "divider") {
    return <StyledComponentDivider />;
  }

  return (
    <>
      <StyledComponent
        {...props}
        className={className}
        $theme={theme}
        $selected={selected}
        $level={level}
        $type={type}
        tabIndex={0}
        onClick={onTitleClickedHandler}
      >
        {title}
        {type === "parent" && (
          <img
            src={arrowDownImage}
            style={{
              transition: "all 0.2s",
              transform: showContent ? "rotateZ(180deg)" : "none",
            }}
          />
        )}
      </StyledComponent>
      {type === "parent" && (
        <div
          className="dgaui_ndiContent"
          style={{
            direction: theme.direction,
            height: showContent ? contentHeight : 0,
            overflow: "hidden",
            transition: "all 0.2s",
          }}
        >
          <div ref={contentRef}>{children}</div>
        </div>
      )}
    </>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $selected?: boolean;
  $vertical?: boolean;
  $level: 1 | 2;
  $type: "divider" | "parent" | "link";
}>`
  direction: ${(p) => p.$theme.direction};
  height: 36px;
  outline: none;
  background-color: ${(p) =>
    p.$selected ? p.$theme.palette.neutral[200] : "transparent"};
  font-weight: ${(p) => (p.$level === 1 ? 600 : 400)};
  color: ${(p) =>
    p.$selected ? p.$theme.palette.primary[600] : p.$theme.textColor};
  padding: 8px 16px;
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  display: flex;
  justify-content: ${(p) =>
    p.$type === "parent" ? "space-between" : "flex-start"};
  align-items: center;

  &::after {
    content: "";
    display: block;
    opacity: ${(p) => (p.$selected ? 1 : 0)};
    height: 75%;
    width: 6px;
    border-radius: 10px;
    bottom: auto;
    inset-inline-start: -2px;
    position: absolute;
    z-index: 2;
    background: ${(p) =>
      p.$selected ? p.$theme.palette.primary[600] : p.$theme.textColor};
  }

  &:hover {
    background-color: ${(p) => p.$theme.palette.neutral[100]};

    &::after {
      opacity: 1;
      background: ${(p) => p.$theme.palette.neutral[400]};
    }
  }
  &:active {
    background-color: ${(p) => p.$theme.palette.neutral[200]};

    &::after {
      background: ${(p) => p.$theme.palette.neutral[800]};
      opacity: 1;
    }
  }

  &:focus {
    border: 2px solid ${(p) => p.$theme.textColor};
    &::after {
      opacity: 0;
    }
  }
  &.disabled {
    pointer-events: none;
    color: ${(p) => p.$theme.palette.neutral[400]};
    cursor: default;
    pointer-events: none;
    &::after {
      opacity: 0;
      background: ${(p) => (p.$selected ? p.$theme.palette.neutral[400] : "")};
    }
    img {
      filter: opacity(0.5) grayscale(100%);
    }
  }
`;

const StyledComponentDivider = styled.div`
  margin: 8px 16px;
  height: 1px;
  background-color: #d2d6db;
  width: 100%;
`;

export default NavigationDrawerItem;
