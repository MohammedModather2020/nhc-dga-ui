import { Meta } from '@storybook/react';

// custom-deps
import toast from '.';
import InlineAlert from '.';
import Button from '../Button';

// styles
import './index.css';

const meta = {
	title: 'DGAUI/V2/NotificationToast',
	argTypes: {
		position: {
			options: [
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
			],
			control: { type: 'select' },
		},
		duration: {
			control: { type: 'text' },
		},
		type: {
			options: ['neutral', 'warning', 'success', 'critical', 'info'],
			control: { type: 'select' },
			defaultValue: 'neutral',
		},
		closeButton: {
			control: { type: 'boolean' },
			defaultValue: true,
		},
		rtl: {
			control: { type: 'boolean' },
			defaultValue: false,
		},
		leadText: {
			control: { type: 'text' },
		},
		helpText: {
			control: { type: 'text' },
		},
	},
	args: {
		duration: '3000',
		leadText: 'Test title',
		helpText:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		actions: (
			<>
				<Button style='secondary-outline' color='neutral'>
					Button
				</Button>
				<Button style='transparent' color='neutral'>
					Button
				</Button>
			</>
		),
		rtl: false,
		type: 'neutral',
		closeButton: true,
		position: 'top-left',
	},
} satisfies Meta<typeof InlineAlert>;

export default meta;

export const Default = (args: any) => {
	return (
		<div className='margin'>
			<div>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'top-left',
							leadText: args.leadText,
							helpText: args.helpText,
							actions: args.actions,
							type: args.type,
							closeButton: args.closeButton,
						})
					}>
					top-left
				</Button>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'top-center',
							leadText: args.leadText,
							helpText: args.helpText,
							actions: args.actions,
							type: args.type,
							closeButton: args.closeButton,
						})
					}>
					top-center
				</Button>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'top-right',
							leadText: args.leadText,
							helpText: args.helpText,
							actions: args.actions,
							type: args.type,
							closeButton: args.closeButton,
						})
					}>
					top-right
				</Button>
			</div>

			<div>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'bottom-left',
							leadText: args.leadText,
							helpText: args.helpText,
							actions: args.actions,
							type: args.type,
							closeButton: args.closeButton,
						})
					}>
					bottom-left
				</Button>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'bottom-center',
							leadText: args.leadText,
							helpText: args.helpText,
							actions: args.actions,
							type: args.type,
							closeButton: args.closeButton,
						})
					}>
					bottom-center
				</Button>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'bottom-right',
							leadText: args.leadText,
							helpText: args.helpText,
							actions: args.actions,
							type: args.type,
							closeButton: args.closeButton,
						})
					}>
					bottom-right
				</Button>
			</div>
			<div>
				<Button
					onClick={() =>
						toast({
							rtl: args.rtl,
							duration: args.duration,
							position: 'bottom-right',
							type: args.type,
							leadText: 'عنوان النص',
							helpText: 'النص هو هنا للتوضيح',
							actions: args.actions,
							closeButton: args.closeButton,
						})
					}>
					Rtl bottom-right
				</Button>
			</div>
		</div>
	);
};
