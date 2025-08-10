import { Meta } from "@storybook/react";
import RadioGroup from ".";
import withRtl from "../../../lib/RTL";
import Radio from "../Radio";
import React from "react";

const meta = {
  title: "DGAUI/V2/Radio/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Horizontal = () => {
  const [value, setValue] = React.useState("x");

  return (
    <RadioGroup
      name="groupNameHorizonral"
      onChange={(_e, selectedValue) => setValue(selectedValue)}
      value={value}
    >
      <Radio style="primary" value={"x"} label="Radio 1" />
      <Radio style="primary" value={"y"} label="Radio 2" />
      <Radio style="primary" value={"z"} label="Radio 3" />
    </RadioGroup>
  );
};

export const Vertical = () => {
  const [value, setValue] = React.useState("x");

  return (
    <RadioGroup
      name="groupNameVertiaval"
      onChange={(_e, selectedValue) => setValue(selectedValue)}
      value={value}
      layout="vertiaval"
    >
      <Radio value={"x"} label="Radio 1" />
      <Radio value={"y"} label="Radio 2" />
      <Radio value={"z"} label="Radio 3" />
    </RadioGroup>
  );
};

export const Rtl = withRtl(() => {
  const [value, setValue] = React.useState("x");

  return (
    <RadioGroup
      name="groupNameHorizonral"
      onChange={(_e, selectedValue) => setValue(selectedValue)}
      value={value}
    >
      <Radio value={"x"} label="خيار ١" />
      <Radio value={"y"} label="خيار ٢" />
      <Radio value={"z"} label="خيار ٣" />
    </RadioGroup>
  );
});
