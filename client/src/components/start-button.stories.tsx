import React from "react";
import { Story, Meta } from "@storybook/react";
import styled from "styled-components";

import { StartButton } from "./start-button";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  margin: -1rem;
`;

const Template: Story = () => (
  <Wrapper>
    <StartButton />
  </Wrapper>
);

export default {
  title: "Start Button",
  component: StartButton,
  argTypes: {
    className: {
      control: null,
    },
  },
} as Meta;

export const Default = Template.bind({});

Default.args = {
  title: "Title goes here",
};
