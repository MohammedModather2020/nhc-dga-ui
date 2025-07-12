import { Meta, StoryObj } from "@storybook/react";
import HeaderMenuItem from ".";

const meta = {
  title: "DGAUI/V2/Header Menu Item",
  component: HeaderMenuItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: { type: "boolean" },
    },
  },
  args: {
    selected: false,
  },
} satisfies Meta<typeof HeaderMenuItem>;

export default meta;

// Stories
type Story = StoryObj<typeof HeaderMenuItem>;

export const Default: Story = {
  args: {
    children: <>Text</>,
    selected: false,
  },
};
