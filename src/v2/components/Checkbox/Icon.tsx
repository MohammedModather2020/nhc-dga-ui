import React from "react";

type Props = {
  indeterminate?: boolean;
};

const Icon: React.FC<Props> = ({ indeterminate = false }) => {
  if (indeterminate) {
    return (
      <svg
        width="12"
        height="2"
        viewBox="0 0 12 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="12" height="2" rx="1" className="checkmark" fill="white" />
      </svg>
    );
  }

  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5945 0.535432C12.1352 1.07616 12.1352 1.95286 11.5945 2.4936L5.2483 8.83982C4.98864 9.09949 4.63645 9.24537 4.26923 9.24537C3.90201 9.24537 3.54983 9.09949 3.29016 8.83982L0.405544 5.95517C-0.135181 5.41444 -0.135181 4.53774 0.405545 3.99701C0.946271 3.45628 1.82296 3.45628 2.36369 3.99701L4.26923 5.90257L9.63631 0.535432C10.177 -0.00530017 11.0537 -0.00530013 11.5945 0.535432Z"
        className="checkmark"
        fill="white"
      />
    </svg>
  );
};

export default Icon;
