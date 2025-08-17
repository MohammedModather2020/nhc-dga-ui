type ButtonColor = {
  bg: string;
  border: string;
  borderOutlined: string;
  fontColor: string;
};

const result = (
  them: Theme
): {
  [k in
    | "neutral"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "onColor"]: ButtonColor;
} => ({
  neutral: {
    bg: them.palette.neutral[50],
    border: them.palette.neutral[200],
    borderOutlined: them.palette.neutral[600],
    fontColor: them.palette.neutral[800],
  },
  success: {
    bg: them.palette.info[50],
    border: them.palette.success[200],
    borderOutlined: them.palette.success[700],
    fontColor: them.palette.success[800],
  },
  error: {
    bg: them.palette.error[50],
    border: them.palette.error[200],
    borderOutlined: them.palette.error[700],
    fontColor: them.palette.error[800],
  },
  warning: {
    bg: them.palette.warning[50],
    border: them.palette.warning[200],
    borderOutlined: them.palette.warning[700],
    fontColor: them.palette.warning[800],
  },
  info: {
    bg: "#EFF8FF",
    border: them.palette.info[200],
    borderOutlined: them.palette.info[700],
    fontColor: them.palette.info[800],
  },
  onColor: {
    bg: "rgba(255, 255, 255, 0.2)",
    border: "transparent",
    borderOutlined: "rgba(255, 255, 255, 0.6)",
    fontColor: them.textOnColor,
  },
});

export default result;
