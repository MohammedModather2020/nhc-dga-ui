import { Meta, StoryObj } from "@storybook/react";
import TextInput, { sizes } from ".";
import withRtl from "../../lib/RTL";
import React from "react";
import Button from "../Button";

const meta = {
  title: "DGAUI/TextInput",
  component: TextInput,
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
    readOnly: false,
    disabled: false,
    prefix: "",
    suffix: "",
  },
} satisfies Meta<typeof TextInput>;

export default meta;

// Stories
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    id: "text-input1",
  },
};

export const Prefix: Story = {
  args: {
    label: "Label",
    placeholder: "Enter price",
    type: "number",
    prefix: "$",
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    error: true,
  },
};

export const RTL = withRtl(() => (
  <TextInput label="العنوان" placeholder="نص توضيحي" />
));

export const Ref = () => {
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => alert(ref.current?.value)}>
        Alert TextInput value by ref
      </Button>
      <TextInput ref={ref} label="Label" placeholder="placeholder" />
    </>
  );
};
