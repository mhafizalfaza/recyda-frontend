import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

/**
 * Input component with various sizes and schemes
 */

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Input component default
 */

export const Default: Story = {
  args: {
    value: "Type something",
  },
};
