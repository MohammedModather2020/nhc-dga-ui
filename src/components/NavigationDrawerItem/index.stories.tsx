import { Meta, StoryObj } from "@storybook/react";
import NavigationDrawerItem from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Navigation Drawer Item",
  component: NavigationDrawerItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof NavigationDrawerItem>;

export default meta;

// Stories
type Story = StoryObj<typeof NavigationDrawerItem>;

export const Default: Story = {
  args: {
    selected: false,
    disabled: false,
    type: "link",
    title: "link",
    level: 1,
    children: (
      <>
        <NavigationDrawerItem level={2} title="Level 2" />
        <NavigationDrawerItem level={2} title="Level 2" />
        <NavigationDrawerItem level={2} title="Level 2" selected />
      </>
    ),
  },
};

export const Rtl = withRtl(() => (
  <div style={{ width: 200 }}>
    <NavigationDrawerItem level={1} title="مستوى ١" type="parent" selected>
      <NavigationDrawerItem level={2} title="Level 2" />
      <NavigationDrawerItem level={2} title="Level 2" />
      <NavigationDrawerItem level={2} title="Level 2" selected />
    </NavigationDrawerItem>
  </div>
));
