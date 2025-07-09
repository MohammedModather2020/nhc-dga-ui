import { Meta, StoryObj } from "@storybook/react";
import Radio, { sizes } from ".";

const meta = {
  title: "DGAUI/V2/Loading",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "select" },
    },
    style: {
      options: ["primary", "neutral", "on-color"],
      control: { type: "select" },
    },
  },
  args: {
    style: "primary",
    size: "medium",
  },
} satisfies Meta<typeof Radio>;

export default meta;

// Stories
type Story = StoryObj<typeof Radio>;

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
        <Radio {...args} />
      </div>
    );
  }
  return <Radio {...args} />;
};
