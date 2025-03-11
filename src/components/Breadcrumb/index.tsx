import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import useTheme from "../../lib/useTheme";
import arrowToRight from "../../assets/images/arrow-to-right.png";
import arrowToLeft from "../../assets/images/arrow-to-left.png";
import DropdownItem from "../Dropdown/DropdownItem";

type DGA_BreadcrumbProps = {
  items: {
    label: React.ReactNode;
    onClick?: Function;
  }[];
  className?: string;
};

const Breadcrumb: React.FC<DGA_BreadcrumbProps> = ({ items, className }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [itemsPosition, setItemsPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const openListHandler = () => {
    setOpen(true);
  };

  let children: any = items.map((el, ind) => (
    <span
      className="dgaui_breadcrumbItem"
      key={ind}
      onClick={() => el.onClick && el.onClick()}
    >
      {el.label}
    </span>
  ));

  if (items.length > 5) {
    const lastTwoItems = [items[items.length - 2], items[items.length - 1]];

    children = (
      <>
        <span
          className="dgaui_breadcrumbItem"
          onClick={() => items[0].onClick && items[0].onClick()}
        >
          {items[0].label}
        </span>
        <span
          ref={ref}
          onClick={openListHandler}
          className="dgaui_breadcrumbItem dots"
        >
          ...
        </span>
        {lastTwoItems.map((el, ind) => (
          <span
            className="dgaui_breadcrumbItem"
            key={ind}
            onClick={() => el.onClick && el.onClick()}
          >
            {el.label}
          </span>
        ))}
      </>
    );
  }

  React.useEffect(() => {
    if (ref.current && containerRef.current) {
      setItemsPosition({
        top: containerRef.current.offsetTop + containerRef.current.clientHeight,
        left: containerRef.current.offsetLeft,
        width: containerRef.current.clientWidth,
      });

      const resizeHandler = () => {
        if (ref.current && containerRef.current)
          setItemsPosition({
            top:
              containerRef.current.offsetTop +
              containerRef.current.clientHeight,
            left: containerRef.current.offsetLeft,
            width: containerRef.current.clientWidth,
          });
      };

      const clickHandler = (e: MouseEvent) => {
        // Clicked outside
        if (!containerRef.current?.contains(e.target as any)) {
          setOpen(false);
        }
      };

      window.addEventListener("resize", resizeHandler);
      window.addEventListener("click", clickHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener("click", clickHandler);
      };
    }
  }, [ref]);

  return (
    <>
      <StyledComponent
        className={mergeStrings("dgaui dgaui_breadcrumb", className)}
        $theme={theme}
        $icon={theme.direction === "ltr" ? arrowToRight : arrowToLeft}
        ref={containerRef}
      >
        {children}
      </StyledComponent>

      {items.length > 5 && (
        <StyledList
          $theme={theme}
          className={"dgaui_breadcrumbList" + (open ? " slide-bottom" : "")}
          style={{ ...itemsPosition }}
        >
          {items.map((el, ind) => (
            <DropdownItem key={ind} onClick={() => el.onClick && el.onClick()}>
              {el.label}
            </DropdownItem>
          ))}
        </StyledList>
      )}
    </>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $icon: string;
}>`
  direction: ${(props) => props.$theme.direction};
  display: flex;

  .dgaui_breadcrumbItem {
    color: ${(props) => props.$theme.palette.neutral[700]};
    min-width: 30px;
    height: 20px;
    position: relative;
    padding-inline-end: 4px;
    padding-inline-start: 20px;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    &.dots {
      min-width: 12px;
    }

    &::before {
      content: url(${(p) => p.$icon});
      position: absolute;
      width: 20px;
      height: 20px;
      inset-inline-start: 0;
      bottom: -2px;
    }
  }

  :first-child::before {
    content: "";
    padding-inline-start: 0px;
    min-width: 0;
    width: 0;
    height: 0;
  }

  :last-child {
    color: ${(props) => props.$theme.palette.neutral[400]};
    cursor: auto;
    pointer-events: none;
  }
`;

const StyledList = styled.div<{ $theme: Theme }>`
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  opacity: 0;
  max-height: 300px;
  overflow-y: scroll;
  pointer-events: none;
  border: 1px solid ${(p) => p.$theme.palette.neutral[300]};
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  ${(p) => p.$theme.elevation.shadows.xl}
  cursor: pointer;

  &.slide-bottom {
    animation: slide-bottom 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    pointer-events: all;
  }
  @keyframes slide-bottom {
    0% {
      transform: translateZ(0) translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateZ(160px) translateY(8px);
      opacity: 1;
    }
  }
`;

export default Breadcrumb;
