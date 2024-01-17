import type { Meta, StoryObj } from '@storybook/vue3';
import { within, userEvent } from '@storybook/testing-library';
import TextWithGap from '../components/TextWithGap.vue';

const meta = {
  title: 'TextWithGap',
  component: TextWithGap,
  render: () => ({
    components: { TextWithGap },
    template: '<text-with-gap />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof TextWithGap>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing
export const Default: Story = { };
