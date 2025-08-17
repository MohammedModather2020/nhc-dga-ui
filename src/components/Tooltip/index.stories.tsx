import { Meta, StoryObj } from "@storybook/react";
import Tooltip from ".";
import Tag from "../../components/Tag";

const meta = {
  title: "DGAUI/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    content: {
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
    content:
      "Max width of tooltips is 240px - text will wrap automatically",
    children: "Tooltip children",
    beakPlacement: "right",
    beakAlignment: "center",
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
    content:
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
          <Tooltip {...props} beakPlacement="left" beakAlignment="start">
            <Tag>left-start</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} beakPlacement="left" beakAlignment="center">
            <Tag>left-center</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} beakPlacement="left" beakAlignment="end">
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
            <Tooltip {...props} beakPlacement="top" beakAlignment="start">
              <Tag>top-start</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} beakPlacement="top" beakAlignment="center">
              <Tag>top-center</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} beakPlacement="top" beakAlignment="end">
              <Tag>top-end</Tag>
            </Tooltip>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} beakPlacement="bottom" beakAlignment="start">
              <Tag>bottom-start</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} beakPlacement="bottom" beakAlignment="center">
              <Tag>bottom-center</Tag>
            </Tooltip>
          </div>
          <div style={{ margin: 4 }}>
            <Tooltip {...props} beakPlacement="bottom" beakAlignment="end">
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
          <Tooltip {...props} beakPlacement="right" beakAlignment="start">
            <Tag>right-start</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} beakPlacement="right" beakAlignment="center">
            <Tag>right-center</Tag>
          </Tooltip>
        </div>
        <div style={{ margin: 4 }}>
          <Tooltip {...props} beakPlacement="right" beakAlignment="end">
            <Tag>right-end</Tag>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
