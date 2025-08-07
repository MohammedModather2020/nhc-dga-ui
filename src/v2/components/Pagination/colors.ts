export type LinkColor = {
  default: string;
  hovered: string;
  active: string;
  visited: string;
  disabled: string;
};

const result = (them: Theme): { [k in AllColorsNames]: LinkColor } => ({
  neutral: {
    default: them.palette.neutral[700],
    hovered: them.palette.neutral[500],
    active: them.palette.neutral[400],
    visited: them.palette.primary[800],
    disabled: them.palette.neutral[400],
  },
  primary: {
    default: them.palette.primary[600],
    hovered: them.palette.primary[400],
    active: them.palette.primary[600],
    visited: them.palette.primary[800],
    disabled: them.palette.neutral[400],
  },
  secondary: {
    default: them.palette.secondary[600],
    hovered: them.palette.secondary[400],
    active: them.palette.secondary[600],
    visited: them.palette.secondary[800],
    disabled: them.palette.neutral[400],
  },
  error: {
    default: them.palette.error[600],
    hovered: them.palette.error[400],
    active: them.palette.error[600],
    visited: them.palette.error[800],
    disabled: them.palette.neutral[400],
  },
  warning: {
    default: them.palette.warning[600],
    hovered: them.palette.warning[400],
    active: them.palette.warning[600],
    visited: them.palette.warning[800],
    disabled: them.palette.neutral[400],
  },
  success: {
    default: them.palette.success[600],
    hovered: them.palette.success[400],
    active: them.palette.success[600],
    visited: them.palette.success[800],
    disabled: them.palette.neutral[400],
  },
  info: {
    default: them.palette.info[600],
    hovered: them.palette.info[400],
    active: them.palette.info[600],
    visited: them.palette.info[800],
    disabled: them.palette.neutral[400],
  },
  onColor: {
    default: "#FFF",
    hovered: "rgba(255, 255, 255, 0.8)",
    active: "rgba(255, 255, 255, 0.6)",
    visited: "rgba(255, 255, 255, 0.9)",
    disabled: "rgba(255, 255, 255, 0.3)",
  },
});

export default result;
