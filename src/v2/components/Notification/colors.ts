// assets
import info from "./icons/info.png";
import error from "./icons/error.png";
import neutral from "./icons/neutral.png";
import success from "./icons/success.png";
import warning from "./icons/warning.png";

export type NotificationColor = {
  bg: string;
  text: string;
  border: string;
  icon: string;
};

const result = (them: Theme): { [k in 'success' | 'info' | 'neutral' | 'warning' | 'critical']: NotificationColor } => ({
  neutral: {
    bg: them.palette.neutral[50],
    text: them.palette.neutral[700],
    border: them.textColor,
    icon: neutral,
  },
  critical: {
    bg: them.palette.error[50],
    text: them.palette.error[700],
    border: them.palette.error[600],
    icon: error,
  },
  warning: {
    bg: them.palette.warning[50],
    text: them.palette.warning[700],
    border: them.palette.warning[600],
    icon: warning,
  },
  success: {
    bg: them.palette.success[50],
    text: them.palette.success[700],
    border: them.palette.success[600],
    icon: success,
  },
  info: {
    bg: "#EFF8FF",
    text: them.palette.info[700],
    border: them.palette.info[600],
    icon: info,
  },
});

export default result;
