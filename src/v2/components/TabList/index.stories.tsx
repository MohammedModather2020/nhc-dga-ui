import { Meta } from "@storybook/react";
import TabList from ".";
import leadingIcon from "../Tab/leadingIcon.svg";
import Tab, { sizes } from "../Tab";
import React from "react";
import withRtl from "../../../lib/RTL";

const meta = {
  title: "DGAUI/V2/Tabs/TabList",
  component: TabList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    vertical: {
      control: { type: "boolean" },
    },
  },
  args: {
    size: "large",
    flush: false,
    vertical: false,
  },
} satisfies Meta<typeof TabList>;

export default meta;

// Stories
export const Default = (args: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  return (
    <TabList {...args}>
      <Tab selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
        <img src={leadingIcon} />
        Tab1
      </Tab>
      <Tab selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
        <img src={leadingIcon} />
        Tab2
      </Tab>
      <Tab selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
        <img src={leadingIcon} />
        Tab3
      </Tab>
    </TabList>
  );
};

export const Rtl = withRtl(() => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  return (
    <TabList flush>
      <Tab selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
        <img src={leadingIcon} />
        تاب ١
      </Tab>
      <Tab selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
        <img src={leadingIcon} />
        تاب ٢
      </Tab>
      <Tab selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
        <img src={leadingIcon} />
        تاب ٣
      </Tab>
    </TabList>
  );
});
