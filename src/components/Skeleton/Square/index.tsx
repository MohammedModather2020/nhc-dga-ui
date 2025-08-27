import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../../lib/helpers";
import useTheme from "../../../lib/useTheme";
import "../index.css";

type Size = "24px" | "48px" | "64px" | "80px" | "120px" | "170px" | "240px";

interface DGA_SkeletonSquareProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

const SkeletonSquare: React.FC<DGA_SkeletonSquareProps> = ({
  size = "120px",
  ...props
}) => {
  const theme = useTheme();

  let borderRadius = 2;
  if (size === "64px" || size === "80px") {
    borderRadius = 4;
  }
  if (size === "170px" || size === "120px") {
    borderRadius = 8;
  }
  if (size === "240px") {
    borderRadius = 16;
  }

  return (
    <StyledComponent
      {...props}
      $theme={theme}
      $size={size}
      $borderRadius={borderRadius}
      className={mergeStrings(
        "dgaui dgaui_skeletonSquare skeletonAnimation",
        props.className
      )}
    />
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $size: Size;
  $borderRadius: number;
}>`
  direction: ${(p) => p.$theme.direction};
  height: ${(p) => p.$size};
  width: ${(p) => p.$size};
  border-radius: ${(p) => p.$borderRadius}px;
`;

export default SkeletonSquare;
