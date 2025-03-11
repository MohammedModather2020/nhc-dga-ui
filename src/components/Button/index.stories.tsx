import { Meta, StoryObj } from "@storybook/react";
import Button, { sizes } from ".";
import ThemeProvider from "../ThemeProvider";
import defaultTheme from "../../lib/defaultTheme";
import { variants } from "../../lib/constants";
import arrowImage from "../../assets/images/arrow.svg";
import React from "react";

const meta = {
  title: "DGAUI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: Object.keys(defaultTheme.palette),
      control: { type: "select" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
    variant: {
      options: variants,
      control: { type: "radio" },
    },
    disabled: {
      options: [false, true],
      control: { type: "boolean" },
    },
  },
  args: {
    color: "primary",
    size: "medium",
    variant: "contained",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

// Stories
type Story = StoryObj<typeof Button>;

export const PrimaryContained: Story = {
  args: {
    children: "Button",
  },
};

export const SecondaryContained: Story = {
  args: {
    color: "secondary",
    children: "Button",
  },
};

export const SecondaryContainedCustomTheme = () => (
  <ThemeProvider
    theme={{
      palette: {
        secondary: {
          25: "#FEFCFF",
          50: "#F9F5FA",
          100: "#F2E9F5",
          200: "#E1CCE8",
          300: "#CCADD9",
          400: "#A57BBA",
          500: "#80519F",
          600: "#6D428F",
          700: "#532D75",
          800: "#3D1D5E",
          900: "#281047",
          950: "#16072E",
          light: "#CCADD9",
          main: "#80519F",
          dark: "#532D75",
          contrastText: "#FFF",
        },
      },
    }}
  >
    <Button color="secondary">Button</Button>
  </ThemeProvider>
);

export const ErrorOutlined: Story = {
  args: {
    color: "error",
    variant: "outlined",
    children: "Button",
  },
};

export const warningText: Story = {
  args: {
    color: "warning",
    variant: "text",
    children: "Button",
  },
};

export const infoContained: Story = {
  args: {
    color: "info",
    children: "Button",
  },
};
export const successContained: Story = {
  args: {
    color: "success",
    children: "Button",
  },
};
export const WithIcon: Story = {
  args: {
    color: "neutral",
    children: (
      <>
        <span style={{ marginInlineEnd: 8 }}>Button</span>{" "}
        <img src={arrowImage} />
      </>
    ),
  },
};
export const disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};

export const ref = () => {
  const ref = React.useRef<HTMLButtonElement>(null);

  const clickOtherButtonHandler = () => {
    ref.current?.click();
  };

  return (
    <>
      <Button
        style={{ marginInlineEnd: 8 }}
        variant="outlined"
        onClick={clickOtherButtonHandler}
      >
        Click button 2 by ref
      </Button>
      <Button onClick={() => alert("Button 2 clicked")} ref={ref}>
        Button 2
      </Button>
    </>
  );
};
