import React from 'react';
import Document from 'components/common/Document';

class PageExample1 extends React.Component {
  static resolve() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('simple data');
      }, 2000);
    });
  };

  static propTypes = {
    response: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <Document title='Example1 | Router resolver' className='page-ex-1'>
        <h1>Example 1: {this.props.response}</h1>
      </Document>
    );
  }
}

export default PageExample1;

