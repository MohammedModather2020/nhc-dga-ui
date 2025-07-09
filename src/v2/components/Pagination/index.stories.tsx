import { Meta, StoryObj } from "@storybook/react";
import Pagination from ".";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
  title: "DGAUI/V2/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    rtl: {
      options: [false, true],
      control: { type: "boolean" },
    },
  },
  args: {
    size: "small",
    rtl: false,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

// Stories
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    count: 100,
    siblingCount: 1,
    currentPage: 1,
    size: "small",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <Pagination
        {...args}
        onPageChange={(pageNumber) => updateArgs({ currentPage: pageNumber })}
      />
    );
  },
};

export const Rtl: Story = {
  args: {
    count: 100,
    siblingCount: 1,
    currentPage: 1,
    size: "small",
    rtl: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <Pagination
        {...args}
        onPageChange={(pageNumber) => updateArgs({ currentPage: pageNumber })}
      />
    );
  },
};
