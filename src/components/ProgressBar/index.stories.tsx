import { Meta, StoryObj } from "@storybook/react";
import ProgressBar from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/ProgressBar",
  component: ProgressBar,
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
    label: "Label",
    helperText: "This is a helper text",
    percentage: 20,
    error: false,
    success: false,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

// Stories
type Story = StoryObj<typeof ProgressBar>;

export const Default = (args: any) => {
  return (
    <div style={{ width: 320 }}>
      <ProgressBar {...args} />
    </div>
  );
};

export const Rtl = withRtl(() => {
  return (
    <div style={{ width: 320 }}>
      <ProgressBar label="عنوان" helperText="نص مساعد" percentage={75} size="large" />
    </div>
  );
});
