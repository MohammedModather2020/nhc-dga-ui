import { Meta, StoryObj } from "@storybook/react";
import SkeletonRectangle from ".";

const meta = {
  title: "DGAUI/Skeleton/SkeletonRectangle",
  component: SkeletonRectangle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    size: "large",
  },
} satisfies Meta<typeof SkeletonRectangle>;

export default meta;

// Stories
type Story = StoryObj<typeof SkeletonRectangle>;

export const Default = (args: any) => {
  return (
    <div style={{ width: 200 }}>
      <SkeletonRectangle {...args} />
    </div>
  );
};
