import { Meta } from "@storybook/react";
import Autocomplete, { sizes } from ".";
import withRtl from "../../../lib/RTL";
import React from "react";

type Option = {
  id: string;
  label: string;
  description: string;
};

const options: Option[] = [
  {
    id: "1",
    label: "Label 1",
    description: "Label 1 description",
  },
  {
    id: "2",
    label: "Label 2",
    description: "Label 2 description",
  },
  {
    id: "3",
    label: "Label 3",
    description: "Label 3 description",
  },
];

const meta = {
  title: "DGAUI/V2/Select/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
      table: { defaultValue: { summary: "large" } },
    },
    variant: {
      options: ["default", "darker", "lighter"],
      control: { type: "radio" },
      table: { defaultValue: { summary: "default" } },
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    maxTagsToShow: {
      control: { type: "number" },
    },
    maxTagsLabel: {
      control: { type: "text" },
    },
  },
  args: {
    size: "large",
    label: "Label",
    variant: "default",
    error: false,
    disabled: false,
    options,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;

// Stories
// type Story = StoryObj<typeof Autocomplete>;

export const Default = (args: any) => {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <Autocomplete
      label="Label"
      value={value}
      onChange={(_e, v) => Array.isArray(v) && setValue(v)}
      options={options}
      getOptionLabel={(el) => el.label}
      multiple
      placeholder="Test"
      size={args.size}
      variant={args.variant}
      error={args.error}
      disabled={args.disabled}
      maxTagsToShow={args.maxTagsToShow}
      maxTagsLabel={args.maxTagsLabel}
    />
  );
};

export const MultipleValues = () => {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <Autocomplete
      label="Label"
      value={value}
      onChange={(_e, v) => Array.isArray(v) && setValue(v)}
      options={options}
      getOptionLabel={(el) => el.label}
      multiple
      placeholder="Test"
    />
  );
};

export const MultipleValuesWith2MaxTags = () => {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <Autocomplete
      label="Label"
      value={value}
      onChange={(_e, v) => Array.isArray(v) && setValue(v)}
      options={options}
      getOptionLabel={(el) => el.label}
      multiple
      placeholder="Test"
      maxTagsToShow={2}
      maxTagsLabel={`${value.length} selected`}
    />
  );
};

export const SingleValues = () => {
  const [value, setValue] = React.useState<Option>();

  return (
    <Autocomplete
      label="Label"
      value={value}
      onChange={(_e, v) => !Array.isArray(v) && setValue(v)}
      options={options}
      getOptionLabel={(el) => el.label}
      multiple={false}
      placeholder="Test"
    />
  );
};

export const Error = () => {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <Autocomplete
      label="Label"
      value={value}
      onChange={(_e, v) => Array.isArray(v) && setValue(v)}
      options={options}
      getOptionLabel={(el) => el.label}
      multiple
      placeholder="Test"
      error={true}
    />
  );
};

export const RTL = withRtl(Default);
