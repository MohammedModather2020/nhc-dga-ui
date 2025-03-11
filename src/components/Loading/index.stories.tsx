import { Meta, StoryObj } from "@storybook/react";
import Radio, { sizes } from ".";
import defaultTheme from "../../lib/defaultTheme";

const meta = {
  title: "DGAUI/Loading",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "select" },
    },
    color: {
      options: Object.keys(defaultTheme.palette),
      control: { type: "select" },
    },
  },
  args: {
    color: "primary",
    size: "medium",
  },
} satisfies Meta<typeof Radio>;

export default meta;

// Stories
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};
