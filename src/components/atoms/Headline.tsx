import * as React from 'react';

interface IProps {
  text: string;
  style?: object;
}

class Headline extends React.Component<IProps> {

  public render() {
    return (
      <h1 style={this.props.style}>
        {this.props.text}
      </h1>
    );
  }
}

export default Headline;