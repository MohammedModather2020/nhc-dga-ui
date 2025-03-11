import { Meta, StoryObj } from "@storybook/react";
import Switch from ".";
import withRtl from "../../lib/RTL";
import defaultTheme from "../../lib/defaultTheme";
import React from "react";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
  title: "DGAUI/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: Object.keys(defaultTheme.palette),
      control: { type: "select" },
    },
    label: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    error: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    checked: {
      control: { type: "boolean" },
    },
  },
  args: {
    label: "Label",
    error: "",
    description: "",
    disabled: false,
    color: "primary",
    trailSwitch: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;

// Stories
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Label",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Label",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    error: "Error text",
  },
};

export const WithDescriptionAndError: Story = {
  args: {
    label: "Label",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    error: "Error text",
  },
};

export const trailSwitch: Story = {
  args: {
    label: "Label",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    error: "Error text",
    trailSwitch: true,
  },
};

export const Controlled: Story = {
  args: {
    label: "Label",
    checked: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <Switch
        {...args}
        onChange={(_e, isChecked) => updateArgs({ checked: isChecked })}
      />
    );
  },
};

export const RTL = withRtl(() => <Switch label="العنوان" />);

export const RTLTrailSwitch = withRtl(() => (
  <Switch
    label="العنوان"
    trailSwitch
    description='لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.'
    error="نص الخطأ"
  />
));
