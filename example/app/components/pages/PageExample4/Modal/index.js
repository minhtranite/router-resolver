import React from 'react';
import {Modal, ModalClose} from 'react-modal-bootstrap';

class PageExample4Modal extends React.Component {
  static resolve = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('modal data');
      }, 2000);
    });
  };
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    response: React.PropTypes.string.isRequired
  };

  state = {
    isOpen: true
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    }, () => {
      if (this.props.history.goBack) {
        this.props.history.goBack();
      } else {
        this.props.history.pushState(null, '/ex-4');
      }
    });
  };

  render() {
    let {response} = this.props;
    return (
      <Modal isOpen={this.state.isOpen}
        onRequestHide={this.closeModal}
        backdrop={false}>
        <div className='modal-header'>
          <ModalClose onClick={this.closeModal}/>
          <h4 className='modal-title'>Modal</h4>
        </div>
        <div className='modal-body'>
          <p>{response}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            facere in neque repellat. Cum laborum magnam reprehenderit unde
            voluptatum. Fugit minima nesciunt unde. At consequuntur dolorum hic
            labore officia quasi.</p>
        </div>
      </Modal>
    );
  }
}

export default PageExample4Modal;
