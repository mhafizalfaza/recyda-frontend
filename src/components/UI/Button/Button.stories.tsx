import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonScheme } from "./Button";

/**
 * Button component with various sizes and schemes
 */

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Primary Button
 */

export const Primary: Story = {
  args: {
    label: "Click me",
    scheme: ButtonScheme.primary,
  },
};

/**
 * Secondary Button
 */

export const Secondary: Story = {
  args: {
    ...Primary.args,
    scheme: ButtonScheme.secondary,
  },
};
