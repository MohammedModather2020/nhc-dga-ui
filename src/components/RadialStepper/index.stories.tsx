import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RadialStepper from ".";
import withRtl from "../../lib/RTL";
import Button from "../Button";
import { ThemeProvider } from "styled-components";

const meta = {
  title: "DGAUI/RadialStepper",
  component: RadialStepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["40px", "48px", "64px", "80px", "120px"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
  },
  args: {
    size: "120px",
    style: "primary",
    onColor: false,
    stepsCount: 12,
    activeStep: 4,
    innerCircleText: "1 of 4",
    stepName: "Step name",
    description: "This is step description",
    preStepName: "Previous step",
    nextStepName: "Next step",
  },
} satisfies Meta<typeof RadialStepper>;

export default meta;

// Stories
type Story = StoryObj<typeof RadialStepper>;

export const Default = (args: any) => {
  const [stepsCount] = React.useState(12);
  const [activeStep, setActiveStep] = React.useState(3);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 16,
          backgroundColor: args.onColor ? "#074D31" : "",
          marginBottom: 24,
        }}
      >
        <RadialStepper
          {...args}
          stepsCount={stepsCount}
          activeStep={activeStep}
          innerCircleText={`${activeStep} of ${stepsCount}`}
        />
      </div>

      <div>
        <Button
          leadIcon="+"
          iconOnly
          onClick={() =>
            activeStep < stepsCount && setActiveStep(activeStep + 1)
          }
        />
        <span style={{ padding: 16 }}>{activeStep}</span>
        <Button
          leadIcon="-"
          iconOnly
          onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
        />
      </div>
    </div>
  );
};

export const Rtl = withRtl((args: any) => {
  const [stepsCount] = React.useState(12);
  const [activeStep, setActiveStep] = React.useState(3);

  return (
    <ThemeProvider theme={{ direction: "rtl" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 16,
            backgroundColor: args.onColor ? "#074D31" : "",
            marginBottom: 24,
          }}
        >
          <RadialStepper
            size="120px"
            stepsCount={stepsCount}
            activeStep={activeStep}
            innerCircleText={`${activeStep} من ${stepsCount}`}
            stepName="اسم الخطوة"
            preStepName="السابق"
            description="وصف الخطوة"
            nextStepName="التالي"
          />
        </div>

        <div>
          <Button
            leadIcon="+"
            iconOnly
            onClick={() =>
              activeStep < stepsCount && setActiveStep(activeStep + 1)
            }
          />
          <span style={{ padding: 16 }}>{activeStep}</span>
          <Button
            leadIcon="-"
            iconOnly
            onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
          />
        </div>
      </div>
    </ThemeProvider>
  );
});
