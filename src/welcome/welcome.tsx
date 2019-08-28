import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';

import { TimelineLite } from 'gsap';
// import { cssConstants } from '../shared/css-constants';

// import GithubIcon from '../icons/github-icon';
// import CodePenIcon from '../icons/codepen-icon';
// import LinkedInIcon from '../icons/linkedin-icon';

import RocketIcon from '../icons/rocket-icon';
import RocketColorIcon from '../icons/rocket-icon-color';
import { cssConstants } from '../shared/constants';
// import rocket from '../assets/images/rocket/color.svg'

import styles from './welcome.module.scss';

import Button from '../shared/elements/button';

interface welcomeProps extends RouteComponentProps {}

interface State {}

export default class Welcome extends React.Component<welcomeProps, State> {
  private launchTimeline: TimelineLite;

  bwRocket: any;
  launchText: any;
  rocket: any;
  launchButton: any;

  constructor(props: welcomeProps) {
    super(props);
    this.state = {};
    this.launchTimeline = new TimelineLite({ paused: true });
  }

  componentDidMount() {
    this.launchTimeline
      // object, duration, actions, position in timeline in seconds
      .to(this.launchText, 0.3, { opacity: 0 })
      .to(this.launchButton, 1, { width: 80 }, 0.5)
      .to(this.launchText, 1, { width: 0, margin: 0, display: 'none' }, 0.5)
      .to(this.rocket, 1, { rotation: -45 }, 0.5)
      .to(this.bwRocket, 1, { rotation: -45 }, 0.5)
      // move down
      .to(
        this.launchButton,
        0.8,
        { transform: 'translateY(calc(50vh - 200px))' },
        1.5
      )
      .to(this.rocket, 1, { opacity: 1, scale: 2 }, 2)
      .to(this.bwRocket, 1, { opacity: 0, scale: 2 }, 2)
      // hide button
      .to(this.launchButton, 1, { backgroundColor: 'transparent' }, 2);
    // launch
  }

  render() {
    console.log(this);

    return (
      <div
        className={styles['launch-button']}
        ref={(el: any) => (this.launchButton = el)}
        onClick={() => this.launchTimeline.play()}
      >
        <div
          ref={(el: any) => (this.launchText = el)}
          className={styles['launch-text']}
        >
          Launch
        </div>
        <div className={styles['icon-holder']}>
          <RocketIcon
            inputRef={(el: any) => (this.bwRocket = el)}
            color={cssConstants.colors.colorWhite}
          />

          <RocketColorIcon inputRef={(el: any) => (this.rocket = el)} />
        </div>
      </div>
    );
  }
}

// <div className={styles['social-holder']}>
// <GithubIcon
//   color={cssConstants.colors.colorWhite}
//   inputRef={(el: any) => (this.socialElements[0] = el)}
// />
// ,
// <CodePenIcon
//   color={cssConstants.colors.colorWhite}
//   inputRef={(el: any) => (this.socialElements[1] = el)}
// />
// ,
// <LinkedInIcon
//   color={cssConstants.colors.colorWhite}
//   inputRef={(el: any) => (this.socialElements[2] = el)}
// />
// </div>
