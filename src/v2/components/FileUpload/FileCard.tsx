import React from "react";
import styled from "styled-components";

export type FileCardStatus = "loading" | "success" | "error";
import xIcon from "../../../assets/images/x.png";
import successIcon from "../../../assets/images/successFillCirecle.svg";
import errorIcon from "../../../assets/images/errorFillCircle.svg";

type Props = {
  status?: FileCardStatus;
  filename: React.ReactNode;
  helperText?: React.ReactNode;
  onDelete: Function;
  theme: Theme;
};

const FileCard: React.FC<Props> = ({
  status,
  filename,
  helperText,
  onDelete,
  theme,
}) => {
  return (
    <StyledComponent
      className={"dgaui dgaui_fileCard " + (status === "error" ? "error" : "")}
      $theme={theme}
    >
      <div className="dgaui_fileCardContent">
        <div className={"dgaui_fileCardFileName"}>
          {status === "loading" && (
            <span className="dgaui_loader dgaui_fileCardIcon" />
          )}
          {status === "success" && (
            <img className="dgaui_fileCardIcon" src={successIcon} />
          )}
          {status === "error" && (
            <img className="dgaui_fileCardIcon" src={errorIcon} />
          )}
          {filename}
        </div>

        <img
          src={xIcon}
          className="dgaui_fileCardCloseIcon"
          onClick={() => onDelete()}
        />
      </div>
      {status === "error" && helperText && (
        <div className="dgaui_fileCardContentError">{helperText}</div>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{ $theme: Theme }>`
  direction: ${(props) => props.$theme.direction};
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid ${(p) => p.$theme.palette.neutral[300]};
  height: 36px;
  width: 100%;
  background-color: ${(p) => p.$theme.palette.neutral[100]};
  box-sizing: border-box;
  font-weight: 500;

  .dgaui_fileCardContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;

    .dgaui_loader {
      border: 2px solid ${(p) => p.$theme.textColor};
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .dgaui_fileCardFileName {
      display: flex;
      align-items: center;
    }

    .dgaui_fileCardCloseIcon {
      cursor: pointer;
    }

    .dgaui_fileCardIcon {
      margin-inline-end: 8px;
      width: 20px;
      height: 20px;
    }
  }

  &.error {
    border: 1px solid ${(p) => p.$theme.palette.error[700]};
    height: auto;
    min-height: 36px;

    .dgaui_fileCardContentError {
      color: #ce281c;
      border-top: 1px solid ${(p) => p.$theme.palette.neutral[300]};
      font-weight: 400;
      padding: 8px;
    }
  }
`;

export default FileCard;
