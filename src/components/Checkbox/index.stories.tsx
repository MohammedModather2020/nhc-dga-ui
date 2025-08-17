import { Meta, StoryObj } from "@storybook/react";
import Checkbox, { sizes } from ".";

import React from "react";
import withRtl from "../../lib/RTL";

const meta = {
  title: "DGAUI/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
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
  },
  args: {
    label: "Label",
    error: "",
    description: "",
    disabled: false,
    style: "primary",
    size: "medium",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

// Stories
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Label",
  },
};

export const Neutral: Story = {
  args: {
    label: "Label",
    style: "neutral",
  },
};

export const Primary: Story = {
  args: {
    label: "Label",
    style: "primary",
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Label",
    indeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Label",
    error: "Error message",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Label",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};

export const WithDescriptionAndError: Story = {
  args: {
    label: "Label",
    error: "Error message",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};

export const Controlled = () => {
  const [value, setValue] = React.useState(true);

  return (
    <Checkbox
      label="Label"
      value={value}
      onChange={(_e, value) => {
        console.log("value: ", value);
        setValue(value);
      }}
    />
  );
};

export const Rtl = withRtl(() => {
  return (
    <Checkbox
      label="عنوان"
      error="نص الخطأ"
      description='لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.'
    />
  );
});
