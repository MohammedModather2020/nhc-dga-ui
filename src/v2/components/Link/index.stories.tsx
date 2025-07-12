import { Meta, StoryObj } from "@storybook/react";
import Link, { sizes } from ".";
import defaultTheme from "../../lib/defaultTheme";

const meta = {
  title: "DGAUI/Link",
  component: Link,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: Object.keys({ ...defaultTheme.palette, onColor: "" }),
      control: { type: "select" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    inline: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    size: "medium",
    color: "primary",
    inline: false,
    disabled: false,
  },
} satisfies Meta<typeof Link>;

export default meta;

// Stories
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Link to DGAUI",
    href: "https://dgaui.vercel.app",
  },
};
