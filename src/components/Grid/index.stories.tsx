import { Meta, StoryObj } from "@storybook/react";
import Grid from ".";
import withRtl from "../../lib/RTL";
import "./story.css";

const meta = {
  title: "DGAUI/Grid",
  component: Grid,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;

// Stories
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    container: true,
    columnSpacing: 8,
    rowSpacing: 8,
    lg: 4,
    md: 6,
    sm: 12,
  },
  render: function Render(args) {
    return (
      <div style={{ width: 600 }}>
        <Grid {...args}>
          <Grid lg={args.lg} md={args.md} sm={args.sm}>
            Item 1
          </Grid>
          <Grid lg={args.lg} md={args.md} sm={args.sm}>
            Item 2
          </Grid>
          <Grid lg={args.lg} md={args.md} sm={args.sm}>
            Item 3
          </Grid>
          <Grid lg={args.lg} md={args.md} sm={args.sm}>
            Item 4
          </Grid>
          <Grid lg={args.lg} md={args.md} sm={args.sm}>
            Item 5
          </Grid>
          <Grid lg={args.lg} md={args.md} sm={args.sm}>
            Item 6
          </Grid>
        </Grid>
      </div>
    );
  },
};

export const Rtl = withRtl((args) => {
  return (
    <div style={{ width: 600 }}>
      <Grid container columnSpacing={8} rowSpacing={8}>
        <Grid lg={args.lg} md={args.md} sm={args.sm}>
          Item 1
        </Grid>
        <Grid lg={args.lg} md={args.md} sm={args.sm}>
          Item 2
        </Grid>
        <Grid lg={args.lg} md={args.md} sm={args.sm}>
          Item 3
        </Grid>
        <Grid lg={args.lg} md={args.md} sm={args.sm}>
          Item 4
        </Grid>
        <Grid lg={args.lg} md={args.md} sm={args.sm}>
          Item 5
        </Grid>
        <Grid lg={args.lg} md={args.md} sm={args.sm}>
          Item 6
        </Grid>
      </Grid>
    </div>
  );
});
