type RadioColor = {
  default: string;
  hovered: string;
  active: string;
  disabled: string;
};

const radioColors = (them: Theme): { [k in ColorName]: RadioColor } => ({
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
  secondary: {
    default: them.palette.secondary[600],
    hovered: them.palette.secondary[800],
    active: them.palette.secondary[900],
    disabled: them.palette.neutral[200],
  },
  error: {
    default: them.palette.error[600],
    hovered: them.palette.error[800],
    active: them.palette.error[900],
    disabled: them.palette.neutral[200],
  },
  warning: {
    default: them.palette.warning[600],
    hovered: them.palette.warning[800],
    active: them.palette.warning[900],
    disabled: them.palette.neutral[200],
  },
  success: {
    default: them.palette.success[600],
    hovered: them.palette.success[800],
    active: them.palette.success[900],
    disabled: them.palette.neutral[200],
  },
  info: {
    default: them.palette.info[600],
    hovered: them.palette.info[800],
    active: them.palette.info[900],
    disabled: them.palette.neutral[200],
  },
});

export default radioColors;
