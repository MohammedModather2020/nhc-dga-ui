import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import colors from "./colors";

export const sizes = {
  small: { h: 20, py: 8, f: 10 },
  medium: { h: 24, py: 8, f: 12 },
  large: { h: 32, py: 12, f: 16 },
};

interface DGA_TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "contained" | "outlined";
  size?: Size;
  color?: ColorName;
  rounded?: boolean;
}

const Tag: React.FC<DGA_TagProps> = ({
  children,
  variant,
  size,
  color,
  rounded,
  ...props
}) => {
  const theme = useTheme();

  const colorNameResult: ColorName = color ?? "primary";
  const sizeResult: Size = size ?? "medium";
  const variantResult: Variant = variant ?? "contained";
  const tagColors = colors(theme);

  let backgroundColor = tagColors[colorNameResult].bg;
  let borderColor = tagColors[colorNameResult].border;
  let borderColorOutlined = tagColors[colorNameResult].borderOutlined;
  let fontColor = tagColors[colorNameResult].font;
  let border = `border: 1px solid ${borderColor}`;
  let borderRadius = rounded ? 9999 : 4;

  if (variantResult === "outlined") {
    backgroundColor = "transparent";
    border = `border: 1px solid ${borderColorOutlined}`;
  }

  return (
    <StyledComponent
      {...props}
      className={mergeStrings("dgaui dgaui_tag", props.className)}
      $customStyle={{
        direction: theme.direction,
        height: sizes[sizeResult].h,
        paddingY: sizes[sizeResult].py,
        fontSize: sizes[sizeResult].f,
        fontColor,
        backgroundColor: backgroundColor,
        border,
        borderRadius,
      }}
    >
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
    border: string;
    borderRadius: number;
  };
}>`
  direction: ${(props) => props.$customStyle.direction};
  height: ${(props) => props.$customStyle.height}px;
  padding: 0 ${(props) => props.$customStyle.paddingY}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  ${(props) => props.$customStyle.border};
  outline: none;
  border-radius: ${(props) => props.$customStyle.borderRadius}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

export default Tag;
