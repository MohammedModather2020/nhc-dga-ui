import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../../lib/helpers";
import checkIcon from "../../../assets/images/check.png";

// TODO: Update the import from v2 after refactoring the components
import Menu from "../../../components/Menu";
import Tab from "../../../components/Tab";
import MenuItem from "../../../components/Menu/MenuItem";

interface DGA_PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  currentPage: number;
  size?: Size;
  siblingCount?: number;
  onPageChange?: (pageNumber: number) => void;
  rtl?: boolean;
}

const Pagination: React.FC<DGA_PaginationProps> = ({
  count,
  currentPage,
  siblingCount = 1,
  onPageChange,
  size = "small",
  rtl = false,
  ...props
}) => {
  const onMenuOpen = () => {
    const menus = document.getElementsByClassName("menueItemsContainer");

    for (let i = 0; i < menus.length; i++) {
      menus[i]?.scrollTo(
        0,
        (document.getElementsByClassName("selectedMenueItem")[0] as any)
          ?.offsetTop || 0
      );
    }
  };

  // Hide menu for count larger than 100 pages because it's causing issues when calling scrollTo for very large numbers like 100000 pages
  const menu =
    count <= 1000 ? (
      <Menu
        onOpen={onMenuOpen}
        menuItems={Array(count)
          .fill("")
          .map((_el, index) => (
            <MenuItem
              key={index}
              onClick={() => onPageChange?.(index + 1)}
              trailIcon={
                currentPage === index + 1 ? <img src={checkIcon} /> : undefined
              }
              className={
                currentPage === index + 1 ? "selectedMenueItem" : undefined
              }
            >
              {index + 1}
            </MenuItem>
          ))}
      >
        <Tab size={size}>...</Tab>
      </Menu>
    ) : (
      <Tab size={size}>...</Tab>
    );

  const siblingCountResult = siblingCount * 2 >= count ? 1 : siblingCount;

  const showStartItems =
    siblingCountResult === 1
      ? currentPage <= siblingCountResult * 2 + 1
      : currentPage < siblingCountResult * 2 + 1;

  const showEndItems =
    !showStartItems && currentPage > count - siblingCountResult * 2;

  const showCenterItems = !showStartItems && !showEndItems;
  const showMenuStart = !showStartItems;
  const showMenuEnd = !showEndItems;

  let itemsToRenderCount = 1 + siblingCountResult * 2;

  const startItemsToRender = Array(itemsToRenderCount)
    .fill(0)
    .map((_el, index) => index + 1);

  const centerItemsToRender = Array(itemsToRenderCount)
    .fill(0)
    .map((_el, index) => currentPage - siblingCountResult + index);

  const endItemsToRender = Array(itemsToRenderCount)
    .fill(0)
    .map((_el, index) => count - index)
    .reverse();

  const show5Only = count <= 5;

  return (
    <StyledComponent
      $rtl={rtl}
      {...props}
      className={mergeStrings("dgaui dgaui_pagination", props.className)}
    >
      <Tab
        className="noAfter"
        size={size}
        onClick={() =>
          currentPage > 1 ? onPageChange?.(currentPage - 1) : undefined
        }
      >
        {"<"}
      </Tab>

      {show5Only &&
        Array(count)
          .fill(0)
          .map((_el, index) => index + 1)
          .map((el) => (
            <Tab
              key={el}
              size={size}
              selected={el === currentPage}
              onClick={() => onPageChange?.(el)}
            >
              {el}
            </Tab>
          ))}

      {!show5Only && (
        <>
          {!showStartItems && (
            <Tab
              size={size}
              selected={currentPage === 1}
              onClick={() => onPageChange?.(1)}
            >
              1
            </Tab>
          )}

          {showMenuStart && menu}

          {showStartItems &&
            startItemsToRender.map((el) => (
              <Tab
                key={el}
                size={size}
                selected={el === currentPage}
                onClick={() => onPageChange?.(el)}
              >
                {el}
              </Tab>
            ))}

          {showCenterItems &&
            centerItemsToRender.map((el) => (
              <Tab
                key={el}
                size={size}
                selected={el === currentPage}
                onClick={() => onPageChange?.(el)}
              >
                {el}
              </Tab>
            ))}

          {showMenuEnd && menu}

          {showEndItems &&
            endItemsToRender.map((el) => (
              <Tab
                key={el}
                size={size}
                selected={el === currentPage}
                onClick={() => onPageChange?.(el)}
              >
                {el}
              </Tab>
            ))}

          {!showEndItems && (
            <Tab
              size={size}
              selected={currentPage === count}
              onClick={() => onPageChange?.(count)}
            >
              {count}
            </Tab>
          )}
        </>
      )}

      <Tab
        className="noAfter"
        size={size}
        onClick={() =>
          currentPage < count ? onPageChange?.(currentPage + 1) : undefined
        }
      >
        {">"}
      </Tab>
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $rtl: boolean;
}>`
  direction: ${(p) => (p.$rtl ? "rtl" : "ltr")};
  display: flex;
  align-items: center;

  .dgaui_menuItem {
    min-width: auto;
  }
  .dgaui_tab {
    min-width: auto;
    margin-inline-end: 8px;
    direction: ${(p) => (p.$rtl ? "rtl" : "ltr")};

    &:last-child {
      margin-inline-end: 0;
    }
  }
  .noAfter::after {
    display: none;
  }
`;

export default Pagination;
