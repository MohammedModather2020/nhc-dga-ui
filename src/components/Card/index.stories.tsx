import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Card from ".";
import featuredIcon from "./featuredIcon.svg";
import withRtl from "../../lib/RTL";
import Button from "../Button";
import { useArgs } from "storybook/internal/preview-api";

const meta = {
  title: "DGAUI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

// Stories
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    type: "default",
    effect: "withShadow",
    selected: false,
    defaultExpanded: false,
    disabled: false,
    icon: <img src={featuredIcon} />,
    actionsButtons: [
      <Button color="neutral" variant="outlined" size="large">
        Action
      </Button>,
      <Button size="large">Action</Button>,
    ],
    title: "Card Title",
    description: "Card content placeholder text goes here",
    expandableContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <Card
        {...args}
        onChange={(_e, value) => updateArgs({ selected: value })}
      />
    );
  },
};

export const SelectableGroup = () => {
  const [values, setValues] = React.useState([false, false]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Card
          type="selectable"
          icon={<img src={featuredIcon} />}
          title="Card Title 1"
          description="Card content 1"
          selected={values[0]}
          onChange={(_e, value) => setValues([value, values[1]])}
        />
      </div>
      <Card
        type="selectable"
        icon={<img src={featuredIcon} />}
        title="Card Title 2"
        description="Card content 2"
        selected={values[1]}
        onChange={(_e, value) => setValues([values[0], value])}
      />
    </div>
  );
};

export const RtlExpandable = withRtl(() => {
  return (
    <Card
      type="expandable"
      icon={<img src={featuredIcon} />}
      title="عنوان البطاقة"
      description="نص إضافي لمحتوى البطاقة"
      expandableContent={`
        لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف. خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.
        `}
    />
  );
});

export const RtlSelectable = withRtl(() => {
  return (
    <Card
      type="selectable"
      icon={<img src={featuredIcon} />}
      title="عنوان البطاقة"
      description="نص إضافي لمحتوى البطاقة"
    />
  );
});
