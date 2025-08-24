import React from "react";
import { mergeStrings } from "../../lib/helpers";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { COLORS } from "../../lib/constants";

export const sizes = {
  small: { h: 32 },
  medium: { h: 40 },
  large: { h: 48 },
};

interface DGA_ContentSwitcherProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  size?: Size;
  onColor?: boolean;
  data: { text: React.ReactNode; active?: boolean; onClick?: Function }[];
  onItemClicked?: (item: any, index: number) => void;
}

const ContentSwitcher: React.FC<DGA_ContentSwitcherProps> = ({
  size = "medium",
  onColor = false,
  data,
  onItemClicked,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $theme={theme}
      $onColor={onColor}
      $size={size}
      className={mergeStrings(
        "dgaui dgaui_contentSwitcher" + (onColor ? " onColor" : ""),
        props.className
      )}
    >
      {data.map((item, index) => (
        <div
          key={index}
          tabIndex={0}
          className={
            "dgaui dgaui_contentSwitcherItem" + (item.active ? " active" : "")
          }
          onClick={() => onItemClicked && onItemClicked(item, index)}
        >
          {item.text}
        </div>
      ))}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $onColor: boolean;
  $size: Size;
}>`
  direction: ${(p) => p.$theme.direction};
  display: flex;
  align-items: center;
  height: ${(p) => sizes[p.$size].h}px;
  border-radius: 8px;
  overflow: hidden;

  .dgaui_contentSwitcherItem {
    background-color: ${(p) =>
      p.$onColor ? COLORS.white20 : p.$theme.palette.neutral[100]};
    outline: none;
    color: ${(p) => (p.$onColor ? COLORS.white : p.$theme.textColor)};
    height: 100%;
    padding: 8px 16px;
    border-inline-end: 1px solid #d2d6db;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;

    &.active {
      background-color: ${(p) => p.$theme.palette.neutral[950]};
      color: #fff;
    }

    &:focus {
      background-color: ${(p) => p.$theme.palette.neutral[950]};
      color: #fff;
      border: 2px solid #161616;
      box-sizing: border-box;

      &:after {
        content: "";
        display: block;
        background-color: transparent;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;

        border: 1px solid #fff;
        box-sizing: border-box;
      }
    }

    &:active {
      background-color: ${(p) => p.$theme.palette.neutral[950]};
      color: #fff;
    }

    &:first-child {
      border-start-start-radius: 8px;
      border-end-start-radius: 8px;
      &:focus:after {
        border-start-start-radius: 8px;
        border-end-start-radius: 8px;
      }
    }

    &:last-child {
      border-start-end-radius: 8px;
      border-end-end-radius: 8px;
      &:focus:after {
        border-start-end-radius: 8px;
        border-end-end-radius: 8px;
      }
    }
  }

  &.onColor {
    .dgaui_contentSwitcherItem {
      &.active {
        background-color: ${(p) => p.$theme.palette.primary[600]};
      }
    }
  }
`;

export default ContentSwitcher;
