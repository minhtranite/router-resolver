import React from 'react';
import Document from 'components/common/Document';

class PageExample2 extends React.Component {
  static resolve() {
    let p1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          property1: 'Property 1 value',
          property2: 'Property 2 value'
        });
      }, 1000);
    });

    let p2 = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          property3: 'Property 3 value',
          property4: 'Property 4 value'
        });
      }, 1000);
    });

    return Promise.all([p1, p2]);
  };

  static propTypes = {
    response: React.PropTypes.array.isRequired
  };

  render() {
    let {response} = this.props;
    return (
      <Document title='Example2 | Router resolver' className='page-ex-2'>
        <div>
          <h1>Example 2</h1>
          <h4>Object 1 data:</h4>
          <pre>{JSON.stringify(response[0])}</pre>
          <h4>Object 2 data:</h4>
          <pre>{JSON.stringify(response[1])}</pre>
        </div>
      </Document>
    );
  }
}

export default PageExample2;

