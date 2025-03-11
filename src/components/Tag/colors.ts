type ButtonColor = {
  bg: string;
  border: string;
  borderOutlined: string;
  font: string;
};

const result = (them: Theme): { [k in ColorName]: ButtonColor } => ({
  neutral: {
    bg: them.palette.neutral[50],
    border: them.palette.neutral[200],
    borderOutlined: them.palette.neutral[600],
    font: them.palette.neutral[800],
  },
  primary: {
    bg: them.palette.primary[50],
    border: them.palette.primary[200],
    borderOutlined: them.palette.primary[600],
    font: them.palette.primary[800],
  },
  secondary: {
    bg: them.palette.secondary[50],
    border: them.palette.secondary[200],
    borderOutlined: them.palette.secondary[600],
    font: them.palette.secondary[800],
  },
  error: {
    bg: them.palette.error[50],
    border: them.palette.error[200],
    borderOutlined: them.palette.error[600],
    font: them.palette.error[800],
  },
  warning: {
    bg: them.palette.warning[50],
    border: them.palette.warning[200],
    borderOutlined: them.palette.warning[600],
    font: them.palette.warning[800],
  },
  success: {
    bg: them.palette.success[50],
    border: them.palette.success[200],
    borderOutlined: them.palette.success[600],
    font: them.palette.success[800],
  },
  info: {
    bg: "#EFF8FF",
    border: them.palette.info[200],
    borderOutlined: them.palette.info[600],
    font: them.palette.info[800],
  },
});

export default result;
