import { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from ".";
import withRtl from "../../lib/RTL";
import React from "react";

const meta = {
  title: "DGAUI/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { step: 2 },
    },
  },
  args: {
    items: [
      { label: "Link 1", onClick: () => alert("Link 1 clicked") },
      { label: "Link 2" },
      { label: "Link 3" },
      { label: "Link 4" },
      { label: "Link 5" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

// Stories
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const ExtraItems = () => (
  <Breadcrumb
    items={[
      { label: "Link 1", onClick: () => alert("Link 1 clicked") },
      { label: "Link 2" },
      { label: "Link 3" },
      { label: "Link 4" },
      { label: "Link 5" },
      { label: "Link 6" },
    ]}
  />
);

export const RTL = withRtl(() => (
  <Breadcrumb
    items={[
      { label: "رابط ١", onClick: () => alert("رابط ١") },
      { label: "رابط ٢" },
      { label: "رابط ٣" },
      { label: "رابط ٤" },
      { label: "رابط ٥" },
      { label: "رابط ٦" },
    ]}
  />
));
