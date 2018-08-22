import React from 'react';
import { Button, Grid, Row, Col, Well, FormControl } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_SITTER = gql`
  mutation updateSitter(
    $id: ID!,
    $child_rate: Float,
    $child_addl: Float,
    $pet_rate: Float,
    $pet_addl: Float,
    $home_rate: Float,
    ) {
      updateSitter(
        id: $id
        sitter: {
          rates: {
            child_rate: $child_rate,
            child_addl: $child_addl,
            pet_rate: $pet_rate,
            pet_addl: $pet_addl,
            home_rate: $home_rate
          }
        }
      ) {
        child_rate
        child_addl
        pet_rate
        pet_addl
        home_rate
      }
    }
`

export default class SitterSetPrices extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      child: this.props.child || 0,
      child_addl: this.props.child_addl || 0,
      pet: this.props.pet || 0,
      pet_addl: this.props.pet_addl || 0,
      home: this.props.home || 0
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
  }

  handleChangeInput(e) {
    this.setState({
      [e.target.id]: parseInt(e.target.value)
    })
  }


  handlePriceChange(updateSitter) {
    updateSitter({
      variables: {
        id: this.props.id,
        sitter: {
          rates: {
            child_rate: this.state.child,
            child_addl: this.state.child_addl,
            pet_rate: this.state.pet,
            pet_addl: this.state.pet_addl,
            home_rate: this.state.home
          }
        }
      }
    }).then(({ data }) => {
      console.log(data)
    })
  }

  render() {
    return(
      <Mutation mutation={UPDATE_SITTER}>
      {(updateSitter, { loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        return(
        <div>
          <Row>
            <Col xs={12}>
              <center><h3>Pricing</h3></center>
                <Well bsSize="large" style={{ width:'100%' }}>
                  <Row>
                    <Col xs={1}>
                    <h4>Child:</h4> 
                    </Col>

                    <Col xs={2}>
                      <FormControl
                      type="number"
                      placeholder='Enter price per hour'
                      value={this.state.child}
                      id='child'
                      onChange={this.handleChangeInput} />
                    </Col>

                    <Col xs={2} xsOffset={2}>
                    <h4>Additional Child:</h4><br/>
                    </Col>

                    <Col xs={2}>
                      <FormControl
                      type="number"
                      value={this.state.child_addl}
                      placeholder='Enter price per hour'
                      id='child_addl'
                      onChange={this.handleChangeInput} />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={1}>
                    <h4>Pet:</h4> 
                    </Col>

                    <Col xs={2}>
                      <FormControl
                      type="number"
                      placeholder='Enter price per day'
                      value={this.state.pet}
                      id='pet'
                      onChange={this.handleChangeInput} />
                    </Col>

                    <Col xs={2} xsOffset={2}>
                    <h4>Additional Pet:</h4><br/>
                    </Col>

                    <Col xs={2}>
                      <FormControl
                      type="number"
                      placeholder='Enter price per day'
                      value={this.state.pet_addl}
                      id='pet_addl'
                      onChange={this.handleChangeInput} />
                    </Col>
                  </Row>


                  <Row>
                    <Col xs={1}>
                    <h4>House:</h4> 
                    </Col>

                    <Col xs={2}>
                      <FormControl
                      type="number"
                      placeholder='Enter price per day'
                      value={this.state.home}
                      id='home'
                      onChange={this.handleChangeInput} />
                    </Col>
                  </Row>
                  <br/>
                  <Button onClick={this.handlePriceChange(updateUser)}>Click to Update</Button>
                </Well>
            </Col>
          </Row>
        </div>
        )
      }}
      </Mutation>
    )
  }
}
