import React, { FunctionComponent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CodepenIcon from '../../icons/codepen-icon';
import GithubIcon from '../../icons/github-icon';
import LinkedInIcon from '../../icons/linkedin-icon';

import styles from './about-me.module.scss';

const AboutME: FunctionComponent = () => {
  const [showAboutMe, setShowAboutMe] = useState(false);

  const { loading, error, data } = useQuery(gql`
    {
      content @client {
        active
        type
      }
    }
  `) as any;

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.content.active) {
        switch (data.content.type) {
          case 'about':
            setShowAboutMe(true);
            break;

          default:
            break;
        }
      }
    }
  }, [data, showAboutMe]);

  if (loading) return null;
  // TODO: handle error state
  if (error) return null;

  if (showAboutMe) {
    return (
      <div className={styles['about-me']}>
        <div>
          I am a frontend developer who loves performance, electronics and
          coding in general.
        </div>
        <CodepenIcon />
        <GithubIcon />
        <LinkedInIcon />
      </div>
    );
  }
  return null;
};

export default AboutME;
