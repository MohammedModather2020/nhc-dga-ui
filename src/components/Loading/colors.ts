const colors = (them: Theme): { [k in ColorName]: string } => ({
  neutral: them.textColor,
  primary: them.palette.primary.main,
  secondary: them.palette.secondary.main,
  error: them.palette.error.main,
  warning: them.palette.warning.main,
  success: them.palette.success.main,
  info: them.palette.info.main,
});

export default colors;
