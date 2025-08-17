import { Meta, StoryObj } from "@storybook/react";
import Button, { sizes } from ".";

const meta = {
  title: "DGAUI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "select" },
    },
    disabled: {
      options: [false, true],
      control: { type: "boolean" },
    },
  },
  args: {
    disabled: false,
    destructive: false,
    iconOnly: false,
    onColor: false,
    style: "primary",
    size: "large",
    leadIcon: "+",
  },
} satisfies Meta<typeof Button>;

export default meta;

// Stories
type Story = StoryObj<typeof Button>;

export const Default = (args: any) => {
  if (args.onColor) {
    return (
      <div
        style={{
          backgroundColor: "#074D31",
          padding: 56,
          minWidth: 400,
          textAlign: "center",
        }}
      >
        <Button {...args}>Button</Button>
      </div>
    );
  }
  return <Button {...args}>Button</Button>;
};
