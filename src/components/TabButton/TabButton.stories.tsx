import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TabButton from "./TabButton";
import { GiHamburgerMenu } from "react-icons/gi";

const meta: Meta<typeof TabButton> = {
    component: TabButton,
    title: "TabButton",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TabButton>;

export const TabButtonTooltipVisible: Story = (args) => (
    <TabButton data-testId="tabbutton-id" {...args} />
)
TabButtonTooltipVisible.args = {
    children: <GiHamburgerMenu />,
    tooltip: "Show tree",
    press: () => console.log('X'),
};

export const TabButtonTooltipHidden: Story = (args) => (
    <TabButton data-testId="tabbutton-id" {...args} />
)
TabButtonTooltipHidden.args = {
    children: <GiHamburgerMenu />,
    press: () => console.log('X'),
};