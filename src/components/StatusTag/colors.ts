type TagStatusVariantColors = {
  bg: string;
  iconBg: string;
  font: string;
};

export type TagStatusVariantDetails = {
  subtle: TagStatusVariantColors;
  inverted: TagStatusVariantColors;
  ghost: TagStatusVariantColors;
};
export type TagStatusVariant = keyof TagStatusVariantDetails;
export type TagStatusColorName =
  | "neutral"
  | "green"
  | "blue"
  | "yellow"
  | "red";

const result = (
  them: Theme
): { [k in TagStatusColorName]: TagStatusVariantDetails } => ({
  neutral: {
    subtle: {
      bg: them.palette.neutral[50],
      iconBg: them.palette.neutral[600],
      font: them.palette.neutral[800],
    },
    inverted: {
      bg: them.palette.neutral[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.neutral[600],
      font: them.palette.neutral[800],
    },
  },

  blue: {
    subtle: {
      bg: "#EFF8FF",
      iconBg: them.palette.info[800],
      font: them.palette.info[800],
    },
    inverted: {
      bg: them.palette.info[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.info[800],
      font: them.palette.neutral[800],
    },
  },
  green: {
    subtle: {
      bg: them.palette.success[50],
      iconBg: them.palette.success[800],
      font: them.palette.success[800],
    },
    inverted: {
      bg: them.palette.success[700],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.success[800],
      font: them.palette.neutral[800],
    },
  },
  red: {
    subtle: {
      bg: them.palette.error[50],
      iconBg: them.palette.error[800],
      font: them.palette.error[800],
    },
    inverted: {
      bg: them.palette.error[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.error[800],
      font: them.palette.neutral[800],
    },
  },
  yellow: {
    subtle: {
      bg: them.palette.warning[50],
      iconBg: them.palette.warning[800],
      font: them.palette.warning[800],
    },
    inverted: {
      bg: them.palette.warning[700],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.warning[800],
      font: them.palette.neutral[800],
    },
  },
});

export default result;
