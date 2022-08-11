import React from "react";
import { Story, Meta } from "@storybook/react";
import styled from "styled-components";

import { StartButton, ButtonProps } from "./start-button";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: -1rem;
`;

const Template: Story<ButtonProps> = (args) => (
  <Wrapper>
    <StartButton {...args}>Launch</StartButton>
  </Wrapper>
);

export default {
  title: "Start Button",
  component: StartButton,
  argTypes: {
    className: {
      options: ["", "fade-exit"],
      control: { type: "select" },
    },
  },
} as Meta;

export const Default = Template.bind({});

Default.args = {
  title: "Title goes here",
};
