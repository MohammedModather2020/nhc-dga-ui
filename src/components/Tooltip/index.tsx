import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import useTheme from "../../lib/useTheme";
import qIcon from "../../assets/images/qIcon.png";

const caretSize = 6;

interface DGA_TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"|"content"> {
  children: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  jsxContents?: React.ReactNode;
  beakPlacement?: "top" | "bottom" | "left" | "right";
  beakAlignment?: "start" | "end" | "center";
  noBeak?: boolean;
  inverted?: boolean;
  backgroundColor?: string;
  icon?: boolean;
}

const Tooltip: React.FC<DGA_TooltipProps> = ({
  title,
  content,
  jsxContents,
  children,
  beakPlacement = "top",
  beakAlignment = "center",
  noBeak,
  inverted,
  backgroundColor,
  icon = false,
  ...props
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [contentClicked, setContentClicked] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    caret: {
      top: 0,
      left: 0,
      color: "",
    },
  });

  const showTooltip = open || contentClicked;
  let caretColor = inverted ? theme.palette.neutral[800] : "#fff";
  if (backgroundColor) {
    caretColor = backgroundColor;
  }

  const caretColors = {
    toBottom: `${caretColor} transparent transparent transparent`,
    toTop: `transparent transparent ${caretColor} transparent`,
    toLeft: `transparent ${caretColor} transparent transparent`,
    toRight: `transparent transparent transparent ${caretColor}`,
  };

  const calcPosition = () => {
    if (ref.current && tooltipRef.current) {
      let newTop = 0;
      let newLeft = 0;
      let newCaret = {
        top: 0,
        left: 0,
        color: "",
      };
      const childrenWidth = ref.current.clientWidth;
      const childrenHeight = ref.current.clientHeight;
      const childrenTop = ref.current.offsetTop;
      const childrenLeft = ref.current.offsetLeft;
      const tooltipWidth = tooltipRef.current.clientWidth;
      const tooltipHeight = tooltipRef.current.clientHeight;

      if (beakPlacement === "top" && beakAlignment === "start") {
        newTop = childrenTop - tooltipHeight - caretSize;
        newLeft = childrenLeft;
        newCaret = {
          top: childrenTop - caretSize,
          left: childrenLeft + caretSize,
          color: caretColors.toBottom,
        };
      }
      if (beakPlacement === "top" && beakAlignment === "center") {
        newTop = childrenTop - tooltipHeight - caretSize;
        newLeft = childrenLeft - tooltipWidth / 2;
        newCaret = {
          top: childrenTop - caretSize,
          left: childrenLeft,
          color: caretColors.toBottom,
        };
      }
      if (beakPlacement === "top" && beakAlignment === "end") {
        newTop = childrenTop - tooltipHeight - caretSize;
        newLeft = childrenLeft + caretSize * 3 - tooltipWidth;
        newCaret = {
          top: childrenTop - caretSize,
          left: childrenLeft,
          color: caretColors.toBottom,
        };
      }

      if (beakPlacement === "bottom" && beakAlignment === "start") {
        newTop = childrenTop + childrenHeight + caretSize;
        newLeft = childrenLeft;
        newCaret = {
          top: childrenTop + childrenHeight - caretSize,
          left: childrenLeft + caretSize,
          color: caretColors.toTop,
        };
      }
      if (beakPlacement === "bottom" && beakAlignment === "center") {
        newTop = childrenTop + childrenHeight + caretSize;
        newLeft = childrenLeft - tooltipWidth / 2;
        newCaret = {
          top: childrenTop + childrenHeight - caretSize,
          left: childrenLeft,
          color: caretColors.toTop,
        };
      }
      if (beakPlacement === "bottom" && beakAlignment === "end") {
        newTop = childrenTop + childrenHeight + caretSize;
        newLeft = childrenLeft + caretSize * 4 - tooltipWidth;
        newCaret = {
          top: childrenTop + childrenHeight - caretSize,
          left: childrenLeft + caretSize,
          color: caretColors.toTop,
        };
      }

      if (beakPlacement === "left" && beakAlignment === "start") {
        newTop = childrenTop;
        newLeft = childrenLeft - tooltipWidth - caretSize;
        newCaret = {
          top: childrenTop + caretSize,
          left: childrenLeft - caretSize,
          color: caretColors.toRight,
        };
      }
      if (beakPlacement === "left" && beakAlignment === "center") {
        newTop = childrenTop + caretSize * 1.5 - tooltipHeight / 2;
        newLeft = childrenLeft - tooltipWidth - caretSize;
        newCaret = {
          top: childrenTop + caretSize,
          left: childrenLeft - caretSize,
          color: caretColors.toRight,
        };
      }
      if (beakPlacement === "left" && beakAlignment === "end") {
        newTop = childrenTop - tooltipHeight + caretSize * 4;
        newLeft = childrenLeft - tooltipWidth - caretSize;
        newCaret = {
          top: childrenTop + caretSize,
          left: childrenLeft - caretSize,
          color: caretColors.toRight,
        };
      }

      if (beakPlacement === "right" && beakAlignment === "start") {
        newTop = childrenTop;
        newLeft = childrenLeft + childrenWidth + caretSize;
        newCaret = {
          top: childrenTop + caretSize,
          left: childrenLeft + childrenWidth - caretSize,
          color: caretColors.toLeft,
        };
      }
      if (beakPlacement === "right" && beakAlignment === "center") {
        newTop = childrenTop - tooltipHeight / 2 + caretSize * 2;
        newLeft = childrenLeft + childrenWidth + caretSize;
        newCaret = {
          top: childrenTop + caretSize,
          left: childrenLeft + childrenWidth - caretSize,
          color: caretColors.toLeft,
        };
      }
      if (beakPlacement === "right" && beakAlignment === "end") {
        newTop = childrenTop - tooltipHeight + caretSize * 4;
        newLeft = childrenLeft + childrenWidth + caretSize;
        newCaret = {
          top: childrenTop + caretSize,
          left: childrenLeft + childrenWidth - caretSize,
          color: caretColors.toLeft,
        };
      }

      setPosition({
        top: newTop,
        left: newLeft,
        caret: newCaret,
      });
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      calcPosition();

      const resizeHandler = () => {
        calcPosition();
      };

      const clickHandler = (e: MouseEvent) => {
        // Clicked outside
        if (!ref.current?.contains(e.target as any)) {
          setOpen(false);
          setContentClicked(false);
        }
      };

      const mouseoverHandler = (e: MouseEvent) => {
        calcPosition();
        setOpen(true);
      };

      const mouseleaveHandler = () => {
        setOpen(false);
      };

      window.addEventListener("click", clickHandler);
      window.addEventListener("resize", resizeHandler);
      ref.current.addEventListener("mouseover", mouseoverHandler);
      ref.current.addEventListener("mouseleave", mouseleaveHandler);
      ref.current.addEventListener("click", mouseoverHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener("click", clickHandler);
        ref?.current?.removeEventListener("mouseover", mouseoverHandler);
        ref?.current?.removeEventListener("mouseleave", mouseleaveHandler);
        ref?.current?.removeEventListener("click", mouseoverHandler);
      };
    }
  }, [ref, tooltipRef, beakPlacement, beakAlignment]);

  return (
    <StyledComponent
      className={mergeStrings("dgaui dgaui_tooltip", props.className)}
      $theme={theme}
      $inverted={inverted}
      {...props}
      ref={ref}
      onClick={() => {
        setContentClicked(true);
      }}
      $position={position}
    >
      {children}

      <StyledDiv
        ref={tooltipRef}
        $theme={theme}
        $position={position}
        $inverted={inverted}
        $backgroundColor={backgroundColor}
        className={
          "dgaui_tooltipContent" + (showTooltip ? " show-tooltip" : "")
        }
      >
        {jsxContents && jsxContents}
        {!jsxContents && (
          <>
            {icon && (
              <div className="dgaui_tooltipContentIcon">
                <img src={qIcon} />
              </div>
            )}
            <div className="dgaui_tooltipContentText">
              <div className="dgaui_tooltipTitle">{title}</div>
              <div className="dgaui_tooltipDescription">{content}</div>
            </div>
          </>
        )}
      </StyledDiv>
      {!noBeak && <span className={showTooltip ? "show" : ""} />}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $position: {
    top: number;
    left: number;
    caret: { top: number; left: number; color: string };
  };
  $inverted?: boolean;
}>`
  direction: ${(props) => props.$theme.direction};
  display: inline-block;

  span {
    position: absolute;
    display: none;
    z-index: 1;
    border-style: solid;
    top: ${(p) => p.$position.caret.top}px;
    left: ${(p) => p.$position.caret.left}px;
    ${(p) => p.$theme.elevation.shadows.lg}
    border-width: ${caretSize}px;
    border-color: ${(p) => p.$position.caret.color};

    &.show {
      display: initial;
    }
  }
`;

const StyledDiv = styled.div<{
  $theme: Theme;
  $position: { top: number; left: number };
  $inverted?: boolean;
  $backgroundColor?: string;
}>`
  position: absolute;
  top: ${(p) => p.$position.top}px;
  left: ${(p) => p.$position.left}px;
  z-index: 1;
  background-color: ${(p) =>
    p.$backgroundColor
      ? p.$backgroundColor
      : p.$inverted
        ? p.$theme.palette.neutral[800]
        : "#fff"};
  width: 240px;
  opacity: 0;
  display: flex;
  visibility: hidden;
  max-height: 400px;

  border-radius: 4px;
  ${(p) => p.$theme.elevation.shadows.lg}

  .dgaui_tooltipContentIcon {
    padding: 8px;
    padding-inline-end: 0;

    img {
      width: 18px;
      height: 18px;
    }
  }
  .dgaui_tooltipContentText {
    padding: 8px;
    font-size: 12px;

    .dgaui_tooltipTitle {
      font-weight: 600;
      color: ${(p) =>
        p.$inverted
          ? p.$theme.palette.neutral[50]
          : p.$theme.palette.neutral[800]};
    }
    .dgaui_tooltipDescription {
      margin-top: 8px;
      color: ${(p) =>
        p.$inverted
          ? p.$theme.palette.neutral[100]
          : p.$theme.palette.neutral[700]};
      line-height: 16px;
    }
  }

  &.show-tooltip {
    visibility: visible;

    animation: show-tooltip 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @keyframes show-tooltip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Tooltip;
