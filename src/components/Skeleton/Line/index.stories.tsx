import { Meta, StoryObj } from "@storybook/react";
import SkeletonLine from ".";

const meta = {
  title: "DGAUI/Skeleton/SkeletonLine",
  component: SkeletonLine,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "large",
  },
} satisfies Meta<typeof SkeletonLine>;

export default meta;

// Stories
type Story = StoryObj<typeof SkeletonLine>;

export const Default = () => {
  return (
    <div style={{ width: 200 }}>
      <SkeletonLine />
    </div>
  );
};
