import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import { COLORS } from "../../lib/constants";
import useTheme from "../../lib/useTheme";

type DividerColor = "neutral" | "alphaWhite" | "white" | "primary";

interface DGA_DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  color?: DividerColor;
  lineType?: "horizontal" | "vertical";
}

const Divider: React.FC<DGA_DividerProps> = ({
  color,
  lineType = "horizontal",
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      {...props}
      $theme={theme}
      $color={color}
      $lineType={lineType}
      className={mergeStrings("dgaui dgaui_divider", props.className)}
    />
  );
};

const StyledComponent = styled.hr<{
  $theme: Theme;
  $color?: DividerColor;
  $lineType: "horizontal" | "vertical";
}>`
  outline: none;
  border: none;
  ${(p) => p.$lineType === "vertical" && "height: 100%; width: 1px;"}
  ${(p) => p.$lineType === "horizontal" && "height: 1px; width: 100%;"}
  
  ${(p) => p.$color === "neutral" && "background-color: #D2D6DB;"}
  ${(p) =>
    p.$color === "primary" &&
    `background-color: ${p.$theme.palette.primary[600]};`}
  ${(p) => p.$color === "alphaWhite" && `background-color: ${COLORS.white30};`}
  ${(p) => p.$color === "white" && `background-color: ${COLORS.white};`}
`;

export default Divider;
