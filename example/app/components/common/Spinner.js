import React from 'react';
import ClassNames from 'classnames';

class Spinner extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool,
    fullScreen: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    isLoading: false,
    fullScreen: false,
    type: 'spinner'
  };

  render() {
    let wrapperClassName = ClassNames({
      'spinner-wrapper': true,
      'hidden': !this.props.isLoading,
      'full-screen': this.props.fullScreen
    });
    let classObject = {
      'spinner': true
    };
    classObject['spinner-' + this.props.type] = true;
    let className = ClassNames(classObject);
    return (
      <div className={wrapperClassName}>
        <div className={className}/>
      </div>
    );
  }
}

export default Spinner;
