import { Meta, StoryObj } from "@storybook/react";
import Tag, { sizes } from ".";
import defaultTheme from "../../lib/defaultTheme";

const meta = {
  title: "DGAUI/Tags/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
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

export const Default = (args: any) => {
  if (args.style == "onColor") {
    return (
      <div
        style={{
          backgroundColor: "#074D31",
          padding: 56,
          minWidth: 400,
          textAlign: "center",
        }}
      >
        <Tag {...args}>Label</Tag>
      </div>
    );
  }
  return <Tag {...args}>Label</Tag>;
};
