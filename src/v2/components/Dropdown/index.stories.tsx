import { Meta, StoryObj } from "@storybook/react";
import Dropdown, { sizes } from ".";
import withRtl from "../../../lib/RTL";
import DropdownItem from "./DropdownItem";
import React from "react";

const meta = {
  title: "DGAUI/v2/Select/Dropdown",
  component: Dropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
    state: {
      options: [
        "default",
        "hovered",
        "pressed",
        "focused",
        "read-only",
        "disabled",
      ],
      control: { type: "radio" },
      table: { defaultValue: { summary: "default" } },
    },
    variant: {
      options: ["default", "filled", "filled-darker", "filled-lighter"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "default" } },
    },
    filled: {
      control: { type: "boolean" },
      table: { defaultValue: { summary: "false" } },
    },
    error: {
      control: { type: "boolean" },
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    size: "large",
    label: "Label",
    state: "default",
    variant: "default",
    filled: false,
    error: false,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

// Stories
type Story = StoryObj<typeof Dropdown>;

export const Default = (args: any) => {
  const [value, setValue] = React.useState(100);

  return (
    <Dropdown
      label="Label"
      value={value}
      valueDisplay={`${value} $`}
      onChange={(_e, v) => setValue(v)}
      {...args}
      style={{ width: 200 }}
    >
      <DropdownItem value={100}>Option 1</DropdownItem>
      <DropdownItem value={200}>Option 2</DropdownItem>
      <DropdownItem value={300}>Option 3</DropdownItem>
    </Dropdown>
  );
};

export const Multiple = (args: any) => {
  const [value, setValue] = React.useState([200, 300, 100]);

  return (
    <Dropdown
      value={value}
      onChange={(_e, v) => setValue(v)}
      {...args}
      label="Multiple values"
      style={{ width: 200 }}
      multiple
    >
      <DropdownItem value={100}>Option 1</DropdownItem>
      <DropdownItem value={200}>Option 2</DropdownItem>
      <DropdownItem value={300}>Option 3</DropdownItem>
    </Dropdown>
  );
};

export const Filled = (args: any) => {
  const [value, setValue] = React.useState(200);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Dropdown
        label="Not Filled"
        value={value}
        onChange={(_e, v) => setValue(v)}
        filled={false}
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Filled"
        value={value}
        onChange={(_e, v) => setValue(v)}
        filled={true}
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>
    </div>
  );
};

export const WithVariants = (args: any) => {
  const [value, setValue] = React.useState(200);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Dropdown
        label="Default Style"
        value={value}
        onChange={(_e, v) => setValue(v)}
        variant="default"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Filled Style"
        value={value}
        onChange={(_e, v) => setValue(v)}
        variant="filled"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Filled Darker"
        value={value}
        onChange={(_e, v) => setValue(v)}
        variant="filled-darker"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Filled Lighter"
        value={value}
        onChange={(_e, v) => setValue(v)}
        variant="filled-lighter"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>
    </div>
  );
};
export const WithStates = (args: any) => {
  const [value, setValue] = React.useState(200);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Dropdown
        label="Default State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="default"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Hovered State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="hovered"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Focused State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="focused"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Pressed State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="pressed"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Read-only State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="read-only"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="Disabled State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="disabled"
        style={{ width: 200 }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>
    </div>
  );
};

export const WithError = (args: any) => {
  const [value, setValue] = React.useState();

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Dropdown
        label="Normal"
        value={value}
        onChange={(_e, v) => setValue(v)}
        error={false}
        style={{ width: 200 }}
        placeholder="Select an option"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        label="With Error"
        value={value}
        onChange={(_e, v) => setValue(v)}
        error={true}
        style={{ width: 200 }}
        placeholder="Select an option"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>
    </div>
  );
};

export const RTL = withRtl(() => {
  const [value, setValue] = React.useState();

  return (
    <Dropdown
      label="العنوان"
      value={value}
      onChange={(_e, v) => setValue(v)}
      placeholder="عنوان"
      style={{ width: 200 }}
    >
      <DropdownItem value={1}>خيار ١</DropdownItem>
      <DropdownItem value={2}>خيار ٢</DropdownItem>
      <DropdownItem value={3}>خيار ٣</DropdownItem>
    </Dropdown>
  );
});
