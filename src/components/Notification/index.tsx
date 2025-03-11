import React from "react";
import styled from "styled-components";
import colors, { NotificationColor } from "./colors";
import { mergeStrings } from "../../lib/helpers";
import useTheme from "../../lib/useTheme";
import buttonCloseIcon from "../../assets/images/x.png";

interface DGA_NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ThemeColorName;
  title?: string;
  message?: string;
  onClose?: Function;
}

const Notification: React.FC<DGA_NotificationProps> = ({
  color,
  title,
  message,
  onClose,
  ...props
}) => {
  const theme = useTheme();
  const colorNameResult: ThemeColorName = color ?? "neutral";
  const [show, setShow] = React.useState(true);

  const closeClickedHandler = () => {
    setShow(false);
    onClose?.();
  };

  if (!show) return null;

  return (
    <StyledComponent
      $theme={theme}
      $colors={colors(theme)[colorNameResult]}
      {...props}
      className={mergeStrings("dgaui dgaui_notification", props.className)}
    >
      <div className="contentContainer">
        <div className="icon" />
        <div className="content">
          <span className="title">{title}</span>
          <span className="message">{message}</span>
        </div>
      </div>

      <div className="close" onClick={closeClickedHandler} />
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{
  $theme: Theme;
  $colors: NotificationColor;
}>`
  direction: ${(p) => p.$theme.direction};
  padding: 8px 24px;
  width: 100%;
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  border-bottom: 2px solid ${(p) => p.$colors.border};
  background-color: ${(p) => p.$colors.bg};

  .contentContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 24px;

    .icon {
      background-image: url(${(p) => p.$colors.icon});
      background-repeat: no-repeat;
      background-size: contain;
      min-width: 24px;
      height: 24px;
      margin-inline-end: 8px;
    }

    .content {
      color: ${(p) => p.$colors.text};
      font-size: 16px;

      .title {
        margin-inline-end: 8px;
        font-weight: 700;
      }
      .message {
        word-wrap: normal;
      }
    }
  }

  .close {
    margin-inline-start: 12px;
    cursor: pointer;
    background-image: url(${buttonCloseIcon});
    background-repeat: no-repeat;
    min-width: 20px;
    height: 20px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default Notification;
