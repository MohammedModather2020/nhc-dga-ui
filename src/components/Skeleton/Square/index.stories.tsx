import { Meta, StoryObj } from "@storybook/react";
import SkeletonSquare from ".";

const meta = {
  title: "DGAUI/Skeleton/SkeletonSquare",
  component: SkeletonSquare,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "120px",
  },
} satisfies Meta<typeof SkeletonSquare>;

export default meta;

// Stories
type Story = StoryObj<typeof SkeletonSquare>;

export const Default: Story = {};
