import React from "react";
import { Story, Meta } from "@storybook/react";
import styled from "styled-components";

import { Loader } from "./loader";

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
    <Loader />
  </Wrapper>
);

export default {
  title: "Loader",
  component: Loader,
  argTypes: {
    className: {
      control: null,
    },
  },
} as Meta;

export const Default = Template.bind({});

// Default.args = {
//   title: "Title goes here",
// };
