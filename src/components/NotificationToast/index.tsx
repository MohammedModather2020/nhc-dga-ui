import React from "react";
import { createRoot } from "react-dom/client";
import styled, { css, keyframes } from "styled-components";

// lib
import { mergeStrings } from "../../lib/helpers";
import useScreenSizes from "../../lib/hooks/useScreenSizes";

// assets
import { getColors } from "./colors";
import useTheme from "../../lib/useTheme";
import buttonCloseIcon from "../../assets/images/x.png";

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface NotificationToastProps {
  leadText: React.ReactNode;
  helpText?: string;
  type?: "success" | "critical" | "warning" | "info";
  closeButton?: boolean;
  actions?: React.ReactNode;
  onClose?: Function;
  style?: React.CSSProperties;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  leadText,
  helpText,
  type,
  actions,
  closeButton,
  onClose,
  style,
  ...props
}) => {
  const theme = useTheme();
  const screenSizes = useScreenSizes();
  const colorsResult =
    getColors(theme)[type as keyof ReturnType<typeof getColors>];
  const isMinimal = !helpText && !actions;

  return (
    <StyledAlertComponent
      $theme={theme}
      $colors={colorsResult}
      style={style}
      {...props}
      className={mergeStrings(
        "dgaui dgaui_inlineAlert " +
          (screenSizes.isMobile ? " mobile " : "") +
          (isMinimal ? " minimal " : "")
      )}
    >
      <div className="icon" />
      <div className="content">
        <div className="leadText">{leadText}</div>
        {helpText && <div className="helpText">{helpText}</div>}
        {actions && <div className="actions">{actions}</div>}
      </div>
      {closeButton && <div className="close" onClick={() => onClose?.()} />}
    </StyledAlertComponent>
  );
};

const StyledAlertComponent = styled.div<{
  $theme: Theme;
  $colors: any;
}>`
	direction: ${(p) => p.$theme.direction};
	width: 100%;
	display: flex;
	position: relative;
	padding: 16px 24px;
	background-color: #ffffff;
	border-radius: 8px;
	border: 1px solid;
	box-sizing: border-box;
	overflow: hidden;

	&::before {
		content: '';
		display: block;
		width: 8px;
		height: 100%;
		position: absolute;
		inset-inline-start: 0;
		top: 0;
		background-color: ${(p) => p.$colors.vLine};
	}

	.icon {
		min-width: 40px;
		height: 40px;
		background-image: url(${(p) => p.$colors.icon});
		background-repeat: no-repeat;
		background-size: contain;
		margin-inline-end: 12px;
	}
	.content {
		width: 100%;
		.leadText {
			font-size: 16px;
			font-weight: 600;
			min-height: 40px;
			display: flex;
			align-items: center;
}
		.helpText {
			font-size: 14px;
			color: ${(p) => p.$theme.palette.neutral[700]};
			margin-top: 8px;
		}
		}
		.actions {
			margin-top: 16px;
			button {
				margin-inline-end: 8px;
			}
}
	.close {
		margin-inline-start: 12px;
		cursor: pointer;
		background-image: url(${buttonCloseIcon});
		background-repeat: no-repeat;
		min-width: 20px;
		height: 20px;
		margin-top: 10px;
		&:hover {
			transform: scale(1.1);
		}
	}

	&.mobile {
		flex-direction: column;

		&::before {
			width: 100%;
			height: 8px;
			position: absolute;
			top: 0;
		}
		.icon {
			margin-bottom: 16px;
		}
		.content {
			.title {
				margin-inline-end: 16px;
			}
			.actionButtons {
				display: flex;
				flex-direction: column;

				button {
					margin-inline-end: 0;
					margin-bottom: 8px;

					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
		.close {
			margin-inline-start: 0;
			position: absolute;
			inset-inline-end: 16px;
			top: 16px;
		}
	}

	&.minimal {
		padding: 16px 24px;

		&.mobile {
			padding-top: 14px;
			flex-direction: row;
			align-items: center;

			.icon {
				margin-bottom: 0;
			}
			.close {
				position: initial;
				margin-top: 0;
				margin-inline-start: 16px;
			}
		}
	}
`;

interface Props extends NotificationToastProps {
  position?: Position;
  duration?: number;
  rtl?: boolean;
}

const toast: (props: Props) => void = ({
  position = "bottom-left",
  duration = 993000,
  rtl,
  ...props
}) => {
  const container = document.createElement("div");
  container.className = "dgaui dgaui_toastContainer";
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(container);

  const root = createRoot(container);

  const onCloseHandler = () => {
    props.onClose?.();
    root.unmount();
    container.remove();
  };

  const closeHandler = () => {
    addCloseClass();
    setTimeout(onCloseHandler, 200);
  };

  const addCloseClass = () => {
    if (container.childNodes[0] && container.childNodes[0] instanceof Element) {
      container.childNodes[0].className =
        container.childNodes[0].className + " toastClose";
    }
  };

  setTimeout(addCloseClass, +duration);
  setTimeout(onCloseHandler, +duration + 200);

  root.render(
    <StyledComponent className="dgaui_toast" $position={position}>
      <NotificationToast
        {...props}
        onClose={closeHandler}
        closeButton={props.closeButton}
        style={{ direction: rtl ? "rtl" : "ltr" }}
      />
    </StyledComponent>
  );
};

const getAnimation = (position: Position) => {
  switch (position) {
    case "top-left": {
      return {
        keyframes: keyframes`
            from {
                left: -484px;
            }
            to {
                left: 16px;
            }
          `,
        css: css`
          top: 16px;
          left: 16px;
        `,
        backCss: css`
          left: -484px;
        `,
        mobileCss: css`
          padding-inline-end: 16px;
        `,
      };
    }
    case "top-center": {
      return {
        keyframes: keyframes`
            from {
                top: -100vh;
            }
            to {
                top: 16px;
            }
          `,
        css: css`
          top: 16px;
          left: calc(50% - 242px);
        `,
        backCss: css`
          top: -100vh;
        `,
        mobileCss: css`
          padding: 0 8px;
        `,
      };
    }
    case "top-right": {
      return {
        keyframes: keyframes`
              from {
                  right: -484px;
              }
              to {
                  right: 16px;
              }
            `,
        css: css`
          top: 16px;
          right: 16px;
        `,
        backCss: css`
          right: -484px;
        `,
        mobileCss: css`
          padding-inline-start: 16px;
        `,
      };
    }
    case "bottom-left": {
      return {
        keyframes: keyframes`
            from {
                left: -484px;
            }
            to {
                left: 16px;
            }
          `,
        css: css`
          bottom: 16px;
          left: 16px;
        `,
        backCss: css`
          left: -484px;
        `,
        mobileCss: css`
          padding-inline-end: 16px;
        `,
      };
    }
    case "bottom-center": {
      return {
        keyframes: keyframes`
            from {
                bottom: -100vh;
            }
            to {
                bottom: 16px;
            }
          `,
        css: css`
          bottom: 16px;
          left: calc(50% - 242px);
        `,
        backCss: css`
          bottom: -100vh;
        `,
        mobileCss: css`
          padding: 0 8px;
        `,
      };
    }
    case "bottom-right": {
      return {
        keyframes: keyframes`
              from {
                  right: -484px;
              }
              to {
                  right: 16px;
              }
            `,
        css: css`
          bottom: 16px;
          right: 16px;
        `,
        backCss: css`
          right: -484px;
        `,
        mobileCss: css`
          padding-inline-start: 16px;
        `,
      };
    }
  }
};

const StyledComponent = styled.div<{ $position: Position }>`
  z-index: 2500;
  width: 484px;
  background-color: #fff;
  position: fixed;
  transition: all 0.2s;
  ${(p) => getAnimation(p.$position)?.css};
  animation: ${(p) => getAnimation(p.$position)?.keyframes} 0.2s
    cubic-bezier(0.075, 0.82, 0.165, 1);

  &.toastClose {
    ${(p) => getAnimation(p.$position)?.backCss};
    animation-direction: reverse;
  }

  .dgaui_inlineAlert {
    box-shadow: 0 32px 64px -12px #10182824;
  }

  &:has(.dgaui_inlineAlert.mobile) {
    ${(p) => getAnimation(p.$position)?.mobileCss};
  }

  @media screen and (max-width: 640px) {
    width: calc(100% - 32px);
  }
`;

export default toast;
