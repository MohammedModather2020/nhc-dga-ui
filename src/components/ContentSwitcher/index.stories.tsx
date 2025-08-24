import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ContentSwitcher, { sizes } from ".";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/ContentSwitcher",
  component: ContentSwitcher,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
  },
  args: {
    size: "medium",
    onColor: false,
    data: [
      {
        text: "Item 1",
        active: true,
      },
      {
        text: "Item 2",
      },
      {
        text: "Item 3",
      },
      {
        text: "Item 4",
      },
      {
        text: "Item 5",
      },
    ],
  },
} satisfies Meta<typeof ContentSwitcher>;

export default meta;

// Stories
type Story = StoryObj<typeof ContentSwitcher>;

export const Default = (args: any) => {
  const [data, setData] = React.useState(args.data);

  return (
    <div style={{ padding: 16, background: args.onColor ? "#000" : "#fff" }}>
      <ContentSwitcher
        {...args}
        data={data}
        onItemClicked={(_item, index) => {
          const newData = data.map((d: any, i: number) => ({
            ...d,
            active: i === index,
          }));
          setData(newData);
        }}
      />
    </div>
  );
};

export const Rtl = withRtl((args: any) => {
  const [data, setData] = React.useState([
    {
      text: "عنصر 1",
      active: true,
    },
    {
      text: "عنصر 2",
    },
    {
      text: "عنصر 3",
    },
    {
      text: "عنصر 4",
    },
    {
      text: "عنصر 5",
    },
  ]);

  return (
    <ContentSwitcher
      {...args}
      data={data}
      onItemClicked={(_item, index) => {
        const newData = data.map((d: any, i: number) => ({
          ...d,
          active: i === index,
        }));
        setData(newData);
      }}
    />
  );
});
