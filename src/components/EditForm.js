import React, { Component } from 'react'
import { Button,Modal,Form } from 'react-bootstrap'
export class EditForm extends Component {
    constructor() {
        super()
        this.state={
          show:true,
          description:'',
          image_url:'',
          title:'',
          toUSD:'',

        }
      }
    handle=()=>{
        this.props.handleShow(false)
    }
    submitHandler=(e)=>{
e.preventDefault()
        this.props.handleShow(false);
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state)

    }
    render() {
        return (
            <div>
                return (
      <>
        <Modal show={this.state.show} >
          <Modal.Header closeButton  onClick={()=>this.handle(false)} >
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <>
          <Form onSubmit={(e)=>this.submitHandler(e)}>
          <>
<Form.Control size="lg" type="text" placeholder="title"  name="title"/>
<br />
<Form.Control type="text" placeholder="description" name="description" />
<br />
<Form.Control size="lg" type="text" placeholder="toUSD " name="toUSD" />
<br />
<Form.Control size="lg" type="text" placeholder="image_url " name="title" />
</>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
</>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>this.handle(false)}>
              Close
            </Button>
            <Button variant="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
            </div>
        )
    }
}

export default EditForm
