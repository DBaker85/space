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
                  <a
                    href="https://codepen.io/DBaker85"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CodepenIcon color={css.colors.colorGray} />
                  </a>
                  <a
                    href="https://github.com/DBaker85"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon color={css.colors.colorGray} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/davidbakerfront"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon color={css.colors.colorGray} />
                  </a>
                </div>
              </div>
            </div>
          </Fragment>
        );
      case 'tech':
        return (
          <Fragment>
            <div className={`${styles['title']} text-large text-title`}>
              About this site
            </div>
            <div className={styles['text-holder']}>
              <div className={`${styles['sub-title']} text-medium`}>
                <p>
                  This Progressive Web App is built on React, GraphQL, MongoDB
                  and NodeJS. It is also running on Azure with a ton of custom
                  build tasks
                </p>
              </div>
              <div>
                <p>
                  Checkout the{' '}
                  <a
                    href="https://github.com/DBaker85/space"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    code
                  </a>{' '}
                  if you want to know more
                </p>
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
