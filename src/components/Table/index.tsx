import React from "react";
import styled from "styled-components";
import { mergeStrings } from "../../lib/helpers";
import useTheme from "../../lib/useTheme";
import Checkbox from "../Checkbox";

const Table = <T,>({
  contained,
  compact,
  alternatingRows,
  selectable,
  className,
  labels,
  values,
  onRowClick,
  onCheck,
  responsiveThreshold,
  columnDivider,
  lastColumnWidthMultiply,
}: {
  contained?: boolean;
  compact?: boolean;
  alternatingRows?: boolean;
  selectable?: boolean;
  className?: string;
  labels: Record<string, any>;
  values: T[];
  onRowClick?: (row: T) => void;
  onCheck?: (rows: T[]) => void;
  responsiveThreshold?: number;
  columnDivider?: boolean;
  lastColumnWidthMultiply?: number;
}) => {
  const theme = useTheme();
  const [selectAllValue, setSelectAllValue] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const onSelectAllValueChangedHandler = (
    _e: React.SyntheticEvent,
    newValue: boolean
  ) => {
    setSelectAllValue(newValue);

    if (onCheck) {
      let newCheckedValues: T[] = [];

      if (newValue) {
        newCheckedValues = values.map((el) => {
          return { ...el, selected: true };
        });
      } else {
        newCheckedValues = values.map((el) => {
          return { ...el, selected: false };
        });
      }

      onCheck(newCheckedValues);
    }
  };

  const onRowCheckedHandler = (item: T) => {
    onCheck?.(
      values.map((el) => {
        if (el === item) {
          return { ...el, selected: !(el as any)?.selected };
        }
        return el;
      })
    );
  };

  React.useEffect(() => {
    if (selectable) {
      let allSelected = true;
      values.forEach((el) => {
        if (!(el as any)?.selected) {
          allSelected = false;
        }
      });

      setSelectAllValue(allSelected);
    }
  }, [values]);

  React.useEffect(() => {
    const resizeHandler = () =>
      setIsMobile(window.innerWidth <= (responsiveThreshold || 768));
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  if (isMobile) {
    return (
      <MobileStyledComponent
        $theme={theme}
        $compact={compact}
        $contained={contained}
        $alternatingRows={alternatingRows}
        $onRowClick={!!onRowClick}
        className={mergeStrings("dgaui dgaui_table", className)}
      >
        {values.map((item, index) => {
          const checked = (item as any)?.selected;
          const checkedClassName = checked ? "checked " : "";

          return (
            <div
              key={index}
              className={"mobileRow " + checkedClassName}
              onClick={(e: React.SyntheticEvent) => {
                if (!(e.target instanceof HTMLElement)) return;

                const nodeName = e.target.nodeName;
                // Don't fire onRowClick if target is checkbox
                if (nodeName === "DIV") {
                  onRowClick?.(item);
                }
              }}
            >
              {selectable && (
                <div className="cell selectable">
                  <Checkbox
                    size={compact ? "small" : "medium"}
                    value={checked}
                    onChange={() => onRowCheckedHandler(item)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {Object.keys(labels)
                .filter((key) => !!labels[key])
                .map((key, sIndex) => (
                  <div key={sIndex} className={"mobileRowContainer"}>
                    <div className="cell label">{labels[key]}</div>
                    <div
                      className={
                        "cell value " +
                        (alternatingRows
                          ? (sIndex + 1) % 2 === 0
                            ? "even"
                            : "odd"
                          : "")
                      }
                    >
                      {(item as any)[key]}
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </MobileStyledComponent>
    );
  }

  return (
    <StyledComponent
      $theme={theme}
      $compact={compact}
      $contained={contained}
      $alternatingRows={alternatingRows}
      $onRowClick={!!onRowClick}
      className={mergeStrings(
        "dgaui dgaui_table" + (columnDivider ? " columnDivider" : ""),
        className
      )}
      cellPadding={0}
      cellSpacing={0}
    >
      <thead>
        <tr>
          {selectable && (
            <th className="selectable">
              <Checkbox
                value={selectAllValue}
                onChange={onSelectAllValueChangedHandler}
              />
            </th>
          )}
          {Object.keys(labels as any)
            .filter((key) => !!labels[key])
            .map((key, index) => (
              <th
                key={index}
                style={{
                  flex:
                    lastColumnWidthMultiply &&
                    index === Object.keys(labels).length - 1
                      ? lastColumnWidthMultiply
                      : undefined,
                }}
              >
                {(labels as any)[key]}
              </th>
            ))}
        </tr>
      </thead>

      {values && values.length > 0 && (
        <tbody>
          {values.map((item, index) => {
            const checked = (item as any)?.selected;
            const trClassName = checked ? "checked " : "";

            return (
              <tr
                key={index}
                onClick={(e: React.SyntheticEvent) => {
                  if (!(e.target instanceof HTMLElement)) return;

                  const nodeName = e.target.nodeName;
                  // Don't fire onRowClick if target is checkbox
                  if (nodeName === "TR" || nodeName === "TD") {
                    onRowClick?.(item);
                  }
                }}
                className={
                  trClassName +
                  (alternatingRows
                    ? (index + 1) % 2 === 0
                      ? "even"
                      : "odd"
                    : "")
                }
              >
                {selectable && (
                  <td className="selectable">
                    <Checkbox
                      value={checked}
                      onChange={() => onRowCheckedHandler(item)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {Object.entries(item as any).filter((key) => !!labels[key[0]]).map(
                  ([key, value], itemIndex) =>
                    (labels as any)[key] && (
                      <td
                        key={key}
                        style={{
                          flex:
                            lastColumnWidthMultiply &&
                            itemIndex === Object.keys(labels).length - 1
                              ? lastColumnWidthMultiply
                              : undefined,
                        }}
                      >
                        {value as any}
                      </td>
                    )
                )}
              </tr>
            );
          })}
        </tbody>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.table<{
  $theme: Theme;
  $contained?: boolean;
  $compact?: boolean;
  $alternatingRows?: boolean;
  $onRowClick?: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  width: 100%;
  overflow: hidden;
  transition: background-color 0.2s;

  ${(p) =>
    p.$contained
      ? `border: 1px solid ${p.$theme.palette.neutral[400]}; border-radius: 8px;`
      : ""}

  tr {
    display: flex;
    &.even {
      background-color: ${(p) => p.$theme.palette.neutral[50]};
    }
    &.checked {
      background-color: ${(p) => p.$theme.palette.primary[50]};
    }

    &:hover {
      ${(p) =>
        p.$onRowClick
          ? `background-color: ${p.$theme.palette.neutral[25]};`
          : ""}

      &.even {
        ${(p) =>
          p.$onRowClick
            ? `background-color: ${p.$theme.palette.neutral[100]};`
            : ""}

        &:active {
          background-color: ${(p) => p.$theme.palette.primary[25]};
        }
      }

      &.checked {
        background-color: ${(p) => p.$theme.palette.primary[50]};

        &:active {
          background-color: ${(p) => p.$theme.palette.primary[25]};
        }
      }
    }

    border-end-start-radius: ${(p) => (p.$contained ? 8 : 0)}px;
    border-end-end-radius: ${(p) => (p.$contained ? 8 : 0)}px;

    &:last-child {
      td {
        border-bottom: ${(p) =>
          p.$contained ? "none" : `1px solid ${p.$theme.palette.neutral[300]}`};
      }
    }

    &:active {
      background-color: ${(p) => p.$theme.palette.primary[25]};
    }
  }

  th,
  td {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    box-sizing: border-box;

    &.selectable {
      flex: none;
    }
  }

  th {
    background-color: ${(p) => p.$theme.palette.neutral[100]};
    border-inline-end: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    border-bottom: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    border-top: 1px solid
      ${(p) => (p.$contained ? 0 : p.$theme.palette.neutral[300])};
    color: ${(p) => p.$theme.palette.neutral[700]};
    font-size: 12px;
    font-weight: 500;
    height: 48px;
    padding: 0 16px;

    &:first-child {
      border-start-start-radius: ${(p) => (p.$contained ? 8 : 0)}px;
    }

    &:last-child {
      border-start-end-radius: ${(p) => (p.$contained ? 8 : 0)}px;
      border-inline-end: none;
    }
  }

  td {
    flex: 1;
    padding: 0 16px;
    height: ${(p) => (p.$compact ? 48 : 64)}px;
    border-bottom: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    ${(p) => (p.$onRowClick ? "cursor: pointer;" : "")}

    &.selectable {
      border-inline-end: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    }
  }

  &.columnDivider {
    td {
      border-inline-end: 1px solid ${(p) => p.$theme.palette.neutral[300]};
      &:last-child {
        border-inline-end: none;
      }
    }
  }
`;

const MobileStyledComponent = styled.div<{
  $theme: Theme;
  $contained?: boolean;
  $compact?: boolean;
  $alternatingRows?: boolean;
  $onRowClick?: boolean;
}>`
  direction: ${(p) => p.$theme.direction};
  width: 100%;
  transition: background-color 0.2s;

  .mobileRow {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    width: 100%;
    ${(p) =>
      p.$contained
        ? `border-left: 1px solid ${p.$theme.palette.neutral[300]};border-right: 1px solid ${p.$theme.palette.neutral[300]};`
        : ""}

    .cell {
      height: ${(p) => (p.$compact ? 30 : 36)}px;
      padding: 0 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: ${(p) => (p.$compact ? 10 : 12)}px;
    }

    .mobileRowContainer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      overflow: hidden;
      box-sizing: border-box;
      border-top: 1px solid ${(p) => p.$theme.palette.neutral[300]};

      &:last-child {
        border-bottom: 1px solid ${(p) => p.$theme.palette.neutral[300]};
      }

      .label {
        flex: 1;
        background-color: ${(p) => p.$theme.palette.neutral[100]};
        border-inline-end: 1px solid ${(p) => p.$theme.palette.neutral[300]};
        color: ${(p) => p.$theme.palette.neutral[700]};
        font-weight: 600;
      }
      .value {
        flex: 2;

        &.even {
          background-color: ${(p) => p.$theme.palette.neutral[50]};
        }
      }
    }

    &.checked {
      background-color: ${(p) => p.$theme.palette.primary[50]};
      .mobileRowContainer .even {
        background-color: ${(p) => p.$theme.palette.primary[50]};
      }
      .selectable {
        background-color: ${(p) => p.$theme.palette.primary[50]};
      }
    }

    .selectable {
      border-top: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    }
  }
`;

export default Table;
