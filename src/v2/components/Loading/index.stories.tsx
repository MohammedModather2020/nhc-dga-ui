import { Meta, StoryObj } from "@storybook/react";
import Radio, { sizes } from ".";

const meta = {
  title: "DGAUI/v2/Loading",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "select" },
    },
    style: {
      options: ["primary", "neutral", "on-color"],
      control: { type: "select" },
    },
  },
  args: {
    style: "primary",
    size: "medium",
  },
} satisfies Meta<typeof Radio>;

export default meta;

// Stories
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};
