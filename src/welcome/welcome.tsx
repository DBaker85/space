import React, { Dispatch } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import { TimelineLite, TweenMax } from 'gsap';

import RocketIcon from '../icons/rocket-icon';
import RocketColorIcon from '../icons/rocket-icon-color';
import { cssConstants } from '../shared/constants';
import flame from '../assets/images/rocket/fire.svg';

import styles from './welcome.module.scss';
import { toggleStars } from '../redux/actions';

// import Button from '../shared/elements/button';

interface welcomeProps extends RouteComponentProps {
  toggleStars?: Dispatch<any>;
}

interface State {}

class Welcome extends React.Component<welcomeProps, State> {
  private launchTimeline: TimelineLite;
  private arriveTimeline: TimelineLite;

  bwRocket: any;
  launchText: any;
  rocket: any;
  flame: any;
  launchButton: any;

  constructor(props: welcomeProps) {
    super(props);
    this.state = {};
    this.launchTimeline = new TimelineLite({ paused: true });
    this.arriveTimeline = new TimelineLite({ paused: true });
  }

  componentDidMount() {
    const { toggleStars } = this.props;

    TweenMax.to(this.flame, 0.05, {
      x: '+=4',
      repeat: -1,
      yoyo: true
    });

    TweenMax.to(this.rocket, 0.05, {
      x: '+=1',
      repeat: -1,
      yoyo: true
    });

    this.launchTimeline
      .set(this.flame, { rotation: 180 })
      // object, duration, actions, position in timeline in seconds
      .to(this.launchText, 0.3, { opacity: 0 })
      .to(this.launchButton, 1, { width: 80 }, 0.5)
      .to(this.launchText, 1, { width: 0, margin: 0, display: 'none' }, 0.5)
      .to(this.rocket, 2, { rotation: -45, scale: 2, opacity: 1 }, 0.5)
      .to(this.bwRocket, 2, { rotation: -45, scale: 2, opacity: 0 }, 0.5)
      .to(this.launchButton, 0.5, { backgroundColor: 'transparent' }, 1.5)
      // add shake and launch

      .call(() => {
        if (toggleStars) {
          toggleStars(true);
          this.arriveTimeline.play();
        }
      })
      .to(this.flame, 0.5, { height: 80 }, 2.5);

    this.arriveTimeline
      .to(this.rocket, 0.3, { y: 20 }, 1.7)
      .to(this.rocket, 1, { y: '-100vh' }, 2)
      .to(this.flame, 0.3, { y: 20 }, 1.7)
      .to(this.flame, 1, { y: '-100vh' }, 2)
      .call(() => (toggleStars ? toggleStars(false) : null), undefined, null, 2)
      .call(() => {
        this.props.history.push('/main');
      });
    // launch
  }

  render() {
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
          <img
            alt="flame"
            className={styles['flame']}
            ref={(el: any) => (this.flame = el)}
            src={flame}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleStars: toggleStars
};
export default connect(
  null,
  mapDispatchToProps
)(Welcome);
