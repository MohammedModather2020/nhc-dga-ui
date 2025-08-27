import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../../lib/helpers";
import useTheme from "../../../lib/useTheme";
import "../index.css";

type Size = "24px" | "48px" | "64px" | "80px" | "120px" | "170px" | "240px";

interface DGA_SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

const SkeletonCircle: React.FC<DGA_SkeletonCircleProps> = ({
  size = "120px",
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      {...props}
      $theme={theme}
      $size={size}
      className={mergeStrings(
        "dgaui dgaui_skeletonCircle skeletonAnimation",
        props.className
      )}
    />
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $size: Size;
}>`
  direction: ${(p) => p.$theme.direction};
  height: ${(p) => p.$size};
  width: ${(p) => p.$size};
  border-radius: 100%;
`;

export default SkeletonCircle;
