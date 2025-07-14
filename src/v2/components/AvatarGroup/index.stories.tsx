import { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from ".";
import icon from "../Avatar/icon.png";
import imageSrc from "../Avatar/imageSrc.png";
import Avatar from "../Avatar";
import withRtl from "../../../lib/RTL";

const meta = {
  title: "DGAUI/V2/Avatar/AvatarGroup",
  component: AvatarGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    stacked: {
      control: { type: "boolean" },
    },
  },
  args: {
    stacked: false,
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;

// Stories
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  args: {
    stacked: false,
    children: [
      <Avatar text="AB" />,
      <Avatar text="CD" />,
      <Avatar text="EF" />,
      <Avatar icon={<img src={icon} />} />,
      <Avatar imageSrc={imageSrc} />,
      <Avatar text="+99" />,
    ],
  },
};

export const Rtl = withRtl(() => (
  <AvatarGroup>
    <Avatar text="اش" />
    <Avatar text="مح" />
    <Avatar text="سا" />
    <Avatar icon={<img src={icon} />} />
    <Avatar imageSrc={imageSrc} />
    <Avatar text="+99" />
  </AvatarGroup>
));

export const RtlStacked = withRtl(() => (
  <AvatarGroup stacked>
    <Avatar text="اش" />
    <Avatar text="مح" />
    <Avatar text="سا" />
    <Avatar icon={<img src={icon} />} />
    <Avatar imageSrc={imageSrc} />
    <Avatar text="+99" />
  </AvatarGroup>
));
