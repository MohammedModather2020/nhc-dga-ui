import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import arrowDownIcon from "../../assets/images/chevron.png";
import buttonCloseIcon from "../../assets/images/x.png";
import DropdownItem from "../Dropdown/DropdownItem";
import Tag from "../Tag";

export const sizes = {
  medium: { w: 320, h: 32, p: 16, f: 14 },
  large: { w: 320, h: 40, p: 16, f: 16 },
};

type Variant = "default" | "darker" | "lighter";

const Autocomplete = <T,>({
  label,
  className,
  size,
  variant,
  error,
  onChange,
  value,
  placeholder,
  options,
  getOptionLabel,
  disabled,
  multiple,
  maxTagsToShow,
  maxTagsLabel,
}: {
  label: React.ReactNode;
  className?: string;
  placeholder?: string;
  size?: "large" | "medium";
  variant?: Variant;
  error?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  maxTagsToShow?: number;
  maxTagsLabel?: string;
  value?: T | T[];
  options: T[];
  getOptionLabel?: (option: T) => string;
  onChange?: (e: React.SyntheticEvent, value: T | T[]) => void;
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [inputValueSearch, setInputValueSearch] = React.useState("");
  const [selectedOptions, setSelectedOptions] = React.useState<T[]>();
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

  if (disabled) {
    fontColor = theme.palette.neutral[400];
    border = `1px solid ${theme.palette.neutral[200]}`;
    borderHovered = `1px solid ${theme.palette.neutral[200]}`;
  }

  const getLocalOptionLabel = (op: T) => {
    if (getOptionLabel) return getOptionLabel(op);
    return (op as any)?.label;
  };

  const onItemSelectedHandler = (e: React.SyntheticEvent, newValue: T) => {
    if (multiple) {
      e.stopPropagation();
    }
    // used for selected
    if (multiple && selectedOptions) {
      let newValues: T[] = [];
      // Value already exist, so remove it
      if (selectedOptions.includes(newValue)) {
        const newSelectedOptions = selectedOptions.filter(
          (el) => el !== newValue
        );
        setSelectedOptions(newSelectedOptions);
        newValues = newSelectedOptions;
      }
      // New value selected
      if (!selectedOptions.includes(newValue)) {
        const newSelectedOptions = [...selectedOptions, newValue];
        setSelectedOptions(newSelectedOptions);
        newValues = newSelectedOptions;
      }
      onChange && onChange(e, newValues);
    } else {
      onChange && onChange(e, newValue);
      setSelectedOptions([newValue]);
      const optionLabel = getLocalOptionLabel(newValue);
      setInputValue(optionLabel);
    }
  };

  const deleteTaghandler = (e: React.SyntheticEvent, option: T) => {
    e.stopPropagation();

    if (multiple && selectedOptions) {
      let newValues: T[] = [];
      const newSelectedOptions = selectedOptions.filter((el) => el !== option);
      setSelectedOptions(newSelectedOptions);
      newValues = options.filter((op) => newSelectedOptions.includes(op));
      onChange && onChange(e, newValues);
    }
  };

  const deleteAllTagshandler = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (multiple && selectedOptions) {
      setSelectedOptions([]);
      onChange && onChange(e, []);
    }
  };

  // Search
  const memoizedOptions = React.useMemo(() => {
    let result: T[] = [];

    if (inputValueSearch && options.length > 0) {
      options.forEach((op) => {
        if (
          (getOptionLabel &&
            getOptionLabel(op)
              .toLowerCase()
              .trim()
              .includes(inputValueSearch.toLowerCase().trim())) ||
          (!getOptionLabel &&
            (op as any)?.label
              ?.toLowerCase()
              .trim()
              .includes(inputValueSearch.toLowerCase().trim()))
        ) {
          result.push(op);
        }
      });
    } else {
      result = options;
    }

    return result;
  }, [options, inputValueSearch]);

  const calcPosition = () => {
    if (ref.current) {
      setItemsPosition({
        top: ref.current.offsetTop + ref.current.clientHeight,
        left: ref.current.offsetLeft,
        width: ref.current.clientWidth,
      });
    }
  };

  // Always onBlur in single select only, set the input value to the selected option label if exists
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (multiple) {
      return;
    }

    if (selectedOptions && selectedOptions.length > 0) {
      const optionLabel = getLocalOptionLabel(selectedOptions[0]);
      setInputValue(optionLabel);
    } else {
      setInputValue("");
    }

    setTimeout(() => {
      setInputValueSearch("");
    }, 100);
  };

  // Popover position
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
          setOpen(false);
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

  // Set text input value from props
  React.useEffect(() => {
    if (!value) {
      setInputValue("");
      setInputValueSearch("");
      setSelectedOptions([]);
      setOpen(false);
      return;
    }

    if (!Array.isArray(value)) setInputValue(getLocalOptionLabel(value));

    if (multiple && Array.isArray(value)) {
      setSelectedOptions(value);
    } else {
      setSelectedOptions([value as any]);
    }
  }, [value, options]);

  React.useEffect(() => {
    if (open) {
      calcPosition();
    }
  }, [open, selectedOptions]);

  return (
    <StyledComponent
      $theme={theme}
      className={mergeStrings("dgaui dgaui_autocomplete", className)}
    >
      <label className={disabled ? "disabled" : undefined}>{label}</label>
      <StyledDiv
        ref={ref}
        onClick={() => setOpen((prevState) => !prevState)}
        className={
          "dgaui_dropdownContainer " +
          (multiple ? "multiple " : "") +
          (disabled ? "disabled" : "")
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
        {multiple &&
          (!maxTagsToShow ||
            (maxTagsToShow &&
              selectedOptions &&
              selectedOptions?.length <= maxTagsToShow)) &&
          selectedOptions?.map((op, ind) => (
            <Tag key={ind} rounded size={"medium"} color="neutral">
              {getLocalOptionLabel(op)}
              <button
                className="deleteIcon"
                onClick={(e) => deleteTaghandler(e, op)}
              />
            </Tag>
          ))}

        {multiple &&
          maxTagsToShow &&
          maxTagsToShow > 0 &&
          selectedOptions &&
          selectedOptions?.length > maxTagsToShow && (
            <Tag rounded size={"medium"} color="neutral">
              {maxTagsLabel || `${selectedOptions.length} selected`}
              <button className="deleteIcon" onClick={deleteAllTagshandler} />
            </Tag>
          )}

        <input
          className="dgaui"
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            if (!open) {
              setOpen(true);
            }
            setInputValue(e.target.value);
            setInputValueSearch(e.target.value);
          }}
          onBlur={onBlurHandler}
        />
      </StyledDiv>

      {memoizedOptions?.length > 0 && (
        <div
          className={"items" + (open ? " slide-bottom" : "")}
          style={itemsPosition}
        >
          {memoizedOptions.map((el, index) => {
            if (!el) return null;

            let optionLabel = el as string;
            if (typeof el === "object") {
              optionLabel = (el as any)?.label;
            }

            return (
              <DropdownItem
                key={index}
                value={el}
                onClick={(e, v) => onItemSelectedHandler(e, v)}
                selected={selectedOptions?.includes(el)}
              >
                {getOptionLabel ? getOptionLabel(el) : optionLabel}
              </DropdownItem>
            );
          })}
        </div>
      )}

      <StyledComponentSpan
        $bgColor={animationColor}
        className={"dgaui_autocompleteSeparator" + (open ? " open" : "")}
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

  label {
    margin-bottom: 8px;
    &.disabled {
      color: #9da4ae;
    }
  }

  .items {
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

  &:has(.dgaui_autocompleteSeparator.open) {
    .dgaui_dropdownContainer:before {
      top: 20%;
      transform: rotateZ(180deg);
    }
  }
  &:has(.dgaui_dropdownContainer:active) {
    .dgaui_autocompleteSeparator {
      transform: scaleX(0.5) translateY(-2.5px);
    }
  }
  &:has(.dgaui_dropdownContainer.multiple:active) {
    .dgaui_autocompleteSeparator.open {
      transform: scaleX(1) translateY(-2.5px);
    }
  }
  &:has(.dgaui_dropdownContainer.disabled) {
    .dgaui_autocompleteSeparator {
      opacity: 0;
    }
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
  outline: none;
  direction: ${(props) => props.$customStyle.direction};
  border-radius: 4px;
  height: ${(props) => props.$customStyle.height}px;
  font-size: ${(props) => props.$customStyle.fontSize}px;
  color: ${(props) => props.$customStyle.fontColor};
  border: ${(props) => props.$customStyle.border};
  background-color: ${(props) => props.$customStyle.backgroundColor};
  padding-inline-end: ${(props) => props.$customStyle.padding}px;
  cursor: pointer;

  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:-ms-expand {
    display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
  }

  input {
    background-color: ${(props) => props.$customStyle.backgroundColor};
    border: none;
    outline: none;
    padding-inline-start: ${(props) => props.$customStyle.padding}px;
    height: calc(100% - 2px);
    border-radius: 4px;
    width: 90%;
  }

  &.multiple {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: flex-start;
    min-height: ${(props) => props.$customStyle.height}px;
    height: auto;
    input {
      flex: 1;
      min-height: ${(props) => props.$customStyle.height}px;
    }
    .dgaui_tag {
      margin: 4px;

      .deleteIcon {
        background-image: url(${buttonCloseIcon});
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: center;
        width: 20px;
        height: 20px;
        margin-inline-start: 4px;
        cursor: pointer;
        background-color: transparent;
        border: none;
        outline: none;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  &:before {
    content: url(${arrowDownIcon});
    display: block;
    top: 30%;
    inset-inline-end: 8px;
    position: absolute;
    transition: all 0.1s;
    background-color: ${(props) => props.$customStyle.backgroundColor};
    z-index: 2;
    width: 20px;
    height: 20px;
  }
  &:after {
    content: "";
    display: block;
    top: 0;
    inset-inline-end: 0;
    z-index: 1;
    position: absolute;
    background-color: ${(props) => props.$customStyle.backgroundColor};
    border-radius: 4px;
    width: 30px;
    height: 100%;
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
    filter: grayscale(1);
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

export default Autocomplete;
