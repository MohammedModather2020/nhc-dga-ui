import { Meta, StoryObj } from '@storybook/react';

// custom-deps
import Notification from '.';
import Button from '../Button';
import withRtl from '../../lib/RTL';
import Link from '../../components/Link';

const meta = {
	title: 'DGAUI/Notification',
	component: Notification,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		style: {
			options: ['neutral', 'info', 'success', 'critical', 'warning'],
			control: { type: 'select' },
		},
	},
	args: {
		icon: true,
		style: 'neutral',
		leadText: 'Important:',
		helpText: 'This is a very important banner message that requires attention',
	},
} satisfies Meta<typeof Notification>;

export default meta;

// Stories
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
	args: {},
};
export const WithButton: Story = {
	args: {
		style: 'info',
		button: (
			<Button style='primary' size='medium' color='info'>
				Button
			</Button>
		),
	},
};
export const WithLink: Story = {
	args: {
		style: 'info',
		link: (
			<Link color='info' href='https://www.google.com'>
				Link
			</Link>
		),
	},
};

export const WithLinkAndButton: Story = {
	args: {
		style: 'info',
		link: (
			<Link color='info' href='https://www.google.com'>
				Link
			</Link>
		),
		button: (
			<Button style='primary' size='medium' color='info'>
				Button
			</Button>
		),
	},
};

export const Rtl = withRtl(() => (
	<Notification
		style='critical'
		icon
		leadText='مهم:'
		helpText=' لوريم إيبسوم لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)'
	/>
));
