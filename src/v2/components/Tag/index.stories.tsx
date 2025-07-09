import { Meta, StoryObj } from "@storybook/react";
import Tag, { sizes } from ".";
import defaultTheme from "../../../lib/defaultTheme";

const meta = {
  title: "DGAUI/V2/Tags/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: Object.keys(defaultTheme.palette),
      control: { type: "select" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    style: {
      options: ["neutral", "success", "error", "warning", "info", "onColor"],
      control: { type: "radio" },
    },
    rounded: {
      type: "boolean",
    },
  },
  args: {
    size: "medium",
    style: "neutral",
    rounded: false,
    leadIcon: "+",
    trailIcon: "-",
  },
} satisfies Meta<typeof Tag>;

export default meta;

// Stories
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};
