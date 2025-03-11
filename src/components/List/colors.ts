export type ListColor = {
  text: string;
};

const result = (them: Theme): { [k in AllColorsNames]: ListColor } => ({
  neutral: {
    text: them.textColor,
  },
  primary: {
    text: them.palette.primary[600],
  },
  secondary: {
    text: them.palette.secondary[600],
  },
  error: {
    text: them.palette.error[600],
  },
  warning: {
    text: them.palette.warning[600],
  },
  success: {
    text: them.palette.success[600],
  },
  info: {
    text: them.palette.info[600],
  },
  onColor: {
    text: "#FFF",
  },
});

export default result;
