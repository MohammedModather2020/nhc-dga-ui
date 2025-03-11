import { Meta, StoryObj } from "@storybook/react";
import Menu from ".";
import MenuItem from "./MenuItem";
import fileAddIcon from "./MenuItem/file-add.svg";
import checkIcon from "./MenuItem/tick-02.png";
import MenuItemGroup from "./MenuItemGroup";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Menu>;

export default meta;

// Stories
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ cursor: "pointer", fontWeight: "bold" }}>Open the menu</div>
    ),
    menuItems: (
      <>
        <MenuItem
          icon={<img src={fileAddIcon} />}
          trailIcon={<img src={checkIcon} />}
        >
          Item Label
        </MenuItem>
        <MenuItem
          icon={<img src={fileAddIcon} />}
          trailIcon={<img src={checkIcon} />}
        >
          Item Label
        </MenuItem>
        <MenuItem
          icon={<img src={fileAddIcon} />}
          trailIcon={<img src={checkIcon} />}
          disabled
        >
          Disabled Item Label asd as dsa das
        </MenuItem>
        <MenuItem trailIcon={<img src={checkIcon} />}>
          No icon Item Label
        </MenuItem>
        <MenuItem icon={<img src={fileAddIcon} />}>
          No trail icon Item Label
        </MenuItem>
      </>
    ),
  },
};

export const Grouped: Story = {
  args: {
    children: <div style={{ marginBottom: 300, cursor: "pointer" }}>Menu</div>,

    menuItems: (
      <>
        <MenuItemGroup title="GROUP LABEL">
          <MenuItem
            icon={<img src={fileAddIcon} />}
            trailIcon={<img src={checkIcon} />}
          >
            Item Label
          </MenuItem>
          <MenuItem
            icon={<img src={fileAddIcon} />}
            trailIcon={<img src={checkIcon} />}
          >
            Item Label
          </MenuItem>
        </MenuItemGroup>
        <MenuItemGroup title="GROUP LABEL">
          <MenuItem
            icon={<img src={fileAddIcon} />}
            trailIcon={<img src={checkIcon} />}
          >
            Item Label
          </MenuItem>
          <MenuItem
            icon={<img src={fileAddIcon} />}
            trailIcon={<img src={checkIcon} />}
          >
            Item Label
          </MenuItem>
        </MenuItemGroup>
      </>
    ),
  },
};

export const RtlGrouped = withRtl(() => {
  return (
    <Menu
      menuItems={
        <>
          <MenuItemGroup title="نص المجموعة">
            <MenuItem
              icon={<img src={fileAddIcon} />}
              trailIcon={<img src={checkIcon} />}
            >
              نص العنصر
            </MenuItem>
            <MenuItem
              icon={<img src={fileAddIcon} />}
              trailIcon={<img src={checkIcon} />}
            >
              نص العنصر
            </MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="نص المجموعة">
            <MenuItem
              icon={<img src={fileAddIcon} />}
              trailIcon={<img src={checkIcon} />}
            >
              نص العنصر
            </MenuItem>
            <MenuItem
              icon={<img src={fileAddIcon} />}
              trailIcon={<img src={checkIcon} />}
            >
              نص العنصر
            </MenuItem>
          </MenuItemGroup>
        </>
      }
    >
      <div style={{ marginBottom: 300, cursor: "pointer" }}>قائمة</div>
    </Menu>
  );
});
