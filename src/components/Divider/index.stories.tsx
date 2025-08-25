import { Meta, StoryObj } from "@storybook/react";
import Divider from ".";

const meta = {
  title: "DGAUI/Divider",
  component: Divider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["neutral", "alphaWhite", "white", "primary"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
    lineType: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
  args: {
    color: "primary",
    lineType: "horizontal",
  },
} satisfies Meta<typeof Divider>;

export default meta;

// Stories
type Story = StoryObj<typeof Divider>;

export const Default = (args: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        height: 200,
        padding: 16,
        backgroundColor: "#aaa",
      }}
    >
      <Divider {...args} />
    </div>
  );
};
