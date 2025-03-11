import React from "react";

import defaultTheme from "../../lib/defaultTheme";

type Props = {
  theme: ThemeProps;
  children: React.ReactNode;
};

export const ThemeContext = React.createContext<ThemeProps | null>(null);

const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
