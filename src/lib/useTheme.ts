import React from "react";
import { ThemeContext } from "../components/ThemeProvider";
import defaultTheme from "./defaultTheme";
import { mergeThemes } from "./helpers";
import "../assets/css/globalStyles.css";

const useTheme = (): Theme => {
  const theme = React.useContext(ThemeContext);

  let result = defaultTheme;

  // Merge theme props provided from user, with dga default theme.
  if (theme) {
    result = mergeThemes(defaultTheme, theme);
  }

  return result;
};

export default useTheme;
