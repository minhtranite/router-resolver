import React from 'react';
import Document from 'components/common/Document';
import {Link} from 'react-router';

class PageExample4 extends React.Component {
  static resolve() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('data');
      }, 2000);
    });
  };

  static propTypes = {
    response: React.PropTypes.string.isRequired,
    children: React.PropTypes.node
  };

  render() {
    return (
      <Document title='Example4 | Router resolver' className='page-ex-4'>
        <div>
          <h1>Example 4: {this.props.response}</h1>
          <Link className='btn btn-primary' to='/ex-4/modal'>Open Modal</Link>
          {this.props.children}
        </div>
      </Document>
    );
  }
}

export default PageExample4;
