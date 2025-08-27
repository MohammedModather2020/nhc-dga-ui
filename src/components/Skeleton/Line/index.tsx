import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../../lib/helpers";
import useTheme from "../../../lib/useTheme";
import "../index.css";

interface DGA_SkeletonLineProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "small";
}

const SkeletonLine: React.FC<DGA_SkeletonLineProps> = ({
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
        "dgaui dgaui_skeletonLine skeletonAnimation",
        props.className
      )}
    />
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $size: "large" | "small";
}>`
  direction: ${(p) => p.$theme.direction};
  height: ${(p) => (p.$size === "large" ? "22px" : "14px")};
  width: 100%;
  border-radius: 8px;
`;

export default SkeletonLine;
