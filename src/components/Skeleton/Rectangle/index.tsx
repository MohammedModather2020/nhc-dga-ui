import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../../lib/helpers";
import useTheme from "../../../lib/useTheme";
import "../index.css";

interface DGA_SkeletonRectangleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "medium" | "small";
}

const SkeletonRectangle: React.FC<DGA_SkeletonRectangleProps> = ({
  size = "large",
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      {...props}
      $theme={theme}
      $size={size}
      className={mergeStrings(
        "dgaui dgaui_skeletonRectangle skeletonAnimation",
        props.className
      )}
    />
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $size: "large" | "medium" | "small";
}>`
  direction: ${(p) => p.$theme.direction};
  height: ${(p) => (p.$size === "large" ? "40px" : p.$size === "medium" ? "32px" : "24px")};
  width: 100%;
  border-radius: 4px;
`;

export default SkeletonRectangle;
