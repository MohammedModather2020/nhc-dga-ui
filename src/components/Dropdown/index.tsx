import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import arrowDownIcon from "../../assets/images/chevron.png";
import arrowDownIconGray from "./chevronGray.png";
import DropdownItem, { DGA_DropdownItemProps } from "./DropdownItem";

export const sizes = {
  medium: { w: 320, h: 32, p: 16, f: 14 },
  large: { w: 320, h: 40, p: 16, f: 16 },
};

type Variant = "default" | "darker" | "lighter";

interface DGA_DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: React.ReactNode;
  className?: string;
  name?: string;
  placeholder?: string;
  size?: "large" | "medium";
  variant?: Variant;
  error?: boolean;
  disabled?: boolean;
  value?: any;
  valueDisplay?: any;
  onChange?: (e: React.SyntheticEvent, value: any) => void;
  onOpen?: Function;
  multiple?: boolean;
  children: (React.ReactElement<typeof DropdownItem> | null | false)[];
}

const Dropdown: React.FC<DGA_DropdownProps> = ({
  label,
  size,
  variant,
  placeholder,
  error,
  onChange,
  onOpen,
  value,
  valueDisplay,
  children,
  name,
  multiple,
  ...props
}) => {
  const theme = useTheme();
  const [selectedOptionText, setSelectedOptionText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [itemsPosition, setItemsPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const ref = React.useRef<HTMLDivElement>(null);

  const sizeResult: "large" | "medium" = size ?? "large";

  // Default
  let fontColor = theme.textColor;
  let placeholderFontColor = theme.palette.neutral[500];
  let border = `1px solid ${
    error ? theme.palette.error[700] : theme.palette.neutral[400]
  }`;
  let borderHovered = `1px solid ${
    error ? theme.palette.error[700] : theme.palette.neutral[700]
  }`;
  let borderFocused = `1px solid ${
    error ? theme.palette.error[700] : theme.palette.neutral[700]
  }`;
  let backgroundColor = "#FFF";
  let animationColor = error ? theme.palette.error[700] : theme.textColor;
  let shadowFocus = theme.elevation.shadows.md;

  if (variant === "lighter") {
    backgroundColor = theme.palette.neutral[25];
    border = "1px solid transparent";
    borderHovered = `1px solid ${theme.palette.neutral[400]}`;
    borderFocused = `1px solid ${theme.palette.neutral[400]}`;
  }
  if (variant === "darker") {
    backgroundColor = theme.palette.neutral[100];
  }

  if (props.disabled) {
    fontColor = theme.palette.neutral[400];
    border = `1px solid ${theme.palette.neutral[200]}`;
    borderHovered = `1px solid ${theme.palette.neutral[200]}`;
  }

  const calcPosition = () => {
    if (ref.current) {
      setItemsPosition({
        top: ref.current.offsetTop + ref.current.clientHeight,
        left: ref.current.offsetLeft,
        width: ref.current.clientWidth,
      });
    }
  };

  const onChangeHandler = (e: React.SyntheticEvent, newValue: any) => {
    if (!multiple) {
      onChange?.(e, newValue);
    }

    if (multiple) {
      let newValues = [];
      if (value && Array.isArray(value) && value.includes(newValue)) {
        newValues = value.filter((v: any) => v !== newValue);
      } else {
        newValues = [...(value || []), newValue];
      }
      onChange?.(e, newValues);
    }
  };

  const newChildren = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(child, {
        ...child.props,
        onClick: onChangeHandler,
        selected:
          (child.props as unknown as DGA_DropdownItemProps)?.selected ||
          value === (child.props as unknown as DGA_DropdownItemProps)?.value ||
          (Array.isArray(value) &&
            value.includes(
              (child.props as unknown as DGA_DropdownItemProps).value
            )),
        multiple,
      } as DGA_DropdownItemProps as any);
    }
  });

  React.useEffect(() => {
    let newSelectedOptionText = "";

    if (multiple) {
      newChildren?.map((comp) => {
        if ((comp.props as any as DGA_DropdownItemProps).selected) {
          newSelectedOptionText = newSelectedOptionText.concat(
            ((comp.props as any as DGA_DropdownItemProps).children as string) +
              ", "
          );
        }
      });
      // Remove the last comma and space
      newSelectedOptionText = newSelectedOptionText.slice(
        0,
        newSelectedOptionText.length - 2
      );
    } else {
      newChildren?.map((comp) => {
        if ((comp.props as any as DGA_DropdownItemProps).selected) {
          newSelectedOptionText = (comp.props as any as DGA_DropdownItemProps)
            .children as string;
        }
      });
    }

    setSelectedOptionText(newSelectedOptionText);
  }, [newChildren, value]);

  // popover
  React.useEffect(() => {
    if (ref.current) {
      const resizeHandler = () => {
        if (ref.current) {
          calcPosition();
        }
      };

      const clickHandler = (e: MouseEvent) => {
        // Clicked outside
        if (!ref.current?.contains(e.target as any)) {
          // Close dropdown if clicked outside Only if not multiple
          // If multiple, close only if clicked outside the dropdown items
          if (
            !multiple ||
            (multiple &&
              e.target &&
              (e.target as any).classList &&
              !(e.target as any).classList.contains("dgaui_dropdownItem"))
          ) {
            setOpen(false);
          }
        }
      };

      window.addEventListener("resize", resizeHandler);
      window.addEventListener("click", clickHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener("click", clickHandler);
      };
    }
  }, [ref]);

  // popover positioner
  React.useEffect(() => {
    if (open) {
      calcPosition();
    }
    if (open && onOpen) {
      onOpen();
    }
  }, [open, onOpen]);

  return (
    <StyledComponent
      $theme={theme}
      className={mergeStrings("dgaui dgaui_dropdown", props.className)}
      {...props}
    >
      {label && (
        <label className={props.disabled ? "disabled" : undefined}>
          {label}
        </label>
      )}
      <StyledDiv
        ref={ref}
        onClick={() => setOpen((prevState) => !prevState)}
        className={
          "dgaui_dropdownContainer " + (props.disabled ? "disabled" : "")
        }
        $customStyle={{
          theme,
          direction: theme.direction,
          minWidth: sizes[sizeResult].w,
          height: sizes[sizeResult].h,
          padding: sizes[sizeResult].p,
          fontSize: sizes[sizeResult].f,
          placeholderFontColor,
          fontColor,
          border,
          borderHovered,
          borderFocused,
          backgroundColor,
          shadowFocus,
        }}
      >
        {placeholder && !valueDisplay && !selectedOptionText && (
          <div className="placeholder">{placeholder}</div>
        )}
        <div className="valueDisplay">{valueDisplay || selectedOptionText}</div>
      </StyledDiv>

      <div
        className={"dgaui_dropdownItems" + (open ? " slide-bottom" : "")}
        style={{ ...itemsPosition }}
      >
        {newChildren}
      </div>

      <StyledComponentSpan
        $bgColor={animationColor}
        className={"dgaui_dropdownSeparator" + (open ? " open" : "")}
      />
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{ $theme: Theme }>`
  direction: ${(p) => p.$theme.direction};
  display: flex;
  flex-direction: column;
  color: ${(p) => p.$theme.textColor};
  width: 100%;
  cursor: pointer;

  label {
    text-align: start;
    margin-bottom: 8px;
    &.disabled {
      color: #9da4ae;
    }
  }

  .dgaui_dropdownItems {
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 1400;
    background-color: #fff;
    width: 100%;
    opacity: 0;
    max-height: 300px;
    overflow-y: scroll;
    pointer-events: none;
    border: 1px solid ${(p) => p.$theme.palette.neutral[300]};
    border-radius: 4px;
    padding: 8px;
    box-sizing: border-box;
    ${(p) => p.$theme.elevation.shadows.xl}
    cursor: pointer;

    &.slide-bottom {
      animation: slide-bottom 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      pointer-events: all;
    }
    @keyframes slide-bottom {
      0% {
        transform: translateZ(0) translateY(0);
        opacity: 0;
      }
      100% {
        transform: translateZ(160px) translateY(8px);
        opacity: 1;
      }
    }
  }

  &:has(.dgaui_dropdownSeparator.open) {
    .dgaui_dropdownContainer:before {
      top: 20%;
      transform: rotateZ(180deg);
    }
  }
  &:has(.dgaui_dropdownContainer:active) {
    .dgaui_dropdownSeparator {
      transform: scaleX(0.5) translateY(-2.5px);
    }
  }
  &:has(.dgaui_dropdownContainer:disabled) {
    .dgaui_dropdownSeparator {
      opacity: 0;
    }
  }

  .dgaui_checkboxContainer {
    pointer-events: none;
  }
`;

const StyledDiv = styled.div<{
  $customStyle: {
    theme: Theme;
    direction: string;
    minWidth: number;
    height: number;
    padding: number;
    fontSize: number;
    fontColor: string;
    border: string;
    shadowFocus: string;
    placeholderFontColor: string;
    borderHovered: string;
    borderFocused: string;
    backgroundColor: string;
  };
}>`
  box-sizing: border-box;
  outline: none;
  direction: ${(props) => props.$customStyle.direction};
  border-radius: 4px;
  width: 100%;
  height: ${(props) => props.$customStyle.height}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  border: ${(props) => props.$customStyle.border};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  padding: 0 ${(props) => props.$customStyle.padding}px;
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:-ms-expand {
    display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
  }

  .valueDisplay {
    height: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    width: 80%;
    text-overflow: ellipsis;

    /* vertical middle align */
    line-height: ${(props) => props.$customStyle.height}px;
  }

  .placeholder {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    color: ${(p) => p.$customStyle.theme.palette.neutral[400]};
    font-size: 16px;
  }

  &:before {
    content: url(${arrowDownIcon});
    display: block;
    top: 30%;
    inset-inline-end: 8px;
    position: absolute;
    transition: all 0.1s;
    width: 20px;
    height: 20px;
  }

  &:focus-within {
    ${(props) => props.$customStyle.shadowFocus};
    border: ${(props) => props.$customStyle.borderFocused};
  }

  &:hover {
    border: ${(props) => props.$customStyle.borderHovered};
  }
  &.disabled {
    pointer-events: none;
    &:before {
      content: url(${arrowDownIconGray});
    }
  }
`;

const StyledComponentSpan = styled.span<{ $bgColor: string }>`
  height: 2px;
  background: ${(props) => props.$bgColor};
  display: block;
  transform: scaleX(0) translateY(-2.5px);
  transform-origin: 50%;
  transition: all 0.2s;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  z-index: 1;

  &.open {
    transform: scaleX(0.995) translateY(-2.5px);
  }
`;

export default Dropdown;
