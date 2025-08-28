import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Rating from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Rating",
  component: Rating,
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
    brand: false,
  },
} satisfies Meta<typeof Rating>;

export default meta;

// Stories
type Story = StoryObj<typeof Rating>;

export const Default = (args: any) => {
  const [score, setScore] = React.useState(0);

  return (
    <Rating
      {...args}
      value={score}
      onChange={(newScore) => setScore(newScore)}
    />
  );
};

export const Rtl = withRtl(Default);
