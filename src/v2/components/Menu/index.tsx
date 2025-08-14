import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";

interface DGA_MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  menuItems: React.ReactNode;
  children: React.ReactNode;
  keepOpenOnItemsClicked?: boolean;
  onOpen?: (e: SyntheticEvent) => void;
  onClose?: (e: SyntheticEvent) => void;
}

const Menu: React.FC<DGA_MenuProps> = ({
  children,
  menuItems,
  disabled,
  keepOpenOnItemsClicked,
  onOpen,
  onClose,
  ...props
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [defaultBodyOverflow, setDefaultBodyOverflow] = React.useState("");
  const [itemsPosition, setItemsPosition] = React.useState({
    top: 0,
    left: 0,
  });
  const componentRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const menuItemsRef = React.useRef<HTMLDivElement>(null);

  const positioner = () => {
    let vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    if (ref.current && menuItemsRef.current) {
      const rect = ref.current.getBoundingClientRect();

      // bottom-to-bottom
      let values = {
        top: rect.bottom,
        left:
          theme.direction === "ltr"
            ? rect.left
            : rect.right - menuItemsRef.current.clientWidth,
      };

      // if width starting from children corner greater than window width + direction checking
      if (theme.direction === "ltr") {
        if (
          values.left + menuItemsRef.current.clientWidth >
          window.innerWidth
        ) {
          values.left = window.innerWidth - menuItemsRef.current.clientWidth;
        }
      } else {
        if (values.left && rect.right - menuItemsRef.current.clientWidth < 0) {
          values.left = 0;
        }
      }

      // bottom-to-top
      if (rect.bottom + menuItemsRef.current.clientHeight > vh) {
        values.top = rect.top - menuItemsRef.current.clientHeight;
      }

      if (values.top < 0) {
        values.top = 0;
      }
      if (values.top > vh) {
        values.top = menuItemsRef.current.clientHeight;
      }

      setItemsPosition(values);
    }
  };

  const openMenu = (e: SyntheticEvent) => {
    if (open) {
      setOpen(false);
      onClose?.(e);
    } else {
      positioner();
      setOpen(true);
      onOpen?.(e);
    }
  };

  // Popover position
  React.useEffect(() => {
    if (ref.current) {
      const resizeHandler = () => {
        positioner();
      };

      const clickHandler = (e: SyntheticEvent) => {
        // Clicked outside
        if (!componentRef.current?.contains(e.target as any)) {
          onClose?.(e);
          setOpen(false);
        }
      };

      window.addEventListener("resize", resizeHandler);
      window.addEventListener("click", clickHandler as any);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener("click", clickHandler as any);
      };
    }
  }, [ref]);

  React.useEffect(() => {
    const body = document.getElementsByTagName("body");
    if (body && body[0]) {
      if (open) {
        body[0].style.overflow = "hidden";
      } else {
        body[0].style.overflow = defaultBodyOverflow;
      }
    }
  }, [open]);

  React.useEffect(() => {
    setDefaultBodyOverflow(
      document.getElementsByTagName("body")?.[0]?.style?.overflow
    );
  }, []);

  return (
    <StyledComponent
      $theme={theme}
      {...props}
      className={mergeStrings("dgaui dgaui_menu", props.className)}
      ref={componentRef}
    >
      <div
        ref={ref}
        onClick={(e: SyntheticEvent) => openMenu(e)}
        className="menuChildren"
      >
        {children}
      </div>
      <div
        ref={menuItemsRef}
        className={
          "menueItemsContainer dgaui_hiddenScrollbar " +
          (open ? " slide-bottom" : "")
        }
        style={itemsPosition}
        onClick={(e) => {
          if (!keepOpenOnItemsClicked) {
            setOpen(false);
            onClose?.(e);
          }
        }}
      >
        {menuItems}
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
}>`
  direction: ${(p) => p.$theme.direction};

  .menueItemsContainer {
    width: max-content;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1400;
    background-color: #fff;
    opacity: 0;
    min-width: 20px;
    max-height: 400px;
    overflow-y: scroll;
    pointer-events: none;
    border: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    border-radius: 8px;
    ${(p) => p.$theme.elevation.shadows["2xl"]}
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
  }
`;

export default Menu;
