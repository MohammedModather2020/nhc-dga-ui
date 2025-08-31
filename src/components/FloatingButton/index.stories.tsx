import { Meta, StoryObj } from "@storybook/react";
import FloatingButton from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/FloatingButton",
  component: FloatingButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
  },
  args: {
    size: "small",
    style: "Primary-Neutral",
    iconOnly: false,
    onColor: false,
    selected: false,
    disabled: false,
    leadIcon: "✛",
    children: "Button"
  },
} satisfies Meta<typeof FloatingButton>;

export default meta;

// Stories
type Story = StoryObj<typeof FloatingButton>;

export const Default = (args: any) => {
  return (
    <div
      style={{ padding: 50, backgroundColor: args.onColor ? "#074D31" : "" }}
    >
      <FloatingButton {...args}>{args.children}</FloatingButton>
    </div>
  );
};

export const Rtl = withRtl(Default);
