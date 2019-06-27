import React from 'react';
import { RouteComponentProps } from 'react-router';
// import { Html, Timeline } from 'mo-js';

import { burst } from '../animations/click';

interface welcomeProps extends RouteComponentProps {}

interface State {
  title: String;
  timeline?: any;
}

export default class Welcome extends React.Component<welcomeProps, State> {
  constructor(props: welcomeProps) {
    super(props);
    this.state = {
      title: 'Welcome'
    };
    console.log(this);
  }

  titleBuilder() {
    return this.state.title.split('').map((letter, index) => {
      return <span key={index}>{letter}</span>;
    });
  }

  render() {
    console.log(this.titleBuilder());

    return (
      <React.Fragment>
        <h1
          className="clickable"
          onClick={e => {
            e.preventDefault();
            burst(e, () => this.props.history.push('dude'));
          }}
        >
          {this.titleBuilder()}
        </h1>
      </React.Fragment>
    );
  }
}
