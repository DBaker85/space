import React, { FunctionComponent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CodepenIcon from '../../icons/codepen-icon';
import GithubIcon from '../../icons/github-icon';
import LinkedInIcon from '../../icons/linkedin-icon';

import styles from './content.module.scss';
import { cssConstants as css } from '../../shared/constants';
import { useContentState } from '../../apollo/content/cacheOperations';

const AboutME: FunctionComponent = () => {
  const [showAboutMe, setShowAboutMe] = useState(false);

  const setContent = useContentState();

  const { loading, error, data } = useQuery(gql`
    {
      content @client {
        active
        type
      }
    }
  `) as any;

  const handleClick = () => {
    setContent(false, 'about');
  };

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
      if (!data.content.active) {
        setShowAboutMe(false);
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
        <div
          className={`${styles['close']} text-medium text-title clickable`}
          onClick={handleClick}
        >
          X
        </div>
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
              <CodepenIcon color={css.colors.colorGray} />
              <GithubIcon color={css.colors.colorGray} />
              <LinkedInIcon color={css.colors.colorGray} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default AboutME;
