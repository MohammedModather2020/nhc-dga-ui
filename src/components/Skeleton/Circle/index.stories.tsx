import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SkeletonCircle from ".";

const meta = {
  title: "DGAUI/Skeleton/SkeletonCircle",
  component: SkeletonCircle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "120px",
  },
} satisfies Meta<typeof SkeletonCircle>;

export default meta;

// Stories
type Story = StoryObj<typeof SkeletonCircle>;

export const Default: Story = {};
