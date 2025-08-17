import React from "react";
import useTheme from "../../lib/useTheme";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";

type DGA_AvatarSize =
  | "xxSmall"
  | "xSmall"
  | "small"
  | "medium"
  | "large"
  | "xLarge"
  | "xxLarge";

export type DGA_AvatarProps = {
  size?: DGA_AvatarSize;
  text?: React.ReactNode;
  icon?: React.ReactNode;
  imageSrc?: string;
  className?: string;
  square?: boolean;
  index?: number;
  border?: boolean;
  borderColor?: string;
};

export const sizes: {
  [k in DGA_AvatarSize]: { wh: number; b: number; f: number; fw: number };
} = {
  xxSmall: { wh: 24, b: 2, f: 10, fw: 700 },
  xSmall: { wh: 32, b: 2, f: 12, fw: 600 },
  small: { wh: 40, b: 2, f: 14, fw: 600 },
  medium: { wh: 48, b: 2, f: 16, fw: 500 },
  large: { wh: 64, b: 2, f: 20, fw: 500 },
  xLarge: { wh: 80, b: 2, f: 30, fw: 400 },
  xxLarge: { wh: 120, b: 4, f: 36, fw: 400 },
};

const Avatar: React.FC<DGA_AvatarProps> = ({
  size = "medium",
  text,
  icon,
  imageSrc,
  className,
  square,
  index,
  border = false,
  borderColor = "#16161633",
}) => {
  const theme = useTheme();

  let children: any = text;
  let isIcon = false;

  if (icon) {
    isIcon = true;
    children = icon;
  }

  if (imageSrc) {
    children = <img alt="avatar" src={imageSrc} />;
  }

  return (
    <StyledComponent
      $theme={theme}
      $size={sizes[size]}
      $square={square}
      $isIcon={isIcon}
      className={mergeStrings("dgaui dgaui_avatar", className)}
      $index={index}
      $border={border}
      $borderColor={borderColor}
    >
      {children}
    </StyledComponent>
  );
};

export default Avatar;

const positioner = ({ index = 0, op = "-" }) => `
  transform: translateX(${op}${index * 8}px);
`;

const StyledComponent = styled.div<{
  $theme: Theme;
  $size: { wh: number; b: number; f: number; fw: number };
  $square?: boolean;
  $isIcon: boolean;
  $index?: number;
  $border?: boolean;
  $borderColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(p) => p.$size.wh}px;
  height: ${(p) => p.$size.wh}px;
  border: ${(p) =>
    p.$border
      ? `${p.$size.b}px solid ${p.$borderColor}`
      : `${p.$size.b}px solid #fff`};
  background-color: ${(p) => p.$theme.palette.neutral[100]};
  font-size: ${(p) => p.$size.f}px;
  font-weight: ${(p) => p.$size.fw};
  border-radius: ${(p) => (p.$square ? "8px" : "100%")};
  overflow: hidden;
  box-sizing: border-box;

  img {
    width: ${(p) => (p.$isIcon ? p.$size.f * 2 + "px" : "100%")};
    height: ${(p) => (p.$isIcon ? p.$size.f * 2 + "px" : "100%")};
    object-fit: contain;
    border-radius: ${(p) => (p.$square ? "8px" : "100%")};
  }

  &.stacked {
    ${(p) =>
      positioner({
        index: p.$index,
        op: p.$theme.direction === "ltr" ? "-" : "+",
      })}
  }
`;
