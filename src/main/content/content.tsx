import React, { FunctionComponent, useEffect, useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CodepenIcon from '../../icons/codepen-icon';
import GithubIcon from '../../icons/github-icon';
import LinkedInIcon from '../../icons/linkedin-icon';

import styles from './content.module.scss';
import { cssConstants as css } from '../../shared/constants';
import { useContentState } from '../../apollo/content/cacheOperations';
import { ContentType } from '../../apollo/content/models';

const AboutME: FunctionComponent = () => {
  const [showContent, setShowContent] = useState(false);

  const setContent = useContentState();

  const { loading, error, data } = useQuery(gql`
    {
      content @client {
        active
        type
      }
    }
  `) as any;

  const handleClick = (type: ContentType) => {
    setContent(false, type);
  };

  const contentBuilder = (type: ContentType) => {
    switch (type) {
      case 'about':
        return (
          <Fragment>
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
          </Fragment>
        );
      case 'about':
        return (
          <Fragment>
            <div className={`${styles['title']} text-large text-title`}>
              About this site
            </div>
            <div className={styles['text-holder']}>
              <div className={`${styles['sub-title']} text-medium`}>
                Rejoice in the stack and the performance
              </div>
            </div>
          </Fragment>
        );

      default:
        break;
    }
  };

  useEffect(() => {
    if (data) {
      if (data.content.active) {
        setShowContent(true);
      }
      if (!data.content.active) {
        setShowContent(false);
      }
    }
  }, [data, showContent]);

  if (loading) return null;
  // TODO: handle error state
  if (error) return null;
  // TODO: about this site
  // TODO: easter egg?
  if (showContent) {
    return (
      <div className={styles['content']}>
        <div
          className={`${styles['close']} text-medium text-title clickable`}
          onClick={() => handleClick(data.content.type)}
        >
          X
        </div>
        {contentBuilder(data.content.type)}
      </div>
    );
  }
  return null;
};

export default AboutME;
