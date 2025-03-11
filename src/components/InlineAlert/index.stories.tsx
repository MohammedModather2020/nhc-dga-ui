import { Meta, StoryObj } from "@storybook/react";
import InlineAlert from ".";
import defaultTheme from "../../lib/defaultTheme";
import Button from "../Button";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/InlineAlert",
  component: InlineAlert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["neutral", "info", "success", "error", "warning"],
      control: { type: "select" },
    },
    background: {
      options: ["white", "color"],
      control: { type: "radio" },
    },
    hasClose: {
      control: { type: "boolean" },
    },
  },
  args: {
    color: "neutral",
    hasClose: true,
    background: "white",
  },
} satisfies Meta<typeof InlineAlert>;

export default meta;

// Stories
type Story = StoryObj<typeof InlineAlert>;

export const Default: Story = {
  args: {
    title: "Notification/Alert messag",
    description:
      "When a Notification/Alert needs a further detailed explanation, it goes here.",
    hasClose: true,
    actionButtons: (
      <>
        <Button variant="solid" color="neutral" size="large">
          Button1
        </Button>
        <Button variant="outlined" color="neutral" size="large">
          Button2
        </Button>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: "Notification/Alert messag",
  },
};

export const Rtl = withRtl(() => (
  <InlineAlert
    title="Notification/Alert messag"
    description="When a Notification/Alert needs a further detailed explanation, it goes here."
    hasClose
    actionButtons={
      <>
        <Button variant="outlined" color="neutral">
          Button
        </Button>
        <Button variant="text" color="neutral">
          Button
        </Button>
      </>
    }
  />
));

export const RtlMinimal = withRtl(() => (
  <InlineAlert title="Notification/Alert messag" hasClose />
));
