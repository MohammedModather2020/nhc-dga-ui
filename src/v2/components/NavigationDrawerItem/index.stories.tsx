import { Meta, StoryObj } from '@storybook/react';

// custom-deps
import NavigationDrawerItem from '.';
import withRtl from '../../../lib/RTL';
import Tag from '../../../components/Tag';

const meta = {
	title: 'DGAUI/V2/NavigationDrawerItem',
	component: NavigationDrawerItem,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		state: {
			control: { type: 'select' },
			options: [
				'default',
				'selected',
				'disabled',
				'focused',
				'hovered',
				'pressed',
			],
		},
	},
	args: {
		state: 'default',
		type: 'link',
		text: 'link',
		level: 1,
		children: (
			<>
				<NavigationDrawerItem level={2} text='Level 2' />
				<NavigationDrawerItem level={2} text='Level 2' state='selected' />
			</>
		),
		badge: (
			<Tag size='medium' variant='contained' color='primary' rounded>
				99+
			</Tag>
		),
	},
} satisfies Meta<typeof NavigationDrawerItem>;

export default meta;

// Stories
type Story = StoryObj<typeof NavigationDrawerItem>;

export const Default: Story = {
	args: {
		state: 'default',
		type: 'link',
		text: 'link',
		level: 1,
		children: (
			<>
				<NavigationDrawerItem level={2} text='Level 2' />
				<NavigationDrawerItem level={2} text='Level 2' />
				<NavigationDrawerItem level={2} text='Level 2' state='selected' />
			</>
		),
	},
};

export const Rtl = withRtl(() => (
	<div style={{ width: 200 }}>
		<NavigationDrawerItem
			level={1}
			text='مستوى ١'
			type='parent'
			state='selected'>
			<NavigationDrawerItem level={2} text='Level 2' />
			<NavigationDrawerItem level={2} text='Level 2' />
			<NavigationDrawerItem level={2} text='Level 2' state='selected' />
		</NavigationDrawerItem>
	</div>
));
