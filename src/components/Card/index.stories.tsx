import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Card from ".";
import featuredIcon from "../../assets/images/featuredIcon.svg";
import withRtl from "../../lib/RTL";
import { useArgs } from "storybook/internal/preview-api";
import Button from "../Button";

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
    state: "default",
    effect: "withShadow",
    selected: false,
    expanded: false,
    icon: <img src={featuredIcon} />,
    actionsButtons: [
      <Button style="secondary-outline" size="large">
        Action
      </Button>,
      <Button style="primary" size="large">Action</Button>,
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

// New stories showcasing the updated prop structure
export const AllStates = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Card
      state="default"
      title="Default State"
      description="This card is in default state"
      icon={<img src={featuredIcon} />}
    />
    <Card
      state="hover"
      title="Hover State"
      description="This card shows hover state (background: theme.neutral[50])"
      icon={<img src={featuredIcon} />}
    />
    <Card
      state="focused"
      title="Focused State"
      description="This card shows focused state (border: theme.textColor)"
      icon={<img src={featuredIcon} />}
    />
    <Card
      state="disabled"
      title="Disabled State"
      description="This card is disabled"
      icon={<img src={featuredIcon} />}
    />
  </div>
);

export const AllEffects = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <Card
      effect="withShadow"
      title="With Shadow"
      description="This card has shadow effect"
      icon={<img src={featuredIcon} />}
    />
    <Card
      effect="noShadow"
      title="No Shadow"
      description="This card has no shadow"
      icon={<img src={featuredIcon} />}
    />
    <Card
      effect="stroke"
      title="Stroke"
      description="This card has stroke effect"
      icon={<img src={featuredIcon} />}
    />
  </div>
);

export const ExpandedControl = () => {
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <button onClick={() => setExpanded(!expanded)}>
        Toggle Expanded: {expanded ? "True" : "False"}
      </button>
      <Card
        type="expandable"
        expanded={expanded}
        title="Controlled Expansion"
        description="This card's expansion is controlled by external state"
        icon={<img src={featuredIcon} />}
        expandableContent="This content is shown when the card is expanded. The expansion state is controlled by the parent component."
      />
    </div>
  );
};

// New story to showcase both CSS and state-controlled styling
export const InteractiveStates = () => {
  const [cardState, setCardState] = React.useState<"default" | "hover" | "focused" | "disabled">("default");
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3>1. CSS Hover/Focus (Automatic):</h3>
        <p>These cards automatically respond to mouse hover and keyboard focus</p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Card
            type="selectable"
            state="default"
            title="Auto Hover/Focus"
            description="Hover over me or tab to focus - automatic CSS behavior"
            icon={<img src={featuredIcon} />}
          />
          <Card
            type="expandable"
            state="default"
            title="Expandable Auto States"
            description="I also have automatic hover/focus behavior"
            icon={<img src={featuredIcon} />}
            expandableContent="Content appears when expanded. Hover and focus still work."
          />
        </div>
      </div>
      
      <div>
        <h3>2. State Prop Control (Programmatic):</h3>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button onClick={() => setCardState("default")}>Default</button>
          <button onClick={() => setCardState("hover")}>Hover (neutral[50])</button>
          <button onClick={() => setCardState("focused")}>Focused (textColor)</button>
          <button onClick={() => setCardState("disabled")}>Disabled</button>
        </div>
        <p>Current state: <strong>{cardState}</strong></p>
        <Card
          type="selectable"
          state={cardState}
          title="State-Controlled Card"
          description={`This card's appearance is controlled via the state="${cardState}" prop`}
          icon={<img src={featuredIcon} />}
        />
      </div>
      
      <div>
        <h3>Key Benefits:</h3>
        <ul>
          <li><strong>CSS Automatic:</strong> Natural hover/focus behavior for interactive cards</li>
          <li><strong>State Control:</strong> Programmatic control for specific use cases</li>
          <li><strong>Both Work:</strong> You can use either approach or combine them</li>
        </ul>
      </div>
    </div>
  );
};

// New story to demonstrate action buttons only work with default type
export const ActionButtonsDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <h3>Action Buttons Only Show with Default Type:</h3>
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card
        type="default"
        title="Default Type"
        description="Has action buttons ✓"
        icon={<img src={featuredIcon} />}
        actionsButtons={[
          <Button style="secondary-outline" size="large">
            Cancel
          </Button>,
          <Button style="primary" size="large">Save</Button>,
        ]}
      />
      <Card
        type="selectable"
        title="Selectable Type"
        description="No action buttons (buttons are ignored)"
        icon={<img src={featuredIcon} />}
        actionsButtons={[
          <Button style="secondary-outline" size="large">
            Cancel
          </Button>,
          <Button style="primary" size="large">Save</Button>,
        ]}
      />
      <Card
        type="expandable"
        title="Expandable Type"
        description="No action buttons (buttons are ignored)"
        icon={<img src={featuredIcon} />}
        expandableContent="Expandable content here. Action buttons are not shown."
        actionsButtons={[
          <Button style="secondary-outline" size="large">
            Cancel
          </Button>,
          <Button style="primary" size="large">Save</Button>,
        ]}
      />
    </div>
  </div>
);
