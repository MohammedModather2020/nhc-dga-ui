import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Skeleton from ".";

const meta = {
  title: "DGAUI/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    type: "chartAndContent",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

// Stories
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};
