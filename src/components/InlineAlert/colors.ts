import neutralIcon from "../../assets/images/circle_neutral.png";
import successIcon from "../../assets/images/circle_success.png";
import infoIcon from "../../assets/images/circle_info.png";
import warningIcon from "../../assets/images/circle_warning.png";
import errorIcon from "../../assets/images/circle_error.png";

export type InlineAlertColor = {
  icon: string;
  vLine: string;
  font: string;
  bg: string;
  border: string;
};

const result = (them: Theme): { [k in ThemeColorName]: InlineAlertColor } => ({
  neutral: {
    icon: neutralIcon,
    vLine: them.palette.neutral[200],
    border: them.palette.neutral[200],
    font: them.palette.neutral[800],
    bg: them.palette.neutral[25],
  },
  error: {
    icon: errorIcon,
    vLine: them.palette.error[600],
    border: them.palette.error[200],
    font: them.palette.error[700],
    bg: them.palette.error[25],
  },
  warning: {
    icon: warningIcon,
    vLine: them.palette.warning[600],
    border: them.palette.warning[200],
    font: them.palette.warning[700],
    bg: them.palette.warning[25],
  },
  success: {
    icon: successIcon,
    vLine: them.palette.success[600],
    border: them.palette.success[200],
    font: them.palette.success[700],
    bg: them.palette.success[25],
  },
  info: {
    icon: infoIcon,
    vLine: them.palette.info[600],
    border: them.palette.neutral[200],
    font: them.palette.info[700],
    bg: them.palette.info[25],
  },
});

export default result;
