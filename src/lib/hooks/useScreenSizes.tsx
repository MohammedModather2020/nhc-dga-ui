import React from "react";

const useScreenSizes = (mobileThreshold = 768, tabletThreshold = 1024) => {
  const [result, setResult] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  React.useEffect(() => {
    const resizeHandler = () =>
      setResult({
        isMobile: window.innerWidth <= mobileThreshold,
        isTablet:
          window.innerWidth > mobileThreshold &&
          window.innerWidth <= tabletThreshold,
        isDesktop: window.innerWidth > tabletThreshold,
      });
    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return result;
};

export default useScreenSizes;
