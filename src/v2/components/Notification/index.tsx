import React from 'react';
import styled from 'styled-components';

//lib
import { mergeStrings } from '../../../lib/helpers';

// assets
import useTheme from '../../../lib/useTheme';
import colors, { NotificationColor } from './colors';
import buttonCloseIcon from '../../../assets/images/x.png';

interface DGA_NotificationProps {
	style: 'success' | 'info' | 'neutral' | 'warning' | 'critical';
	className?: string;
	icon?: boolean;
	leadText?: string;
	link?: React.ReactNode;
	dismissible?: boolean;
	button?: React.ReactNode;
	helpText?: string;
	onClose?: Function;
}

const Notification: React.FC<DGA_NotificationProps> = ({
	style = 'neutral',
	icon = true,
	leadText,
	link,
	dismissible = true,
	button,
	helpText,
	onClose,
	...props
}) => {
	const theme = useTheme();
	const colorNameResult = style;
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
			className={mergeStrings('dgaui dgaui_notification', props.className)}>
			<div className='contentContainer'>
				{icon && <div className='icon' />}
				<div className='content'>
					{leadText && <span className='title'>{leadText}</span>}
					{helpText && <span className='message'>{helpText}</span>}
				</div>
				<div className='actions'>
					{link && link}
					{button && button}
					{dismissible && (
						<div className='close' onClick={closeClickedHandler} />
					)}
				</div>
			</div>
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
		gap: 8px;
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
	.actions {
		display: flex;
		gap: 8px;
		flex-wrap: nowrap;
		align-items: center;
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
