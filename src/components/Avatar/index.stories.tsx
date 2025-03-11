import { Meta, StoryObj } from "@storybook/react";
import Avatar, { sizes } from ".";
import icon from "./icon.png";
import imageSrc from "./imageSrc.png";

const meta = {
  title: "DGAUI/Avatar/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "select" },
    },
  },
  args: {
    size: "medium",
    square: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

// Stories
type Story = StoryObj<typeof Avatar>;

export const Text: Story = {
  args: {
    text: "AB",
  },
};

export const Icon: Story = {
  args: {
    icon: <img src={icon} />,
  },
};

export const image: Story = {
  args: {
    imageSrc,
  },
};
