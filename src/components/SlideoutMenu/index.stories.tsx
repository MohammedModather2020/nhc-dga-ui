import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SlideoutMenu from ".";
import addCircleImg from "../../assets/images/addCircle.png";
import Button from "../Button";
import MenuItemGroup from "../Menu/MenuItemGroup";
import MenuItem from "../Menu/MenuItem";
import fileIcon from "./test.png";
import checkIcon from "../Menu/MenuItem/tick-02.png";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/SlideoutMenu",
  component: SlideoutMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      options: ["white", "gray"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
  },
  args: {
    backgroundColor: "gray",
    backdrop: true,
    border: true,
    navHeader: {
      titleText: "Menu Title",
      showDescription: true,
      descriptionText: "This is a description for the menu.",
      showDivider: true,
      showFeaturedIcon: true,
      icon: (
        <img src={addCircleImg} alt="Add" style={{ width: 32, height: 32 }} />
      ),
    },
    children: <div style={{ padding: 16 }}>Menu Content Here</div>,
  },
} satisfies Meta<typeof SlideoutMenu>;

export default meta;

// Stories
type Story = StoryObj<typeof SlideoutMenu>;

export const Default: Story = {};

export const Controlled = (args: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Slideout Menu</Button>

      <SlideoutMenu
        {...args}
        open={open}
        onCloseClicked={() => setOpen(false)}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
      >
        <div style={{ padding: 16 }}>
          <MenuItemGroup title="Group Label">
            <MenuItem icon={<img src={fileIcon} style={{ width: 18 }} />}>
              Item Label
            </MenuItem>
            <MenuItem icon={<img src={fileIcon} style={{ width: 18 }} />}>
              Item Label
            </MenuItem>
            <MenuItem icon={<img src={fileIcon} style={{ width: 18 }} />}>
              Item Label
            </MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="Group Label">
            <MenuItem
              icon={<img src={fileIcon} style={{ width: 18 }} />}
              trailIcon={"+99"}
            >
              Item Label
            </MenuItem>
            <MenuItem
              icon={<img src={fileIcon} style={{ width: 18 }} />}
              trailIcon={"+99"}
            >
              Item Label
            </MenuItem>
            <MenuItem
              icon={<img src={fileIcon} style={{ width: 18 }} />}
              trailIcon={"+99"}
            >
              Item Label
            </MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="Group Label">
            <MenuItem
              icon={<img src={fileIcon} style={{ width: 18 }} />}
              trailIcon={<img src={checkIcon} />}
            >
              Item Label
            </MenuItem>
            <MenuItem
              icon={<img src={fileIcon} style={{ width: 18 }} />}
              trailIcon={<img src={checkIcon} />}
            >
              Item Label
            </MenuItem>
            <MenuItem
              icon={<img src={fileIcon} style={{ width: 18 }} />}
              trailIcon={<img src={checkIcon} />}
            >
              Item Label
            </MenuItem>
          </MenuItemGroup>
        </div>
      </SlideoutMenu>
    </div>
  );
};

export const Rtl = withRtl(Controlled);
