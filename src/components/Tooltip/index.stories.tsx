import { Meta, StoryObj } from "@storybook/react";
import Tooltip from ".";
import Tag from "../Tag";

const meta = {
  title: "DGAUI/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    noBeak: {
      control: { type: "boolean" },
    },
    inverted: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "boolean" },
    },
  },
  args: {
    title: "Tooltip title",
    description:
      "Max width of tooltips is 240px - text will wrap automatically",
    children: "Tooltip children",
    placement: "right",
    alignment: "center",
    noBeak: false,
    inverted: false,
    icon: true,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

// Stories
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const Inverted: Story = {
  args: {
    inverted: true,
  },
};

export const CustomContents: Story = {
  args: {
    jsxContents: (
      <div style={{ padding: 8 }}>This is a tooltip cusom jsx contens</div>
    ),
  },
};

export const CustomColor: Story = {
  args: {
    jsxContents: (
      <div style={{ padding: 8 }}>
        This is a tooltip cusom jsx contens and color
      </div>
    ),
    backgroundColor: "#9999cc3f",
  },
};

export const AllPlacements = () => {
  const props = {
    title: "Title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    inverted: true,
  };

  return (
    <div style={{ height: 200, display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: 4 }}></div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} placement="left" alignment="start">
            <Tag>left-start</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} placement="left" alignment="center">
            <Tag>left-center</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} placement="left" alignment="end">
            <Tag>left-end</Tag>
          </Tooltip>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} placement="top" alignment="start">
              <Tag>top-start</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} placement="top" alignment="center">
              <Tag>top-center</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} placement="top" alignment="end">
              <Tag>top-end</Tag>
            </Tooltip>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} placement="bottom" alignment="start">
              <Tag>bottom-start</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} placement="bottom" alignment="center">
              <Tag>bottom-center</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} placement="bottom" alignment="end">
              <Tag>bottom-end</Tag>
            </Tooltip>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: 4 }}></div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} placement="right" alignment="start">
            <Tag>right-start</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} placement="right" alignment="center">
            <Tag>right-center</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} placement="right" alignment="end">
            <Tag>right-end</Tag>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
