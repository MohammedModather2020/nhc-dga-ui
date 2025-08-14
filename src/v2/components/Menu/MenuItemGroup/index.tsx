import React from "react";
import styled from "styled-components";
import useTheme from "../../../../lib/useTheme";
import { mergeStrings } from "../../../../lib/helpers";

interface DGA_MenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  children: React.ReactNode;
}

const MenuItemGroup: React.FC<DGA_MenuItemProps> = ({
  title,
  children,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $theme={theme}
      {...props}
      className={mergeStrings("dgaui dgaui_menuItemGroup", props.className)}
      tabIndex={0}
    >
      <div className="groupTitle">{title}</div>
      {children}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
}>`
  direction: ${(p) => p.$theme.direction};
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 8px;
  margin-bottom: 8px;

  &:last-child {
    border-bottom: none;
  }

  .groupTitle {
    font-size: 12px;
    font-weight: 700;
    color: ${(p) => p.$theme.palette.neutral[800]};
    margin-bottom: 12px;
    padding: 8px;
    padding-bottom: 0;
  }
`;

export default MenuItemGroup;
