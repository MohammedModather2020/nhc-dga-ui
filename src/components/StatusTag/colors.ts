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
export type TagStatusColorName = ColorName | ("green" | "red" | "yellow");

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
  primary: {
    subtle: {
      bg: them.palette.primary[50],
      iconBg: them.palette.primary[600],
      font: them.palette.primary[800],
    },
    inverted: {
      bg: them.palette.primary[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.primary[600],
      font: them.palette.neutral[800],
    },
  },
  secondary: {
    subtle: {
      bg: them.palette.secondary[50],
      iconBg: them.palette.secondary[600],
      font: them.palette.secondary[800],
    },
    inverted: {
      bg: them.palette.secondary[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.secondary[600],
      font: them.palette.neutral[800],
    },
  },
  error: {
    subtle: {
      bg: them.palette.error[50],
      iconBg: them.palette.error[600],
      font: them.palette.error[800],
    },
    inverted: {
      bg: them.palette.error[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.error[600],
      font: them.palette.neutral[800],
    },
  },
  warning: {
    subtle: {
      bg: them.palette.warning[50],
      iconBg: them.palette.warning[600],
      font: them.palette.warning[800],
    },
    inverted: {
      bg: them.palette.warning[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.warning[600],
      font: them.palette.neutral[800],
    },
  },
  success: {
    subtle: {
      bg: them.palette.success[50],
      iconBg: them.palette.success[600],
      font: them.palette.success[800],
    },
    inverted: {
      bg: them.palette.success[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.success[600],
      font: them.palette.neutral[800],
    },
  },
  info: {
    subtle: {
      bg: "#EFF8FF",
      iconBg: them.palette.info[600],
      font: them.palette.info[800],
    },
    inverted: {
      bg: them.palette.info[600],
      iconBg: "#ffffff99",
      font: "#fff",
    },
    ghost: {
      bg: "transparent",
      iconBg: them.palette.info[600],
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
