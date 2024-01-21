import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Wiki from "./Wiki";
import { WikiProps } from "./Wiki.types";

const meta: Meta<typeof Wiki> = {
    component: Wiki,
    title: "Wiki",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Wiki>;

export const MainWiki: Story = (args: React.JSX.IntrinsicAttributes & WikiProps) => (
    <Wiki data-testId="wiki-id" {...args} />
)
MainWiki.args = {
    BKTP: "BPID",
    BKID: "00001864",
};