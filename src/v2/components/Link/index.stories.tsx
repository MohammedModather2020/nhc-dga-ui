import { Meta, StoryObj } from "@storybook/react";
import Link, { sizes } from ".";

const meta = {
  title: "DGAUI/V2/Link",
  component: Link,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    style: {
      options: ["primary", "neutral", "on-color"],
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
    style: "primary",
    inline: false,
    disabled: false,
    children: "Link to DGAUI",
    href: "https://dgaui.vercel.app",
  },
} satisfies Meta<typeof Link>;

export default meta;

// Stories
type Story = StoryObj<typeof Link>;

export const Default = (args: any) => {
  if (args.style === "on-color") {
    return (
      <div
        style={{
          backgroundColor: "#074D31",
          padding: 56,
          minWidth: 400,
          textAlign: "center",
        }}
      >
        <Link {...args} />
      </div>
    );
  }
  return <Link {...args} />;
};
