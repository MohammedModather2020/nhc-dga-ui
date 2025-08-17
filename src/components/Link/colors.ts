export type LinkColor = {
  default: string;
  hovered: string;
  active: string;
  visited: string;
  disabled: string;
};

const result = (
  them: Theme
): {
  [k in "primary" | "neutral" | "on-color"]: LinkColor;
} => ({
  primary: {
    default: them.palette.primary[600],
    hovered: them.palette.primary[400],
    active: them.palette.primary[600],
    visited: them.palette.primary[800],
    disabled: them.palette.neutral[400],
  },
  neutral: {
    default: them.palette.neutral[700],
    hovered: them.palette.neutral[500],
    active: them.palette.neutral[400],
    visited: them.palette.primary[800],
    disabled: them.palette.neutral[400],
  },
  "on-color": {
    default: "#FFF",
    hovered: "rgba(255, 255, 255, 0.8)",
    active: "rgba(255, 255, 255, 0.6)",
    visited: "rgba(255, 255, 255, 0.9)",
    disabled: "rgba(255, 255, 255, 0.3)",
  },
});

export default result;
