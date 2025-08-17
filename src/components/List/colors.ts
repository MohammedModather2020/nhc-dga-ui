export type ListColor = {
  text: string;
};

const result = (
  them: Theme
): { [k in "primary" | "neutral" | "on-color"]: ListColor } => ({
  neutral: {
    text: them.textColor,
  },
  primary: {
    text: them.palette.primary[600],
  },
  "on-color": {
    text: "#FFF",
  },
});

export default result;
