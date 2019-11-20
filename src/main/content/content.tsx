import React, { FunctionComponent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CodepenIcon from '../../icons/codepen-icon';
import GithubIcon from '../../icons/github-icon';
import LinkedInIcon from '../../icons/linkedin-icon';

import styles from './content.module.scss';

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
  // TODO: about this site
  // TODO: easter egg?
  if (showAboutMe) {
    return (
      <div className={styles['content']}>
        <div className={`${styles['title']} text-large text-title`}>
          About me
        </div>
        <div className={styles['text-holder']}>
          <div className={`${styles['sub-title']} text-medium`}>
            I am a frontend developer who loves performance, electronics and
            CSS.
          </div>
          <div className={styles['links']}>
            Find out more about me:
            <div>
              {/* TODO nice icons plus links */}
              <CodepenIcon />
              <GithubIcon />
              <LinkedInIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default AboutME;
