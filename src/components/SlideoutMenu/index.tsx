import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import { COLORS } from "../../lib/constants";
import useTheme from "../../lib/useTheme";
import xImg from "../../assets/images/close.png";

type SlideoutMenuBgColor = "white" | "gray";

interface DGA_SlideoutMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  backdrop?: boolean;
  backgroundColor?: SlideoutMenuBgColor;
  onCloseClicked?: Function;
  onClose?: Function;
  navHeader?: {
    titleText?: React.ReactNode;
    descriptionText?: React.ReactNode;
    icon?: React.ReactNode;
    showFeaturedIcon?: boolean;
    showDescription?: boolean;
    showDivider?: boolean;
  };
  border?: boolean;
  children?: React.ReactNode;
}

const SlideoutMenu: React.FC<DGA_SlideoutMenuProps> = ({
  open = false,
  backdrop = true,
  backgroundColor = "gray",
  navHeader,
  onCloseClicked,
  onClose,
  border = true,
  children,
  ...props
}) => {
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<DOMRect>();

  React.useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setRect(rect);
    }
  }, [ref.current]);

  return (
    <StyledContainer $open={open} $backdrop={backdrop}>
      <div className="backdrop" onClick={() => onClose?.()} />
      <StyledComponent
        {...props}
        ref={ref}
        $open={open}
        $theme={theme}
        $border={border}
        $showNavHeaderDivider={navHeader?.showDivider}
        $backgroundColor={backgroundColor}
        $rect={rect}
        className={mergeStrings("dgaui dgaui_slideoutMenu", props.className)}
      >
        {navHeader && (
          <div className="dgaui dgaui_slideoutMenuHeader">
            {navHeader.showFeaturedIcon && (
              <div className="iconContainer">{navHeader.icon}</div>
            )}
            <div className="contentContainer">
              <div className="title">
                <span>{navHeader.titleText}</span>
                <img
                  src={xImg}
                  alt="close"
                  onClick={() => onCloseClicked?.()}
                />
              </div>
              {navHeader.showDescription && (
                <div className="descriptionText">
                  {navHeader.descriptionText}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="dgaui dgaui_slideoutMenuContent">{children}</div>
      </StyledComponent>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{
  $open: boolean;
  $backdrop: boolean;
}>`
  position: relative;

  .backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1399;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    visibility: ${(p) => (p.$open ? "visible" : "hidden")};
    opacity: ${(p) => (p.$backdrop && p.$open ? 1 : 0)};
    transition: all 0.2s ease;
  }
`;

const StyledComponent = styled.div<{
  $open: boolean;
  $theme: Theme;
  $border: boolean;
  $showNavHeaderDivider?: boolean;
  $backgroundColor?: SlideoutMenuBgColor;
  $rect: DOMRect | undefined;
}>`
  direction: ${(p) => p.$theme.direction};
  overflow: scroll;
  ${(p) =>
    p.$border
      ? `border-inline-end: 1px solid ${p.$theme.palette.neutral[300]};`
      : ""}
  width: 350px;
  height: 100vh;
  background-color: ${(p) =>
    p.$backgroundColor === "white"
      ? COLORS.white
      : p.$theme.palette.neutral[100]};
  display: ${(p) => (!p.$rect ? "none" : "block")};
  position: fixed;
  z-index: 1400;
  top: 0;
  left: ${(p) => {
    const width = p.$rect?.width || 350;

    if (p.$open) {
      return p.$theme.direction === 'rtl' ? window.innerWidth - width : 0; // show it
    }

    return p.$theme.direction === 'rtl' ? window.innerWidth + width : -width; // hide it off screen
  }}px;

  transition: left 0.2s ease;

  .dgaui_slideoutMenuHeader {
    width: 100%;
    padding: 16px;
    background-color: ${(p) => p.$theme.palette.neutral[50]};
    border-bottom: ${(p) =>
      p.$showNavHeaderDivider
        ? `1px solid ${p.$theme.palette.neutral[300]}`
        : "none"};

    display: flex;
    align-items: center;
    height: 78px;

    .iconContainer {
      margin-inline-end: 8px;
    }

    .contentContainer {
      flex: 1;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${(p) => p.$theme.textColor};
        font-weight: 600;
        margin-bottom: 4px;

        img {
          cursor: pointer;
          width: 8px;
          height: 8px;
        }
      }
    }

    .descriptionText {
      color: ${(p) => p.$theme.palette.neutral[500]};
    }
  }
`;

export default SlideoutMenu;
