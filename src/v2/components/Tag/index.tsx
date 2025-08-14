import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";
import colors from "./colors";

export const sizes = {
  xsmall: { w: 56, h: 20, py: 8, f: 10 },
  small: { w: 64, h: 24, py: 8, f: 12 },
  medium: { w: 86, h: 32, py: 12, f: 16 },
};
interface DGA_TagProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children: React.ReactNode;
  style?: "neutral" | "success" | "error" | "warning" | "info" | "onColor";
  size?: "xsmall" | "small" | "medium";
  outLine?: boolean;
  rounded?: boolean;
  iconOnly?: boolean;
  leadIcon?: React.ReactNode;
  trailIcon?: React.ReactNode;
}

const Tag: React.FC<DGA_TagProps> = ({
  children,
  style,
  size,
  outLine,
  iconOnly,
  leadIcon,
  trailIcon,
  rounded,
  ...props
}) => {
  const theme = useTheme();

  const colorNameResult = style ?? "neutral";
  const sizeResult = size ?? "medium";
  const outLineResult: boolean = outLine ?? true;
  const tagColors = colors(theme) ?? "neutral";

  let backgroundColor = tagColors[colorNameResult].bg;
  let borderColor = tagColors[colorNameResult].border;
  let borderColorOutlined = tagColors[colorNameResult].borderOutlined;
  let fontColor = tagColors[colorNameResult].fontColor;
  let border = `border: 1px solid ${borderColor}`;
  let borderRadius = rounded ? 9999 : 4;

  if (outLineResult) {
    backgroundColor = "transparent";
    border = `border: 1px solid ${borderColorOutlined}`;
  }

  return (
    <StyledComponent
      className={mergeStrings("dgaui dgaui_tag", props.className)}
      $customStyle={{
        direction: theme.direction,
        minWidth: iconOnly ? 0 : sizes[sizeResult].w,
        height: sizes[sizeResult].h,
        paddingY: sizes[sizeResult].py,
        fontSize: sizes[sizeResult].f,
        fontColor,
        backgroundColor: backgroundColor,
        border,
        borderRadius,
      }}
    >
      {iconOnly && <div className="iconOnly">{leadIcon || children}</div>}
      {!iconOnly && (
        <>
          <div className="leadIcon">{leadIcon}</div>
          {children}
          <div className="trailIcon">{trailIcon}</div>
        </>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $customStyle: {
    direction: string;
    minWidth: number;
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
  min-width: ${(props) => props.$customStyle.minWidth}px;
  color: ${(props) => props.$customStyle.fontColor};
  height: ${(props) => props.$customStyle.height}px;
  padding: 0 ${(props) => props.$customStyle.paddingY}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  background-color: ${(props) => props.$customStyle.backgroundColor};
  ${(props) => props.$customStyle.border};
  outline: none;
  border-radius: ${(props) => props.$customStyle.borderRadius}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  .leadIcon {
    margin-inline-end: 4px;
    display: "inline-flex";
    alignitems: "center";
  }
  .trailIcon {
    margin-inline-start: 4px;
  }
`;

export default Tag;
