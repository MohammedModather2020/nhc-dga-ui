import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import colors, { TagStatusColorName, TagStatusVariant } from "./colors";

export const sizes = {
  small: { h: 20, py: 8, f: 10 },
  medium: { h: 24, py: 8, f: 12 },
  large: { h: 32, py: 16, f: 16 },
};

interface DGA_TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: TagStatusVariant;
  size?: Size;
  color?: TagStatusColorName;
}

const tagStatusColorNames = [
  "green",
  "red",
  "yellow",
  "primary",
  "secondary",
  "neutral",
  "error",
  "warning",
  "info",
  "success",
];

const StatusTag: React.FC<DGA_TagProps> = ({
  children,
  variant,
  size,
  color,
  ...props
}) => {
  const theme = useTheme();

  const colorNameResult: TagStatusColorName = color && tagStatusColorNames.includes(color) ? color : "neutral";
  const sizeResult: Size = size ?? "medium";
  const variantResult: TagStatusVariant = variant ? variant : "subtle";
  const tagColors = colors(theme);

  let backgroundColor = tagColors[colorNameResult][variantResult]?.bg;
  let iconBackgroundColor = tagColors[colorNameResult][variantResult]?.iconBg;
  let fontColor = tagColors[colorNameResult][variantResult]?.font;

  return (
    <StyledComponent
      {...props}
      className={mergeStrings("dgaui dgaui_statusTag", props.className)}
      $customStyle={{
        direction: theme.direction,
        height: sizes[sizeResult].h,
        paddingY: sizes[sizeResult].py,
        fontSize: sizes[sizeResult].f,
        fontColor,
        backgroundColor,
        iconBackgroundColor,
      }}
    >
      <i className="dgaui_icon" />
      {children}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $customStyle: {
    direction: string;
    height: number;
    paddingY: number;
    fontSize: number;
    fontColor: string;
    backgroundColor: string;
    iconBackgroundColor: string;
  };
}>`
  direction: ${(props) => props.$customStyle.direction};
  height: ${(props) => props.$customStyle.height}px;
  padding: 0 ${(props) => props.$customStyle.paddingY}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  outline: none;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .dgaui_icon {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: ${(props) => props.$customStyle.iconBackgroundColor};
    margin-inline-end: 8px;
  }
`;

export default StatusTag;
