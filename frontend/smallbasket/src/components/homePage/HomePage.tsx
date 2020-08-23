import React, { Component } from "react";

/* Interface for Props for class HomePage */
interface Props {}

/* Interface for State for class HomePage */
interface State {}

class HomePage extends Component<Props, State> {
  render() {
    return (
      <>
        <div className="jumbotron">Home Page</div>
      </>
    );
  }
}

export default HomePage;
