import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

/* TODO: Add an about referencing the used tools*/

class About extends Component {
  render() {
    return (
      <Container className="about">
        <h2>About</h2>
        <p>
          SDV Gift Calculator by{' '}
          <a href="https://www.reddit.com/user/Roang_zero1/">Roang_Zero1</a>.
        </p>
        <p>
          This app was inspired by <strong>Stardew Checkup</strong> available at{' '}
          <a href="https://mouseypounds.github.io/stardew-checkup/">
            https://mouseypounds.github.io/stardew-checkup/
          </a>
        </p>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(About);
