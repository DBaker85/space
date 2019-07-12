import React from 'react';
import { RouteComponentProps } from 'react-router';
import { TimelineLite, TweenLite } from 'gsap';
import { MorphSVGPlugin } from '../gsap-bonus';
import { cssConstants } from '../shared/css-constants';

import GithubIcon from '../icons/github-icon';
import CodePenIcon from '../icons/codepen-icon';
import LinkedInIcon from '../icons/linkedin-icon';

import styles from './welcome.module.scss';

interface welcomeProps extends RouteComponentProps {}

interface State {
  title: String;
}

export default class Welcome extends React.Component<welcomeProps, State> {
  private welcomeTimeline: TimelineLite;
  public socialElements: any = [];

  constructor(props: welcomeProps) {
    super(props);
    this.state = {
      title: 'Welcome'
    };
    this.welcomeTimeline = new TimelineLite({ paused: true });
  }

  socialBuilder() {
    // return socialIconsArray.map((SocialIcon, index) => {
    //   return (
    //     <SocialIcon ref={div => (this.myElements[index] = div)} key={index}/>
    //   );
    // });
  }

  componentDidMount() {
    this.welcomeTimeline
      .staggerFrom(
        this.socialElements,
        1,
        {
          y: function() {
            return -Math.random() * 600;
          },
          x: function() {
            return Math.random() * 300;
          },
          autoAlpha: 0,
          rotation: function() {
            return Math.random() * 300;
          },
          color: cssConstants.colors.colorRed
        },
        0.1,
        null,
        () => console.log('phase one complete')
      )
      .play();
  }

  render() {
    const { title } = this.state;
    console.log(this);
    return (
      <React.Fragment>
        <h1
          id="contain"
          className={`clickable ${styles['title-wrapper']}`}
          onClick={e => {
            e.preventDefault();
          }}
        >
          {title}
        </h1>
        <div className={styles['social-holder']}>
          <GithubIcon
            color={cssConstants.colors.colorWhite}
            inputRef={(el: any) => (this.socialElements[0] = el)}
          />
          ,
          <CodePenIcon
            color={cssConstants.colors.colorWhite}
            inputRef={(el: any) => (this.socialElements[1] = el)}
          />
          ,
          <LinkedInIcon
            color={cssConstants.colors.colorWhite}
            inputRef={(el: any) => (this.socialElements[2] = el)}
          />
        </div>
      </React.Fragment>
    );
  }
}
