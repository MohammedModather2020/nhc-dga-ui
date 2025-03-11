import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import Tab, { DGA_TabProps } from "../Tab";

interface DGA_TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: (React.ReactNode | React.ReactElement<typeof Tab>)[];
  size?: Size;
  flush?: boolean;
  vertical?: boolean;
}

const TabList: React.FC<DGA_TagProps> = ({
  children,
  size = "large",
  flush,
  vertical = false,
  ...props
}) => {
  const theme = useTheme();

  // If
  const newChildren = addPropsToChidren(children, size, vertical);

  return (
    <StyledComponent
      {...props}
      className={mergeStrings("dgaui dgaui_tabList", props.className)}
      $theme={theme}
      $flush={flush}
      $vertical={vertical}
    >
      {newChildren}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $flush?: boolean;
  $vertical?: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  display: flex;
  position: relative;
  ${(p) => (p.$vertical ? "flex-direction: column;" : "")};

  &::after {
    content: "";
    display: ${(p) => (p.$vertical ? "none" : "block")};
    position: absolute;
    height: 3px;
    width: 100%;
    border-radius: 10px;
    bottom: 0;
    left: 0;
    background: ${(p) => p.$theme.palette.neutral[300]};
    z-index: 1;
  }

  .dgaui_tab {
    border: none;
    &:focus {
      border: none;
    }
    &::after {
      ${(p) => (!p.$vertical ? "bottom: 0;" : "")};
      ${(p) => (p.$flush && !p.$vertical ? "width: 100%;" : "")}
      ${(p) => (p.$flush && p.$vertical ? "height: 100%;" : "")}
    }
  }
`;

export default TabList;

// a function that take children and return new children with size and vertical props, and if a child is a fragment, it should recursivly call itself on the children of the fragment
const addPropsToChidren = (
  children: React.ReactNode,
  size: Size,
  vertical: boolean
): React.ReactNode => {
  const newChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        return addPropsToChidren(child.props.children, size, vertical);
      } else {
        return React.cloneElement(child, { size, vertical } as any);
      }
    }

    return child;
  });

  return newChildren;
};
