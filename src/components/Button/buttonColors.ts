type ButtonColor = {
  default: string;
  hovered: string;
  active: string;
  disabled: string;
};

const result = (them: Theme): { [k in ColorName]: ButtonColor } => ({
  neutral: {
    default: them.palette.neutral[950],
    hovered: them.palette.neutral[800],
    active: them.palette.neutral[600],
    disabled: them.palette.neutral[200],
  },
  primary: {
    default: them.palette.primary[600],
    hovered: them.palette.primary[700],
    active: them.palette.primary[900],
    disabled: them.palette.neutral[200],
  },
  secondary: {
    default: them.palette.secondary[600],
    hovered: them.palette.secondary[700],
    active: them.palette.secondary[800],
    disabled: them.palette.neutral[200],
  },
  error: {
    default: them.palette.error[600],
    hovered: them.palette.error[700],
    active: them.palette.error[800],
    disabled: them.palette.error.contrastText,
  },
  warning: {
    default: them.palette.warning[600],
    hovered: them.palette.warning[700],
    active: them.palette.warning[800],
    disabled: them.palette.warning.contrastText,
  },
  success: {
    default: them.palette.success[600],
    hovered: them.palette.success[700],
    active: them.palette.success[800],
    disabled: them.palette.success.contrastText,
  },
  info: {
    default: them.palette.info[600],
    hovered: them.palette.info[700],
    active: them.palette.info[800],
    disabled: them.palette.info.contrastText,
  },
});

export default result;
