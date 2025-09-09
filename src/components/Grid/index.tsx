import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import useScreenSizes from "../../lib/hooks/useScreenSizes";
import useTheme from "../../lib/useTheme";

interface DGA_GridProps extends HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  sm?: number;
  md?: number;
  lg?: number;
  rowSpacing?: number;
  columnSpacing?: number;
  children: React.ReactNode;
}

const Grid: React.FC<DGA_GridProps> = ({
  container,
  sm,
  md,
  lg,
  rowSpacing = 0,
  columnSpacing = 0,
  children,
  ...props
}) => {
  const theme = useTheme();
  const { isMobile, isTablet, isDesktop } = useScreenSizes();

  const getColumnSpan = () => {
    let result = 12; // Default to full width
    if (isMobile && sm) {
      result = sm;
    }
    if (isTablet) {
      if (md) {
        result = md;
      } else if (sm) {
        result = sm;
      }
    }

    if (isDesktop) {
      if (lg) {
        result = lg;
      } else if (md) {
        result = md;
      } else if (sm) {
        result = sm;
      }
    }
    return result;
  };

  if (container) {
    const newChildren = addSpacingPropsToChidren(
      children,
      columnSpacing,
      rowSpacing
    );

    return (
      <StyledComponentContainer
        {...props}
        $theme={theme}
        $rowSpacing={rowSpacing}
        $columnSpacing={columnSpacing}
        className={mergeStrings("dgaui dgaui_gridContainer", props.className)}
      >
        {newChildren}
      </StyledComponentContainer>
    );
  }

  return (
    <StyledComponentItem
      {...props}
      $theme={theme}
      $columnSpan={getColumnSpan()}
      $columnSpacing={columnSpacing}
      className={mergeStrings("dgaui dgaui_gridItem", props.className)}
    >
      {children}
    </StyledComponentItem>
  );
};

const StyledComponentContainer = styled.div<{
  $theme: Theme;
  $columnSpacing: number;
  $rowSpacing: number;
}>`
  direction: ${(p) => p.$theme.direction};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${(p) => p.$rowSpacing}px ${(p) => p.$columnSpacing}px;
`;

const StyledComponentItem = styled.div<{
  $theme: Theme;
  $columnSpan: number;
  $columnSpacing: number;
}>`
  direction: ${(p) => p.$theme.direction};
  grid-column: span ${(p) => p.$columnSpan};
`;

export default Grid;

// a function that take children and return new children with columnSpacing and rowSpacing props, and if a child is a fragment, it should recursivly call itself on the children of the fragment
const addSpacingPropsToChidren = (
  children: React.ReactNode,
  columnSpacing: number,
  rowSpacing: number
): React.ReactNode => {
  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return addSpacingPropsToChidren(
          child.props.children,
          columnSpacing,
          rowSpacing
        );
      } else {
        return React.cloneElement(child, { columnSpacing, rowSpacing } as any);
      }
    }

    return child;
  });

  return newChildren;
};
