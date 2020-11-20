import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { createDrone } from "../_actions/droneActions";
import {  Form } from "react-bootstrap";

class DroneCatalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          size: "",
          type: "",
          description: "",
          softwarespecs: "",
          hardwarespecs: "",
          base64TextString:"",
          image:null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

      handleImageChange = (e) => {
        console.log("files to upload: " , e.currentTarget.files[0]);
        
        //const file =  e.currentTarget.files[0];
        this.setState({ image: e.currentTarget.files[0] }, () => { console.log("files: " + this.state.image) });

        
        //console.log(files[0]);
        

         // console.log("image to upload: " + JSON.stringify(this.state.file));
        /*if(file) {
          const reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        }*/
      }

      _handleReaderLoaded = (readerEvt) => {
        const binaryString = readerEvt.target.result
        this.setState({
          base64TextString : btoa(binaryString)
        })
      }



      handleSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        this.setState({
          text: "",
          errors: "",
        });
       
          const data = {
            name: this.state.name,
            size: this.state.size,
            type: this.state.type,
            description: this.state.description,
            softwarespecs:this.state.softwarespecs,
            hardwarespecs:this.state.hardwarespecs,
            image:this.state.image,
            //image:this.state.base64TextString,
            status:'active'
          };

         // data.append(image,this.state.file);

          //console.log("data to send:" + data.image);
    
          this.props.createDrone(data);

          this.props.history.push("/main/admin/viewalldrones");
        
      };

      render() {
        const { text, errors } = this.state;
    
        return (
          <div class="container">
              <div class="row justify-content-center">
                  <div class="col-md-8">
                          <div class="card">
                              <div class="card-header">Create Drone</div>
                              <div class="card-body">
                              <Form>
              
            
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Name"
                    required
                  /></Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    name="type"
                    type="text"
                    value={this.state.dronetype}
                    onChange={this.handleChange}
                    placeholder="Type"
                  /></Form.Group>
                 
                  
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    type="text"
                    name="size"
                    value={this.state.size}
                    onChange={this.handleChange}
                    placeholder="Size"
                  />
                  
                </Form.Group>
               
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Description"
                  /></Form.Group>

<Form.Group controlId="hardwarespecs">
                  <Form.Label>Hardware Specifications</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="hardwarespecs"
                    value={this.state.hardwarespecs}
                    onChange={this.handleChange}
                    placeholder="Hardware Specifications"
                  /></Form.Group>

<Form.Group controlId="softwarespecs">
                  <Form.Label>Software Specifications</Form.Label>
                  <Form.Control as="textarea" rows={6}
                    name="softwarespecs"
                    value={this.state.softwarespecs}
                    onChange={this.handleChange}
                    placeholder="Software Specifications"
                  /></Form.Group>

              <Form.Group controlId="image">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => this.handleImageChange(e)}
                  /></Form.Group>
              
              <Button
                className="btn btn-primary"
                onClick={this.handleSubmit}
                type="submit"
              >
                Create Drone
              </Button>
              <br />
              <p className="text-danger"> {errors}</p>
              <p className="text-success"> {text}</p>
              <br />
            </Form>
                              </div>
                          </div>
                  </div>
              </div>
          </div>
      

      
        );
      }


} 

  const mapStateToProps = (state) => ({
    store: state.storeState,
    errors: state.errorState,
  });
  export default connect(mapStateToProps, { createDrone })(DroneCatalog);
