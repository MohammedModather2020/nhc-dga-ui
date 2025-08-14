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
    style: {
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
    style: "default",
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
      dropdownStyle={{ width: "200px" }}
      {...args}
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
      multiple
      dropdownStyle={{ width: "200px" }}
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
        dropdownStyle={{ width: "200px" }}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Filled"
        value={value}
        onChange={(_e, v) => setValue(v)}
        filled={true}
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>
    </div>
  );
};

export const WithStyles = (args: any) => {
  const [value, setValue] = React.useState(200);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: 200 }}>
        <Dropdown
          label="Default Style"
          value={value}
          onChange={(_e, v) => setValue(v)}
          style="default"
          dropdownStyle={{ width: "200px" }}
        >
          <DropdownItem value={100}>Option 1</DropdownItem>
          <DropdownItem value={200}>Option 2</DropdownItem>
          <DropdownItem value={300}>Option 3</DropdownItem>
        </Dropdown>
      </div>

      <div style={{ width: 200 }}>
        <Dropdown
          dropdownStyle={{ width: "200px" }}
          label="Filled Style"
          value={value}
          onChange={(_e, v) => setValue(v)}
          style="filled"
        >
          <DropdownItem value={100}>Option 1</DropdownItem>
          <DropdownItem value={200}>Option 2</DropdownItem>
          <DropdownItem value={300}>Option 3</DropdownItem>
        </Dropdown>
      </div>

      <div style={{ width: 200 }}>
        <Dropdown
          dropdownStyle={{ width: "200px" }}
          label="Filled Darker"
          value={value}
          onChange={(_e, v) => setValue(v)}
          style="filled-darker"
        >
          <DropdownItem value={100}>Option 1</DropdownItem>
          <DropdownItem value={200}>Option 2</DropdownItem>
          <DropdownItem value={300}>Option 3</DropdownItem>
        </Dropdown>
      </div>

      <div style={{ width: 200 }}>
        <Dropdown
          dropdownStyle={{ width: "200px" }}
          label="Filled Lighter"
          value={value}
          onChange={(_e, v) => setValue(v)}
          style="filled-lighter"
        >
          <DropdownItem value={100}>Option 1</DropdownItem>
          <DropdownItem value={200}>Option 2</DropdownItem>
          <DropdownItem value={300}>Option 3</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};
export const WithStates = (args: any) => {
  const [value, setValue] = React.useState(200);

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Default State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="default"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Hovered State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="hovered"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Focused State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="focused"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Pressed State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="pressed"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Read-only State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="read-only"
      >
        <DropdownItem value={100}>Option 1</DropdownItem>
        <DropdownItem value={200}>Option 2</DropdownItem>
        <DropdownItem value={300}>Option 3</DropdownItem>
      </Dropdown>

      <Dropdown
        dropdownStyle={{ width: "200px" }}
        label="Disabled State"
        value={value}
        onChange={(_e, v) => setValue(v)}
        state="disabled"
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
        placeholder="Select an option"
        dropdownStyle={{ width: "200px" }}
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
        placeholder="Select an option"
        dropdownStyle={{ width: "200px" }}
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
      dropdownStyle={{ width: "200px" }}
    >
      <DropdownItem value={1}>خيار ١</DropdownItem>
      <DropdownItem value={2}>خيار ٢</DropdownItem>
      <DropdownItem value={3}>خيار ٣</DropdownItem>
    </Dropdown>
  );
});
