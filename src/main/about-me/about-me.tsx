import React, { FunctionComponent } from 'react';
import CodepenIcon from '../../icons/codepen-icon';
import GithubIcon from '../../icons/github-icon';
import LinkedInIcon from '../../icons/linkedin-icon';

import styles from './about-me.module.scss';

const AboutME: FunctionComponent = () => {
  return (
    <div>
      <div>
        I am a frontend developer who loves performance, electronics and coding
        in general.
      </div>
      <CodepenIcon />
      <GithubIcon />
      <LinkedInIcon />
    </div>
  );
};

export default AboutME;
