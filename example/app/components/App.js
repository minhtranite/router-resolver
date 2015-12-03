import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ReactProgressBar from 'react-progress-bar-plus';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    resolving: React.PropTypes.bool
  };

  static defaultProps = {
    resolving: false
  };

  static childContextTypes = {
    resolver: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className='layout-page'>
        <Header/>
        <main className='layout-main'>
          <div className='container'>
            {this.props.children}
          </div>
        </main>
        <Footer/>
        <ReactProgressBar percent={this.props.resolving ? 0 : 100}
          autoIncrement={true}/>
      </div>
    );
  }
}

export default App;
