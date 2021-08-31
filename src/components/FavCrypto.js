import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import EditForm from './EditForm';
class FavCrypto extends React.Component {
  constructor() {
    super()
    this.state={
      data:[],
      show:false
    }
    
  }

  removeFromFav=(item)=>{
    axios.delete(`${process.env.REACT_APP_BASE_URL}/delete/${item._id}`).then(resp=>{
      console.log(resp.data)
      axios.get(`${process.env.REACT_APP_BASE_URL}/userData/${this.props.auth0.user.email}`).then(resp=>{
        console.log(resp.data)
        this.setState({data:resp.data})
      })
    })
  }
  editFromFav=(item)=>{
    this.setState({show:true})
  }
  handleShow=(bool)=>{
    this.setState({show:bool})
  }

 
  componentDidMount=()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/userData/${this.props.auth0.user.email}`).then(resp=>{
      console.log(resp.data)
      this.setState({data:resp.data})
    })
  }


  render() {
    return(
      <>
        <h1>Fav Crypto List</h1>
        <div className='cardDiv'>
         {this.state.data.map(item=>{
           return( <Card style={{ width: '18rem' }} key={item._id} >
           <Card.Img variant="top" src={item.image} />
           <Card.Body>
           <Card.Title>{item.title}</Card.Title>
          <Card.Text>
        {item.description}
        </Card.Text>
          <Card.Text>
        {item.toUSD}
        </Card.Text>
        <Button variant="danger" onClick={()=>this.removeFromFav(item)}>remove to FavCrypto</Button>
        <Button variant="primary" onClick={()=>this.editFromFav(item)}>edit</Button>
       {this.state.show&& <EditForm handleShow={this.handleShow} />}
           </Card.Body>
             </Card>)
         })}
        </div>
      </>
    )
  }
}

export default withAuth0(FavCrypto) ;
