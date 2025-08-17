type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Variant = "contained" | "outlined" | "text" | "transparent" | "solid";

type Size = "large" | "medium" | "small";

type ColorName = keyof ThemePalette;

type ThemeColorName = keyof ThemeColors;

type AllColorsNames = ColorName | "onColor";

type Color = {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  25: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

type Typography = {
  fontSize: string;
  lineHeight: string;
};

type ThemeColors = {
  neutral: Color;
  error: Color;
  warning: Color;
  info: Color;
  success: Color;
};

type ThemePalette = {
  primary: Color;
  secondary: Color;
} & ThemeColors;

type Theme = {
  direction: "rtl" | "ltr";
  textColor: string;
  textOnColor: string;
  fontFamily: string;
  palette: ThemePalette;
  typography: {
    h1: Typography;
    h2: Typography;
    h3: Typography;
    h4: Typography;
    h5: Typography;
    h6: Typography;
    xl: Typography;
    lg: Typography;
    md: Typography;
    sm: Typography;
    xs: Typography;
  };
  elevation: {
    shadows: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };
    backdropBlur: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  raduises: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  breakPoints: {
    sm: number;
    md: number;
    lg: number;
  };
};

type ThemeProps = DeepPartial<Theme>;

type SelectorsObject = {
  default?: string;
  hovered?: string;
  active?: string;
  disabled?: string;
  focus?: string;
};
