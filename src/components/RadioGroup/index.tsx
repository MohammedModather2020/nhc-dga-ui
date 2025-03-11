import React from "react";
import Radio, { DGA_RadioProps } from "../Radio";
import { generateUniqueId } from "../../lib/helpers";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";

interface DGA_RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange?: (event: React.SyntheticEvent, value: any) => void;
  children: React.ReactElement<typeof Radio>[];
  name?: string;
  value?: any;
  layout?: "vertiaval" | "horizontal";
}

const RadioGroup: React.FC<DGA_RadioGroupProps> = ({
  onChange,
  name,
  value,
  layout,
  children,
  ...props
}) => {
  const theme = useTheme();

  const groupName = name ? name : generateUniqueId();

  const newChildren = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      onChange,
      name: groupName,
      id: groupName + "_" + index,
      groupValue: value,
    } as DGA_RadioProps as any)
  );

  return (
    <StyledComponent
      className={`dgaui dgaui_radioGroup_${layout ?? "horizontal"}`}
      $direction={theme.direction}
      {...props}
    >
      {newChildren}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{ $direction: string }>`
  direction: ${(p) => p.$direction};
  &.dgaui_radioGroup_vertiaval {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .dgaui_radioContainer {
      margin-bottom: 32px;
    }
  }

  &.dgaui_radioGroup_horizontal {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .dgaui_radioContainer {
      margin-inline-end: 32px;
    }
  }

  .dgaui_radio {
    position: absolute !important;
  }

  .dgaui_radioLabel {
    margin-inline-start: 40px;
  }
`;

export default RadioGroup;
