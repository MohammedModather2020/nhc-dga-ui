import { Meta, StoryObj } from "@storybook/react";
import Chip from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
  },
  args: {
    size: "medium",
    style: "primary",
    rounded: true,
    onColor: false,
    selected: false,
    disabled: false,
    leadIcon: "<",
    trailIcon: ">",
  },
} satisfies Meta<typeof Chip>;

export default meta;

// Stories
type Story = StoryObj<typeof Chip>;

export const Default = (args: any) => {
  return (
    <div
      style={{ padding: 50, backgroundColor: args.onColor ? "#074D31" : "" }}
    >
      <Chip {...args}>Item</Chip>
    </div>
  );
};

export const Rtl = withRtl(Default);
