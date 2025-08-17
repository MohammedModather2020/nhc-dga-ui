import { Meta, StoryObj } from "@storybook/react";
import ProgressIndicator from ".";
import withRtl from "../../lib/RTL";
import React from "react";

const meta = {
  title: "DGAUI/ProgressIndicator",
  component: ProgressIndicator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    alignment: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
    dot: {
      control: { type: "boolean" },
    },
  },
  args: {
    steps: [
      {
        title: "Step 1",
        description: "description 1",
      },
      {
        title: "Step 2",
        description: "description 2",
      },
      {
        title: "Step 3",
        description: "description 3",
      },
      {
        title: "Step 4",
        description: "description 4",
      },
    ],
    alignment: "horizontal",
    dot: false,
    activeStepIndex: 1,
  },
} satisfies Meta<typeof ProgressIndicator>;

export default meta;

// Stories
type Story = StoryObj<typeof ProgressIndicator>;

export const Default = (args: any) => {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  return (
    <div style={{ width: 800 }}>
      <ProgressIndicator
        {...args}
        activeStepIndex={activeStepIndex}
        onStepClick={(stepIndex) => setActiveStepIndex(stepIndex)}
      />
    </div>
  );
};

export const Rtl = withRtl(() => {
  return (
    <div style={{ width: 800 }}>
      <ProgressIndicator
        steps={[
          {
            title: "خطوة 1",
            description: "وصف 1",
          },
          {
            title: "خطوة 2",
            description: "وصف 2",
          },
          {
            title: "خطوة 3",
            description: "وصف 3",
          },
        ]}
        activeStepIndex={1}
      />
    </div>
  );
});

export const RtlVertical = withRtl(() => {
  return (
    <div style={{ width: 800 }}>
      <ProgressIndicator
        steps={[
          {
            title: "خطوة 1",
            description: "وصف 1",
          },
          {
            title: "خطوة 2",
            description: "وصف 2",
          },
          {
            title: "خطوة 3",
            description: "وصف 3",
          },
        ]}
        activeStepIndex={1}
        alignment="vertical"
      />
    </div>
  );
});
