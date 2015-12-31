import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ReactProgressBar from 'react-progress-bar-plus';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    let {router} = this.context;
    return (
      <div className='layout-page'>
        <Header/>
        <main className='layout-main'>
          <div className='container'>
            {this.props.children}
          </div>
        </main>
        <Footer/>
        <ReactProgressBar percent={router.resolving ? 0 : 100}
          autoIncrement={true}/>
      </div>
    );
  }
}

export default App;
