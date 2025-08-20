import { Meta, StoryObj } from "@storybook/react";
import SearchBox from ".";
import withRtl from "../../lib/RTL";
import searchIcon from "../../assets/images/search.png";
import neutralIcon from "../../assets/images/Neutral-q.png";

const meta = {
  title: "DGAUI/SearchBox",
  component: SearchBox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
  args: {
    size: "large",
    label: "Label",
    style: "default",
    icon: <img src={searchIcon} style={{ width: 16 }} />,
    showTrailingIcon: true,
    showLabel: true,
    disabled: false,
    placeholder: "PlaceHolder",
    helperText: (
      <span style={{ display: "flex", alignItems: "center" }}>
        <img src={neutralIcon} style={{ width: 14, marginInlineEnd: 4 }} />{" "}
        Helper text
      </span>
    ),
  },
} satisfies Meta<typeof SearchBox>;

export default meta;

// Stories
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  args: {
    label: "Label",
  },
};

export const RTL = withRtl(() => (
  <SearchBox
    label="العنوان"
    placeholder="نص توضيحي"
    icon={<img src={searchIcon} style={{ width: 16 }} />}
    helperText={
      <span style={{ display: "flex", alignItems: "center" }}>
        <img src={neutralIcon} style={{ width: 14, marginInlineEnd: 4 }} />{" "}
        نص مساعد
      </span>
    }
  />
));
