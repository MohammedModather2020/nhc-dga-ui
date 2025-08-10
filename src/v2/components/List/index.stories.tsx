import { Meta, StoryObj } from "@storybook/react";
import List from ".";
import checkPrimaryIcon from "./checkPrimaryIcon.svg";

const meta = {
  title: "DGAUI/V2/List",
  component: List,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    style: {
      options: ["primary", "neutral", "on-color"],
      control: { type: "select" },
    },
  },
  args: {
    style: "primary",
    type: "with-icon",
    level: "1",
    iconUrl: checkPrimaryIcon,
  },
} satisfies Meta<typeof List>;

export default meta;

// Stories
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    children: (
      <>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </>
    ),
  },
  render: (args) => {
    if (args.style === "on-color") {
      return (
        <div
          style={{
            backgroundColor: "#074D31",
            padding: 56,
            minWidth: 400,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List {...args} />
        </div>
      );
    }
    return <List {...args} />;
  },
};

export const LevelsOl = () => {
  return (
    <List type="ordered-list">
      <li>List item</li>
      <li>List item</li>
      <List type="ordered-list" level={2}>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </List>
      <li>List item</li>
    </List>
  );
};

export const LevelsUl = () => {
  return (
    <List type="unordered-list">
      <li>List item</li>
      <li>List item</li>
      <List type="unordered-list" level={2}>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </List>
      <li>List item</li>
    </List>
  );
};
