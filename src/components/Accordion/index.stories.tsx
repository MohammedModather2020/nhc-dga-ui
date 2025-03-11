import { Meta, StoryObj } from "@storybook/react";
import Accordion, { sizes } from ".";
import { useArgs } from "@storybook/preview-api";
import React from "react";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
      table: { defaultValue: { summary: "medium" } },
    },
    expanded: {
      control: { type: "boolean" },
      description:
        "Transforms the component to controlled, so you have to pass onChange to handle the 'expanded' status",
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    disabled: false,
    defaultExpanded: false,
    size: "medium",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

// Stories
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    title: "Accordion",
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
      It has survived not only five centuries, but also the leap into electronic typesetting, 
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
};

export const DefaultExpanded: Story = {
  args: {
    title: "Accordion",
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    defaultExpanded: true,
  },
};

export const Controlled: Story = {
  args: {
    title: "Accordion",
    children: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    expanded: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <Accordion
        {...args}
        onChange={(_e, isExpanded) => updateArgs({ expanded: isExpanded })}
      />
    );
  },
};

export const AccordionList = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>();

  return (
    <div>
      <Accordion
        title="Accordion 1"
        expanded={activeIndex === 0}
        onChange={() => setActiveIndex(0)}
      >
        Accordion 1 content to display
      </Accordion>
      <Accordion
        title="Accordion 2"
        expanded={activeIndex === 1}
        onChange={() => setActiveIndex(1)}
      >
        Accordion 2 content to display
      </Accordion>
      <Accordion
        title="Accordion 3"
        expanded={activeIndex === 2}
        onChange={() => setActiveIndex(2)}
      >
        Accordion 3 content to display
      </Accordion>
    </div>
  );
};

export const RTL = withRtl(() => (
  <Accordion title="العنوان" defaultExpanded>
    نص توضيحي سيكتب هنا
  </Accordion>
));
