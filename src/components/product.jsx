import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {FaShoppingBasket} from "react-icons/fa";

export default function Product({handleAddToCart}) {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            }).catch((err) => {
            setError(err.error);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <div className="loader"> Loading....... </div>
    }

    if (error) {
        return <div className='error'>{error}</div>
    }


    return (

        <Container>
            <h1>products</h1>

            <Row xs={2} md={4} className="g-4">
            {products.map((item)=> (
                <Col  key={item.id}>
                <Card style={{ width: '18rem',height:'500px',  }}>
                    <Card.Img variant="top" src={item.image} style={{height:'180px'}}/>
                    <Card.Body style ={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'center'}}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text style={{height:'110px',overflow:'hidden'}}>
                            {item.description}
                        </Card.Text>
                        <Button variant="primary" onClick={() => handleAddToCart(item.id)}><FaShoppingBasket  style={{fontSize:"20px"}}/></Button>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </Container>
    )
}