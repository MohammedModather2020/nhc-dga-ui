import { Meta, StoryObj } from "@storybook/react";
import StatusTag, { sizes } from ".";
import defaultTheme from "../../lib/defaultTheme";

const meta = {
  title: "DGAUI/Tags/StatusTag",
  component: StatusTag,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: Object.keys(defaultTheme.palette).concat([
        "red",
        "yellow",
        "green",
      ]),
      control: { type: "select" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    variant: {
      options: ["subtle", "inverted", "ghost"],
      control: { type: "radio" },
    },
  },
  args: {
    color: "neutral",
    size: "large",
    variant: "subtle",
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
