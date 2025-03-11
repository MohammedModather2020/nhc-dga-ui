import React from "react";
import ThemeProvider from "../components/ThemeProvider";

export const withRtl: (Component: React.FC<any>) => React.FC<React.ReactNode> =
  (Component) => () => (
    <ThemeProvider theme={{ direction: "rtl" }}>
      <Component />
    </ThemeProvider>
  );

export default withRtl;
