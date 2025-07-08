import React from "react";
import styled from "styled-components";
import useTheme from "../../../lib/useTheme";
import { mergeStrings } from "../../../lib/helpers";
import getLoadingColors from "./colors";

type DGA_LoadingSize =
  | "xxSmall"
  | "xSmall"
  | "small"
  | "medium"
  | "large"
  | "xLarge"
  | "xxLarge";

export const sizes: { [k in DGA_LoadingSize]: { wh: number; b: number } } = {
  xxSmall: { wh: 20, b: 2 },
  xSmall: { wh: 24, b: 2 },
  small: { wh: 28, b: 2 },
  medium: { wh: 32, b: 3 },
  large: { wh: 36, b: 3 },
  xLarge: { wh: 40, b: 3 },
  xxLarge: { wh: 44, b: 4 },
};

interface FGA_LoadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  style?: "primary" | "neutral" | "on-color";
  size?: DGA_LoadingSize;
  className?: string;
  loadingStyle?: React.CSSProperties;
}

const Loading: React.FC<FGA_LoadingProps> = ({
  style = "primary",
  size = "medium",
  className,
  loadingStyle,
  ...props
}) => {
  const theme = useTheme();

  let styleResult: "primary" | "neutral" | "on-color" = style
    ? style
    : "primary";
  let sizeResult: DGA_LoadingSize = size ? size : "medium";
  const loadingColors = getLoadingColors(theme);

  return (
    <StyledComponent
      {...props}
      $theme={theme}
      $customStyle={{
        color: loadingColors[styleResult],
        size: sizes[sizeResult],
      }}
      className={mergeStrings("dgaui dgaui_loading", className)}
    />
  );
};

export default Loading;

const StyledComponent = styled.div<{
  $theme: Theme;
  $customStyle: {
    color: string;
    size: { wh: number; b: number };
  };
}>`
  width: ${(p) => p.$customStyle.size.wh}px;
  height: ${(p) => p.$customStyle.size.wh}px;
  border: ${(p) => p.$customStyle.size.b}px solid
    ${(p) => p.$theme.palette.neutral[100]};
  border-bottom-color: ${(p) => p.$customStyle.color};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
