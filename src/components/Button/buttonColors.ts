import { COLORS } from "../../lib/constants";

type Button2Color = {
  backgroundColor: SelectorsObject;
  fontColor: SelectorsObject;
  borderColor?: SelectorsObject;
  innerBorderColor?: SelectorsObject;
};

const result = (
  theme: Theme,
  onColor: boolean = false,
  destructive: boolean = false
): {
  [k in
    | "primary"
    | "neutral"
    | "secondary-solid"
    | "secondary-outline"
    | "subtle"
    | "transparent"]: Button2Color;
} => {
  /*
  *****************
    onColor = false
    destructive = false
  *****************
  */
  if (!onColor && !destructive) {
    return {
      neutral: {
        backgroundColor: {
          default: theme.palette.neutral[950],
          hovered: theme.palette.neutral[800],
          active: theme.palette.neutral[600],
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
        innerBorderColor: {
          focus: COLORS.white,
        },
      },
      primary: {
        backgroundColor: {
          default: theme.palette.primary[600],
          hovered: theme.palette.primary[700],
          active: theme.palette.primary[900],
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
        innerBorderColor: {
          focus: COLORS.white,
        },
      },
      "secondary-solid": {
        backgroundColor: {
          default: theme.palette.neutral[100],
          hovered: theme.palette.neutral[200],
          active: theme.palette.neutral[200],
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.textColor,
          hovered: theme.textColor,
          active: theme.textColor,
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
      },
      "secondary-outline": {
        backgroundColor: {
          default: "transparent",
          hovered: theme.palette.neutral[100],
          active: theme.palette.neutral[200],
          disabled: "transparent",
        },
        fontColor: {
          default: theme.textColor,
          hovered: theme.textColor,
          active: theme.textColor,
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          default: theme.palette.neutral[300],
          hovered: theme.palette.neutral[200],
          active: theme.palette.neutral[300],
          disabled: theme.palette.neutral[400],
          focus: theme.textColor,
        },
      },
      subtle: {
        backgroundColor: {
          default: "transparent",
          hovered: theme.palette.neutral[100],
          active: theme.palette.neutral[200],
          disabled: "transparent",
        },
        fontColor: {
          default: theme.textColor,
          hovered: theme.textColor,
          active: theme.textColor,
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
      },
      transparent: {
        backgroundColor: {
          default: "transparent",
          hovered: "transparent",
          active: "transparent",
          disabled: "transparent",
        },
        fontColor: {
          default: theme.textColor,
          hovered: theme.palette.primary[700],
          active: theme.palette.primary[900],
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
      },
    };
  }

  /*
  *****************
    onColor = false
    destructive = true
  *****************
  */

  //  neutral style and disabled status are not set by dga //

  if (!onColor && destructive) {
    return {
      neutral: {
        backgroundColor: {
          default: theme.palette.neutral[950],
          hovered: theme.palette.neutral[800],
          active: theme.palette.neutral[600],
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: theme.palette.neutral[400],
        },
      },
      primary: {
        backgroundColor: {
          default: theme.palette.error[600],
          hovered: theme.palette.error[700],
          active: theme.palette.error[900],
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
        innerBorderColor: {
          focus: COLORS.white,
        },
      },
      "secondary-solid": {
        backgroundColor: {
          default: theme.palette.error[50],
          hovered: theme.palette.error[100],
          active: theme.palette.error[200],
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.palette.error[700],
          hovered: theme.palette.error[200],
          active: theme.palette.error[200],
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
      },
      "secondary-outline": {
        backgroundColor: {
          default: "transparent",
          hovered: theme.palette.error[100],
          active: theme.palette.error[200],
          disabled: "transparent",
        },
        fontColor: {
          default: theme.palette.error[700],
          hovered: theme.palette.error[700],
          active: theme.palette.error[700],
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          default: theme.palette.error[200],
          hovered: theme.palette.error[200],
          active: theme.palette.error[200],
          disabled: theme.palette.neutral[400],
          focus: theme.textColor,
        },
      },
      subtle: {
        backgroundColor: {
          default: "transparent",
          hovered: theme.palette.error[100],
          active: theme.palette.error[200],
          disabled: "transparent",
        },
        fontColor: {
          default: theme.palette.error[700],
          hovered: theme.palette.error[700],
          active: theme.palette.error[700],
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
      },
      transparent: {
        backgroundColor: {
          default: "transparent",
          hovered: "transparent",
          active: "transparent",
          disabled: "transparent",
        },
        fontColor: {
          default: theme.palette.error[600],
          hovered: theme.palette.error[700],
          active: theme.palette.error[900],
          disabled: theme.palette.neutral[400],
        },
        borderColor: {
          focus: theme.textColor,
        },
      },
    };
  }

  /*
  *****************
    onColor = true
    destructive = false
  *****************
  */
  if (onColor && !destructive) {
    return {
      neutral: {
        backgroundColor: {
          default: COLORS.white,
          hovered: COLORS.white80, // 80% opacity
          active: COLORS.white60, // 60% opacity
          disabled: COLORS.white20, // 20% opacity
        },
        fontColor: {
          default: theme.textColor,
          hovered: theme.textColor,
          active: theme.textColor,
          disabled: COLORS.white40, // 40% opacity
        },
        borderColor: {
          focus: COLORS.white,
        },
        innerBorderColor: {
          focus: theme.textColor,
        },
      },
      primary: {
        backgroundColor: {
          default: COLORS.white,
          hovered: COLORS.white80, // 80% opacity
          active: COLORS.white60, // 60% opacity
          disabled: COLORS.white20, // 20% opacity
        },
        fontColor: {
          default: theme.textColor,
          hovered: theme.textColor,
          active: theme.textColor,
          disabled: COLORS.white40, // 40% opacity
        },
        borderColor: {
          focus: COLORS.white,
        },
        innerBorderColor: {
          focus: theme.textColor,
        },
      },
      "secondary-solid": {
        backgroundColor: {
          default: COLORS.white20, // 20% opacity
          hovered: COLORS.white20, // 20% opacity
          active: COLORS.white40, // 40% opacity
          disabled: theme.palette.neutral[200],
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: COLORS.white40, // 40% opacity
        },
        borderColor: {
          focus: COLORS.white,
        },
      },
      "secondary-outline": {
        backgroundColor: {
          default: "transparent",
          hovered: COLORS.white20, // 20% opacity
          active: COLORS.white40, // 40% opacity
          disabled: "transparent",
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: COLORS.white40, // 40% opacity
        },
        borderColor: {
          default: COLORS.white40,
          hovered: COLORS.white40,
          active: COLORS.white40,
          disabled: theme.palette.neutral[400],
          focus: COLORS.white,
        },
      },
      subtle: {
        backgroundColor: {
          default: "transparent",
          hovered: COLORS.white20, // 20% opacity
          active: COLORS.white40, // 40% opacity
          disabled: "transparent",
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.textOnColor || COLORS.white,
          active: theme.textOnColor || COLORS.white,
          disabled: COLORS.white40, // 40% opacity
        },
        borderColor: {
          focus: COLORS.white,
        },
      },
      transparent: {
        backgroundColor: {
          default: "transparent",
          hovered: "transparent",
          active: "transparent",
          disabled: "transparent",
        },
        fontColor: {
          default: theme.textOnColor || COLORS.white,
          hovered: theme.palette.primary[400],
          active: theme.palette.primary[300],
          disabled: COLORS.white40, // 40% opacity
        },
        borderColor: {
          focus: COLORS.white,
        },
      },
    };
  }

  /*
  *****************
    onColor = true
    destructive = true
  *****************
  */
  if (onColor && destructive) {
  }
  return {
    neutral: {
      backgroundColor: {
        default: theme.palette.neutral[950],
        hovered: theme.palette.neutral[800],
        active: theme.palette.neutral[600],
        disabled: theme.palette.neutral[200],
      },
      fontColor: {
        default: theme.textOnColor || COLORS.white,
        hovered: theme.textOnColor || COLORS.white,
        active: theme.textOnColor || COLORS.white,
        disabled: theme.palette.neutral[400],
      },
    },
    primary: {
      backgroundColor: {
        default: theme.palette.error[600],
        hovered: theme.palette.error[700],
        active: theme.palette.error[900],
        disabled: theme.palette.neutral[200],
      },
      fontColor: {
        default: theme.textOnColor || COLORS.white,
        hovered: theme.textOnColor || COLORS.white,
        active: theme.textOnColor || COLORS.white,
        disabled: theme.palette.neutral[400],
      },
      borderColor: {
        focus: COLORS.white,
      },
      innerBorderColor: {
        focus: theme.textColor,
      },
    },
    "secondary-solid": {
      backgroundColor: {
        default: theme.palette.error[50],
        hovered: theme.palette.error[100],
        active: theme.palette.error[200],
        disabled: theme.palette.neutral[200],
      },
      fontColor: {
        default: theme.palette.error[700],
        hovered: theme.palette.error[200],
        active: theme.palette.error[200],
        disabled: theme.palette.neutral[400],
      },
      borderColor: {
        focus: COLORS.white,
      },
    },
    "secondary-outline": {
      backgroundColor: {
        default: "transparent",
        hovered: theme.palette.error[100],
        active: theme.palette.error[200],
        disabled: "transparent",
      },
      fontColor: {
        default: theme.palette.error[200],
        hovered: theme.palette.error[700],
        active: theme.palette.error[700],
        disabled: theme.palette.neutral[400],
      },
      borderColor: {
        default: theme.palette.error[200],
        hovered: theme.palette.error[200],
        active: theme.palette.error[200],
        disabled: theme.palette.neutral[400],
        focus: COLORS.white,
      },
    },
    subtle: {
      backgroundColor: {
        default: "transparent",
        hovered: theme.palette.error[100],
        active: theme.palette.error[200],
        disabled: "transparent",
      },
      fontColor: {
        default: theme.palette.error[200],
        hovered: theme.palette.error[700],
        active: theme.palette.error[700],
        disabled: theme.palette.neutral[400],
      },
      borderColor: {
        focus: COLORS.white,
      },
    },
    transparent: {
      backgroundColor: {
        default: "transparent",
        hovered: "transparent",
        active: "transparent",
        disabled: "transparent",
      },
      fontColor: {
        default: theme.palette.error[200],
        hovered: theme.palette.error[300],
        active: theme.palette.error[400],
        disabled: theme.palette.neutral[400],
      },
      borderColor: {
        focus: COLORS.white,
      },
    },
  };
};

export default result;
