import { Meta, StoryObj } from "@storybook/react";
import StatusTag, { sizes } from ".";
import defaultTheme from "../../../lib/defaultTheme";

const meta = {
  title: "DGAUI/V2/Tags/StatusTag",
  component: StatusTag,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    style: {
      options: ["neutral", "green", "blue", "yellow", "red"],
      control: { type: "select" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    status: {
      options: ["subtle", "inverted", "ghost"],
      control: { type: "radio" },
    },
  },
  args: {
    style: "neutral",
    size: "medium",
    status: "subtle",
  },
} satisfies Meta<typeof StatusTag>;

export default meta;

// Stories
type Story = StoryObj<typeof StatusTag>;

export const Default: Story = {
  args: {
    children: "Status",
  },
};
