import React from 'react';
import { RouteComponentProps } from 'react-router';

import { burst } from '../animations/click';

interface welcomeProps extends RouteComponentProps {}

export default class Welcome extends React.Component<welcomeProps> {
  constructor(props: welcomeProps) {
    super(props);
    console.log(burst);
  }

  render() {
    return (
      <React.Fragment>
        <h1
          className="clickable"
          onClick={() => {
            burst.play();
            // this.props.history.push("dude")
          }}
        >
          Welcome
        </h1>
      </React.Fragment>
    );
  }
}
