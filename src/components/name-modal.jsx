import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {FormControl} from 'react-bootstrap'
import {Alert} from 'react-bootstrap'



class NameModal extends Component{
  constructor(props) {
    super(props);
    this.state=({
      name:"",
      displayInputMessage:false
    })
  }

  displayInputMessage=()=>{
    if(this.state.displayInputMessage===false){
      return;
    }else{
      return(
        <Alert bsStyle='danger' onDismiss={this.handleDismiss}>
          <p>Please use a correct format name</p>
        </Alert>
      )
    }
  }

  handleClose=()=> {
    if(this.state.name.length!==0){
      this.props.getNameFromModal(this.state.name);
    }else{
      this.setState({displayInputMessage:true})
    }
  }

  handleNameChange=(event)=>{
    this.setState({name:event.target.value})
  }
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.handleClose} keyboard={false} backdrop='static' >

          <Modal.Body>
            <h1>Please choose your name</h1>
            <p>For the moment you can change it only by deleting cookies</p>
            <FormControl value={this.state.name} onChange={this.handleNameChange} />
            {this.displayInputMessage()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Choose Name</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NameModal;
