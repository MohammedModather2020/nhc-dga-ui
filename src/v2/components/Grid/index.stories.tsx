import { Meta, StoryObj } from "@storybook/react";
import Grid from ".";
import withRtl from "../../../lib/RTL";
import "./story.css";

const meta = {
  title: "DGAUI/V2/Grid",
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
  },
  render: function Render(args) {
    return (
      <div style={{ width: 600 }}>
        <Grid {...args}>
          <Grid lg={4} md={6} sm={12}>
            Item 1
          </Grid>
          <Grid lg={4} md={6} sm={12}>
            Item 2
          </Grid>
          <Grid lg={4} md={6} sm={12}>
            Item 3
          </Grid>
          <Grid lg={4} md={6} sm={12}>
            Item 4
          </Grid>
          <Grid lg={4} md={6} sm={12}>
            Item 5
          </Grid>
          <Grid lg={4} md={6} sm={12}>
            Item 6
          </Grid>
        </Grid>
      </div>
    );
  },
};

export const Rtl = withRtl(() => {
  return (
    <div style={{ width: 600 }}>
      <Grid container columnSpacing={8} rowSpacing={8}>
        <Grid lg={4} md={6} sm={12}>
          Item 1
        </Grid>
        <Grid lg={4} md={6} sm={12}>
          Item 2
        </Grid>
        <Grid lg={4} md={6} sm={12}>
          Item 3
        </Grid>
        <Grid lg={4} md={6} sm={12}>
          Item 4
        </Grid>
        <Grid lg={4} md={6} sm={12}>
          Item 5
        </Grid>
        <Grid lg={4} md={6} sm={12}>
          Item 6
        </Grid>
      </Grid>
    </div>
  );
});
