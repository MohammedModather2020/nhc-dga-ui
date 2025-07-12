import React from "react";
import useTheme from "../../../lib/useTheme";
import styled from "styled-components";
import { mergeStrings } from "../../../lib/helpers";
import Avatar, { DGA_AvatarProps } from "../Avatar";

type DGA_AvatarGroupProps = {
  stacked?: boolean;
  className?: string;
  children: React.ReactElement<typeof Avatar>[];
};

const AvatarGroup: React.FC<DGA_AvatarGroupProps> = ({
  stacked,
  className,
  children,
}) => {
  const theme = useTheme();

  const newChildren = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      className: stacked ? "stacked" : "",
      index,
    } as DGA_AvatarProps as any)
  );

  return (
    <StyledComponent
      $theme={theme}
      $stacked={stacked}
      className={mergeStrings("dgaui dgaui_avatarGroup", className)}
    >
      {newChildren}
    </StyledComponent>
  );
};

export default AvatarGroup;

const StyledComponent = styled.div<{
  $theme: Theme;
  $stacked?: boolean;
}>`
  display: flex;
  flex-direction: ${(p) =>
    p.$theme.direction === "ltr" ? "row" : "row-reverse"};
`;
