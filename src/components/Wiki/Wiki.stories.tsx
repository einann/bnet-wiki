import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Wiki from "./Wiki";

const meta: Meta<typeof Wiki> = {
    component: Wiki,
    title: "Wiki",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Wiki>;

export const MainWiki: Story = (args) => (
    <Wiki data-testId="wiki-id" {...args} />
)
MainWiki.args = {
    BKTP: "TKID",
    BKID: "TK0000219719",
};