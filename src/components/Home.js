import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './comp.css'
class Home extends React.Component {
constructor() {
  super()
  this.state={
    data:[]
  }
  
}
// /
// description: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake. It can facilitate peer-to-peer transactions with its internal cryptocurrency, Ada. Cardano was founded in 2015 by Ethereum co-founder Charles Hoskinson."
// id: 3
// image_url: "https://static.news.bitcoin.com/wp-content/uploads/2021/04/35X2m6UL-cardano.png"
// title: "CARDANO"
// toUSD: "2.82"


addToFav=(crypto)=>{
     console.log(crypto)
      let data={
        email:this.props.auth0.user.email,
        title:crypto.title,
        description:crypto.description,
         toUSD:parseInt(crypto.toUSD), 
         image:crypto.image_url
      }
     axios.post(`${process.env.REACT_APP_BASE_URL}/user/${this.props.auth0.user.email}`,data).then(resp=>{
          console.log(resp);
     
     })
}

  componentDidMount=()=>{
    axios.get(process.env.REACT_APP_BASE_URL).then(resp=>{
      console.log(resp.data)
      this.setState({data:resp.data})
    })
  }
  render() {
    return (
      <>
        <h1>Crypto List</h1>
        <div className='cardDiv'>
         {this.state.data.map(item=>{
           return( <Card style={{ width: '18rem' }} key={item.id} >
           <Card.Img variant="top" src={item.image_url} />
           <Card.Body>
           <Card.Title>{item.title}</Card.Title>
          <Card.Text>
        {item.description}
        </Card.Text>
          <Card.Text>
        {item.toUSD}
        </Card.Text>
        <Button variant="primary" onClick={()=>this.addToFav(item)}>add to FavCrypto</Button>
           </Card.Body>
             </Card>)
         })}
        </div>
      </>
    )
  }
}

export default  withAuth0(Home);
