import React from "react";
import colors, { ListColor } from "./colors";
import styled, { css } from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";

interface DGA_LinkProps
  extends Omit<React.OlHTMLAttributes<HTMLOListElement>, "type"> {
  color?: AllColorsNames;
  type?: "ol" | "ul" | "icon";
  level?: 1 | 2 | "1" | "2";
  iconUrl?: string;
  children: React.ReactNode;
}

const List: React.FC<DGA_LinkProps> = ({
  children,
  color,
  type = "ol",
  level = 1,
  iconUrl = "",
  ...props
}) => {
  const theme = useTheme();
  const colorNameResult: AllColorsNames = color ?? "primary";
  const selectedColors = colors(theme)[colorNameResult];

  const Result = type === "ol" ? StyledOlComponent : StyledUlComponent;

  return (
    <Result
      $theme={theme}
      $colors={selectedColors}
      $listStyleType={getListStyleType(type, level)}
      {...props}
      className={mergeStrings("dgaui dgaui_list", props.className)}
      type={type === "ol" && +level === 1 ? "1" : "a"}
      $iconUrl={iconUrl}
      $level={+level}
    >
      {children}
    </Result>
  );
};

const StyledUlComponent = styled.ul<{
  $theme: Theme;
  $colors: ListColor;
  $listStyleType?: string;
  $iconUrl?: string;
  $level?: number;
}>`
  ${(p) => getCss(p)};
`;

const StyledOlComponent = styled.ol<{
  $theme: Theme;
  $colors: ListColor;
  $listStyleType?: string;
  $iconUrl?: string;
  $level?: number;
}>`
  ${(p) => getCss(p)};
`;

export default List;

const getCss = (p: {
  $theme: Theme;
  $colors: ListColor;
  $listStyleType?: string;
  $iconUrl?: string;
  $level?: number;
}) => {
  return css`
    direction: ${p.$theme.direction};
    color: ${p.$colors.text};
    font-size: 16px;
    padding-inline-start: ${p.$level === 1 ? 0 : ""};

    ${p.$listStyleType ? "list-style-type: " + p.$listStyleType : ""};
    ${p.$listStyleType === "icon" && p.$iconUrl
      ? css`
          li {
            display: flex;
            align-items: center;
            position: relative;

            &::before {
              content: url(${p.$iconUrl});
              height: 16px;
              width: 16px;
              position: absolute;
              top: 2px;
              inset-inline-start: -24px;
            }
            &::marker {
              content: "";
            }
            img {
            }
          }
        `
      : ""};
  `;
};

const getListStyleType = (
  type: "ol" | "ul" | "icon",
  anyLevel: string | number
) => {
  const level = +anyLevel;

  switch (type) {
    case "ol": {
      if (level === 1) {
        return "1";
      }
      if (level === 2) {
        return "";
      }
      return "";
    }
    case "ul": {
      if (level === 1) {
        return `"-  "`;
      }
      if (level === 2) {
        return "disc";
      }
      return "";
    }
    default: {
      return "icon";
    }
  }
};
