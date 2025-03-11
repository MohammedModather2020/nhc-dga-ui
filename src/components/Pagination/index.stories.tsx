import { Meta, StoryObj } from "@storybook/react";
import Pagination from ".";
import React from "react";
import { useArgs } from "storybook/internal/preview-api";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
  args: {},
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

export const Rtl = withRtl(() => {
  const [currentPage, setCurrentpage] = React.useState(1);

  return (
    <Pagination
      count={100}
      siblingCount={1}
      currentPage={currentPage}
      size="small"
      onPageChange={(pageNumber) => setCurrentpage(pageNumber)}
    />
  );
});
