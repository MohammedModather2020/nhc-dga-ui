import { Meta, StoryObj } from "@storybook/react";
import Dropdown, { sizes } from ".";
import withRtl from "../../lib/RTL";
import DropdownItem from "./DropdownItem";
import React from "react";

const meta = {
  title: "DGAUI/Select/Dropdown",
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
    variant: {
      options: ["default", "darker", "lighter"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "default" } },
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    size: "large",
    label: "Label",
    variant: "default",
    error: false,
    disabled: false,
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
