import { Meta, StoryObj } from "@storybook/react";
import Notification from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Notification",
  component: Notification,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["neutral", "info", "success", "error", "warning"],
      control: { type: "select" },
    },
  },
  args: {
    color: "error",
    title: "Important:",
    message: "This is a very important banner message that requires attention",
  },
} satisfies Meta<typeof Notification>;

export default meta;

// Stories
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {},
};

export const Rtl = withRtl(() => (
  <Notification
    color="error"
    title="مهم:"
    message=" لوريم إيبسوم لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
  />
));
