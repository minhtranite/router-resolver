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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    response: React.PropTypes.string.isRequired
  };

  state = {
    isOpen: true
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    }, () => {
      if (this.context.router.goBack) {
        this.context.router.goBack();
      } else {
        this.context.router.push('/ex-4');
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
