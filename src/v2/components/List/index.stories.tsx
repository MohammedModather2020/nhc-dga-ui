import { Meta, StoryObj } from "@storybook/react";
import List from ".";
import defaultTheme from "../../lib/defaultTheme";
import checkPrimaryIcon from "./checkPrimaryIcon.svg";

const meta = {
  title: "DGAUI/List",
  component: List,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: Object.keys({ ...defaultTheme.palette, onColor: "" }),
      control: { type: "select" },
    },
  },
  args: {
    color: "primary",
    type: "icon",
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
};

export const LevelsOl = () => {
  return (
    <List type="ol">
      <li>List item</li>
      <li>List item</li>
      <List type="ol" level={2}>
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
    <List type="ul">
      <li>List item</li>
      <li>List item</li>
      <List type="ul" level={2}>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </List>
      <li>List item</li>
    </List>
  );
};
