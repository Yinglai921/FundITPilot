import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import D3KeywordThree from './d3-keyword-tree';

class KeywordSuggestionModal extends Component{
    constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    render() {
        return (
        <div>
            <Button color="info" onClick={this.toggle}>Keyword Suggestion</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
                <p>Keyword tree</p>
                <select id="search" className="search"></select>
                <D3KeywordThree />
            </ModalBody>
            <ModalFooter>
                {/*<Button color="primary" onClick={this.toggle}>Do Something</Button>*/}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default KeywordSuggestionModal;