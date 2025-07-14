import { Meta, StoryObj } from "@storybook/react";

// custom-deps
import InlineAlert from ".";
import Button from "../Button";
import withRtl from "../../../lib/RTL";

const meta = {
  title: "DGAUI/V2/InlineAlert",
  component: InlineAlert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["neutral", "info", "success", "error", "warning"],
      control: { type: "select" },
    },
    background: {
      options: ["white", "color"],
      control: { type: "radio" },
    },
    closeButton: {
      control: { type: "boolean" },
    },
  },
  args: {
    type: "neutral",
    closeButton: true,
    background: "white",
  },
} satisfies Meta<typeof InlineAlert>;

export default meta;

// Stories
type Story = StoryObj<typeof InlineAlert>;

export const Default: Story = {
  args: {
    leadText: "Notification/Alert messag",
    helpText:
      "When a Notification/Alert needs a further detailed explanation, it goes here.",
    closeButton: true,
    actions: (
      <>
        <Button style="primary" color="neutral" size="large">
          Button1
        </Button>
        <Button style="secondary-outline" color="neutral" size="large">
          Button2
        </Button>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    leadText: "Notification/Alert messag",
  },
};

export const Rtl = withRtl(() => (
  <InlineAlert
    leadText="Notification/Alert messag"
    helpText="When a Notification/Alert needs a further detailed explanation, it goes here."
    closeButton
    actions={
      <>
        <Button style="secondary-outline" color="neutral">
          Button
        </Button>
        <Button style="transparent" color="neutral">
          Button
        </Button>
      </>
    }
  />
));

export const RtlMinimal = withRtl(() => (
  <InlineAlert leadText="Notification/Alert messag" closeButton />
));
