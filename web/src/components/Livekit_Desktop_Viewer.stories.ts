import type { Meta, StoryObj } from '@storybook/react';
import Livekit_Desktop_Viewer from './Livekit_Desktop_Viewer';

const meta: Meta<typeof Livekit_Desktop_Viewer> = {
  title: 'Components/LivekitDesktopViewer',
  component: Livekit_Desktop_Viewer,
};

export default meta;
type Story = StoryObj<typeof Livekit_Desktop_Viewer>;

export const Primary: Story = {
  render: () => <Livekit_Desktop_Viewer />
};
