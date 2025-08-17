import { COLORS } from "../../lib/constants";

const colors = (
  them: Theme
): {
  [k in "primary" | "neutral" | "on-color"]: string;
} => ({
  primary: them.palette.primary.main,
  neutral: them.textColor,
  "on-color": them.textOnColor || COLORS.white,
});

export default colors;
