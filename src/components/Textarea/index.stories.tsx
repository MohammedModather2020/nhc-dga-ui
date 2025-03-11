import { Meta, StoryObj } from "@storybook/react";
import Textarea from ".";
import withRtl from "../../lib/RTL";
import React from "react";
import Button from "../Button";

const meta = {
  title: "DGAUI/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
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
    label: "Label",
    variant: "default",
    error: false,
    readOnly: false,
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;

// Stories
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder text",
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
  <Textarea label="العنوان" placeholder="نص توضيحي" />
));

export const Ref = () => {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <Button onClick={() => alert(ref.current?.value)}>
        Alert Textarea value by ref
      </Button>
      <Textarea ref={ref} label="Label" placeholder="placeholder" />
    </>
  );
};
