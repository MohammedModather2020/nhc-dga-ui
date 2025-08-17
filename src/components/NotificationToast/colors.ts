// assets
import iconInfo from './icons/circle_info.png'
import iconSuccess from './icons/circle_success.png'
import iconWarning from './icons/circle_warning.png'
import iconNeutral from './icons/circle_neutral.png'
import iconCritical from './icons/circle_critical.png'

export const getColors = (theme: Theme): { [k in 'critical' | 'warning' | 'success' | 'info' | 'neutral']: any } => ({
  neutral: {
    icon: iconNeutral,
    vLine: theme.palette.neutral[200],
    border: theme.palette.neutral[200],
    font: theme.palette.neutral[800],
    bg: theme.palette.neutral[25],
  },
  critical: {
    icon: iconCritical,
    vLine: theme.palette.error[600],
    border: theme.palette.error[200],
    font: theme.palette.error[700],
    bg: theme.palette.error[25],
  },
  warning: {
    icon: iconWarning,
    vLine: theme.palette.warning[600],
    border: theme.palette.warning[200],
    font: theme.palette.warning[700],
    bg: theme.palette.warning[25],
  },
  success: {
    icon: iconSuccess,
    vLine: theme.palette.success[600],
    border: theme.palette.success[200],
    font: theme.palette.success[700],
    bg: theme.palette.success[25],
  },
  info: {
    icon: iconInfo,
    vLine: theme.palette.info[600],
    border: theme.palette.info[200],
    font: theme.palette.info[700],
    bg: theme.palette.info[25],
  },
});