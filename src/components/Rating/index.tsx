import React from "react";
import { mergeStrings } from "../../lib/helpers";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";

import grayIcon from "./icons/gray.png";
import default_selectedIcon from "./icons/selected.png";
import default_halfIcon from "./icons/half.png";
import brand_selectedIcon from "./icons/brand_selected.png";
import brand_halfIcon from "./icons/brand_half.png";

interface DGA_RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  size?: Size;
  brand?: boolean;
  value?: number;
  onChange?: (value: number) => void;
}

const Rating: React.FC<DGA_RatingProps> = ({
  size = "medium",
  brand = false,
  value = 0,
  onChange,
  ...props
}) => {
  const theme = useTheme();
  const [hovering, setHovering] = React.useState(false);
  const [hoverScore, setHoverScore] = React.useState(0);

  const selectedIcon = brand ? brand_selectedIcon : default_selectedIcon;
  const halfIcon = brand ? brand_halfIcon : default_halfIcon;
  const imageSize = size === "large" ? 48 : size === "medium" ? 32 : 24;

  const onHoverHandler = (e: React.MouseEvent, starOrder: number) => {
    const isLeftStarSection = e.nativeEvent.offsetX < imageSize / 2;

    const newHoverScore = isLeftStarSection ? starOrder - 0.5 : starOrder;
    setHoverScore(newHoverScore);
  };

  const onClickHandler = () => {
    onChange?.(hoverScore);
  };

  const scoreResult = hovering ? hoverScore : value;

  return (
    <StyledComponent
      $size={size}
      $theme={theme}
      className={mergeStrings("dgaui dgaui_rating", props.className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onClickHandler}
    >
      <img
        src={
          scoreResult === 0.5
            ? halfIcon
            : scoreResult > 0.5
            ? selectedIcon
            : grayIcon
        }
        onMouseMove={(e) => onHoverHandler(e, 1)}
      />
      <img
        src={
          scoreResult === 1.5
            ? halfIcon
            : scoreResult > 1.5
            ? selectedIcon
            : grayIcon
        }
        onMouseMove={(e) => onHoverHandler(e, 2)}
      />
      <img
        src={
          scoreResult === 2.5
            ? halfIcon
            : scoreResult > 2.5
            ? selectedIcon
            : grayIcon
        }
        onMouseMove={(e) => onHoverHandler(e, 3)}
      />
      <img
        src={
          scoreResult === 3.5
            ? halfIcon
            : scoreResult > 3.5
            ? selectedIcon
            : grayIcon
        }
        onMouseMove={(e) => onHoverHandler(e, 4)}
      />
      <img
        src={
          scoreResult === 4.5
            ? halfIcon
            : scoreResult > 4.5
            ? selectedIcon
            : grayIcon
        }
        onMouseMove={(e) => onHoverHandler(e, 5)}
      />
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $size: Size;
  $theme: Theme;
}>`
  display: flex;
  cursor: pointer;

  img {
    border-radius: 100%;
    &:hover {
      background-color: ${(p) => p.$theme.palette.neutral[100]};
    }

    width: ${(p) =>
      p.$size === "large" ? 48 : p.$size === "medium" ? 32 : 24}px;
    height: ${(p) =>
      p.$size === "large" ? 48 : p.$size === "medium" ? 32 : 24}px;
    margin-inline-end: 4px;
    &:last-child {
      margin-inline-end: 0;
    }
  }
`;

export default Rating;
