import { Meta, StoryObj } from "@storybook/react";
import Tab, { sizes } from ".";
import leadingIcon from "./leadingIcon.svg";
import withRtl from "../../lib/RTL";
import React from "react";

const meta = {
  title: "DGAUI/Tabs/Tab",
  component: Tab,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    vertical: {
      control: { type: "boolean" },
    },
  },
  args: {
    size: "large",
    selected: false,
    disabled: false,
    vertical: false,
  },
} satisfies Meta<typeof Tab>;

export default meta;

// Stories
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    children: (
      <>
        <img src={leadingIcon} />
        Text
      </>
    ),
    selected: false,
    disabled: false,
    vertical: false,
  },
};

export const Controlled = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <Tab selected={selected} onClick={() => setSelected(true)}>
      <img src={leadingIcon} />
      Text
    </Tab>
  );
};

export const ControlledList = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>();

  return (
    <div style={{ display: "flex" }}>
      <Tab selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
        <img src={leadingIcon} />
        Text
      </Tab>
      <Tab selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
        <img src={leadingIcon} />
        Text
      </Tab>
    </div>
  );
};

export const RTL = withRtl(() => (
  <Tab>
    <img src={leadingIcon} />
    النص
  </Tab>
));

export const RTLVertical = withRtl(() => (
  <Tab vertical>
    <img src={leadingIcon} />
    النص
  </Tab>
));
