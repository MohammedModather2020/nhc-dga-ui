import React from "react";
import styled from "styled-components";
import useTheme from "../../lib/useTheme";
import { mergeStrings } from "../../lib/helpers";
import buttonCloseIcon from "../../assets/images/x.png";
import useScreenSizes from "../../lib/hooks/useScreenSizes";
import Button from "../Button";

interface DGA_ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  align?: "start" | "center";
  size?: "auto" | 600;
  open: boolean;
  onClose?: Function;
  footerStartButtons?: React.ReactElement<typeof Button>[];
  footerEndButtons?: React.ReactElement<typeof Button>[];
}

const Modal: React.FC<DGA_ModalProps> = ({
  icon,
  title,
  body,
  align,
  size = 600,
  open,
  onClose,
  footerStartButtons,
  footerEndButtons,
  ...props
}) => {
  const theme = useTheme();
  const screenSizes = useScreenSizes();
  const ref = React.useRef(null);

  if (!open) return null;

  return (
    <>
      <Backdrop
        className={"dgaui dgaui_modal_backdrop"}
        onClick={() => onClose?.()}
      />

      <StyledComponent
        $theme={theme}
        $align={align === "start" ? "flex-start" : "center"}
        $size={size}
        className={mergeStrings("dgaui dgaui_modal " + props.className)}
      >
        <div
          {...props}
          ref={ref}
          className={
            "dgaui_modalContent" +
            (screenSizes.isMobile ? " dgaui_modalMobile" : "")
          }
        >
          <div className="dgaui_modalClose" onClick={() => onClose?.()} />

          {(title || icon) && (
            <div className="dgaui_modalHeader">
              {icon && <div className="dgaui_modalHeaderIcon">{icon}</div>}
              {title && <div className="dgaui_modalHeaderTitle">{title}</div>}
            </div>
          )}

          {body && (
            <div className="dgaui_modalHeaderBody dgaui_hiddenScrollbar">
              {body}
            </div>
          )}

          {(!!footerStartButtons || !!footerEndButtons) && (
            <div
              className={
                "dgaui_modalHeaderFooter " +
                (!footerStartButtons && !!footerEndButtons ? "onlyEnd" : "")
              }
            >
              {footerStartButtons && (
                <div className="dgaui_modalHeaderFooterStart">
                  {footerStartButtons}
                </div>
              )}
              {footerEndButtons && (
                <div className="dgaui_modalHeaderFooterEnd">
                  {footerEndButtons}
                </div>
              )}
            </div>
          )}
        </div>
      </StyledComponent>
    </>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $align?: string;
  $size?: "auto" | 600;
}>`
  position: fixed;
  z-index: 2401;
  opacity: 0;
  animation: opacity 0.225s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  inset: 0;

  &.dgaui_modal {
    opacity: 1;
  }

  @keyframes opacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .dgaui_modalContent {
    height: fit-content;
    direction: ${(p) => p.$theme.direction};
    width: ${(p) => (p.$size === "auto" ? p.$size : p.$size + "px")};
    padding: 8px;
    background-color: #fff;
    border-radius: 8px;
    ${(p) => p.$theme.elevation.shadows["3xl"]};
    position: relative;

    .dgaui_modalClose {
      position: absolute;
      top: 20px;
      inset-inline-end: 20px;
      cursor: pointer;
      background-image: url(${buttonCloseIcon});
      background-repeat: no-repeat;
      width: 20px;
      height: 20px;

      &:hover {
        transform: scale(1.1);
      }
    }

    .dgaui_modalHeader {
      display: flex;
      flex-direction: column;
      align-items: ${(p) => p.$align};
      margin-bottom: 8px;
      padding: 0 16px;

      .dgaui_modalHeaderIcon {
        height: 40px;
        margin-bottom: 8px;
      }
      .dgaui_modalHeaderTitle {
        font-size: 16px;
        font-weight: 600;
        min-height: 40px;
        display: flex;
        align-items: center;
        color: ${({ $theme }) => $theme.palette.neutral[800]};
      }
    }

    .dgaui_modalHeaderBody {
      padding: 16px;
      font-size: 14px;
      color: ${(p) => p.$theme.palette.neutral[700]};
      display: flex;
      flex-direction: column;
      align-items: ${(p) => p.$align};
      text-align: ${(p) => p.$align};
      max-height: calc(100vh - 300px);
      overflow: auto;
    }

    .dgaui_modalHeaderFooter {
      padding: 0 16px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.onlyEnd {
        display: flex;
        justify-content: flex-end;
      }

      .dgaui_modalHeaderFooterEnd {
        display: flex;
        justify-content: flex-end;
      }

      button {
        margin-inline-end: 8px;

        &:last-child {
          margin-inline-end: 0;
        }
      }
    }

    &.dgaui_modalMobile {
      width: 320px;

      .dgaui_modalHeaderBody {
        max-height: calc(100vh - 400px);
      }

      .dgaui_modalHeaderFooter {
        flex-direction: column;
        .dgaui_modalHeaderFooterStart,
        .dgaui_modalHeaderFooterEnd {
          width: 100%;
        }
        button {
          width: 100%;
          margin-inline-end: 0;
          margin-bottom: 4px;
        }
      }
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 2400;
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0;
`;

export default Modal;
