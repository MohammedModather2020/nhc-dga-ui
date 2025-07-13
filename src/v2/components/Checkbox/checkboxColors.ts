type RadioColor = {
  default: string;
  hovered: string;
  active: string;
  disabled: string;
};

type colors = "primary" | "neutral";

const radioColors = (them: Theme): { [k in colors]: RadioColor } => ({
  neutral: {
    default: them.palette.neutral[600],
    hovered: them.palette.neutral[800],
    active: them.palette.neutral[900],
    disabled: them.palette.neutral[200],
  },
  primary: {
    default: them.palette.primary[600],
    hovered: them.palette.primary[800],
    active: them.palette.primary[900],
    disabled: them.palette.neutral[200],
  },
});

export default radioColors;
