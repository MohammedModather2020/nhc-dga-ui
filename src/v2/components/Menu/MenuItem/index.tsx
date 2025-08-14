import React from "react";
import styled from "styled-components";
import useTheme from "../../../../lib/useTheme";
import { mergeStrings } from "../../../../lib/helpers";

interface DGA_MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  icon?: React.ReactNode;
  trailIcon?: React.ReactNode;
  children: React.ReactNode;
}

const MenuItem: React.FC<DGA_MenuItemProps> = ({
  icon,
  trailIcon,
  children,
  disabled,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledComponent
      $theme={theme}
      {...props}
      className={mergeStrings(
        "dgaui dgaui_menuItem" + (disabled ? " disabled" : ""),
        props.className
      )}
      tabIndex={0}
    >
      <div className="itemContent">
        {icon && <div className="icon">{icon}</div>}
        <div className="content">{children}</div>
      </div>
      {trailIcon && <div className="trailIcon">{trailIcon}</div>}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
}>`
  direction: ${(p) => p.$theme.direction};
  min-width: 225px;
  height: 40px;
  padding: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  border-radius: 4px;
  border: 2px solid transparent;

  .itemContent {
    flex: 1;
    display: flex;
    align-items: center;

    .icon {
      margin-inline-end: 8px;
      display: flex;
    }
    .content {
      flex: 1;
      color: ${(p) => p.$theme.textColor};
      font-size: 16px;
    }
  }

  .trailIcon {
    margin-inline-start: 8px;
  }

  &:hover {
    background: ${(p) => p.$theme.palette.neutral[100]};
  }
  &:active {
    background: ${(p) => p.$theme.palette.neutral[200]};
  }
  &:focus {
    border: 2px solid ${(p) => p.$theme.textColor};
  }
  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    .itemContent {
      .content {
        color: ${(p) => p.$theme.palette.neutral[400]};
      }
    }
  }
`;

export default MenuItem;
