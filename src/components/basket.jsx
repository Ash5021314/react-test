import React, {useEffect, useState} from "react";
import NavScrollExample from "./header";
import Container from "react-bootstrap/Container";
import {Card, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaRegWindowClose, FaShoppingBasket, FaWindowClose} from "react-icons/fa";
import Form from "react-bootstrap/Form";

export default function Basket() {
const [cartProduct, setCartProduct] = useState([])
const [totalItem, setTotalItem] = useState(0)
    let basketProducts = JSON.parse(localStorage.getItem('cart') || '[]')
    let basketTotalCount = JSON.parse(localStorage.getItem('totalItems'))

    function setItemInLocalstorage(storageName, storageValue) {
        localStorage.setItem(storageName,storageValue)
    }
    function removeElementFromBasket(id) {
        let basketCurrentItem = basketProducts.filter((item) => item.id === id);
        basketProducts = basketProducts.filter((item) => item.id !== id);
        basketTotalCount = basketTotalCount - basketCurrentItem[0].quantity

        setCartProduct(basketProducts)
        setTotalItem(basketTotalCount)
        setItemInLocalstorage('cart',JSON.stringify(basketProducts))
        setItemInLocalstorage('totalItems',JSON.stringify(basketTotalCount))
        document.querySelector('.basket span').innerHTML = basketTotalCount;
    }

    function addBasketCount(id) {
        basketTotalCount  = basketTotalCount +1;
        setItemInLocalstorage('totalItems',JSON.stringify(basketTotalCount))
        document.querySelector('.basket span').innerHTML = basketTotalCount;
        let basketCurrentItem = basketProducts.filter((item) => item.id === id);
        basketCurrentItem[0].quantity++


    }

    function decreesBasketItem(id) {

    }

    return (

        <Container>
            <h1>Cart</h1>

            <Row xs={2} md={4} className="g-4">
                {basketProducts.map((item)=> (
                    <Col key={item.id}>
                        <Card style={{ width: '18rem',height:'500px',  padding:'20px'}}>
                            <FaWindowClose onClick={()=>removeElementFromBasket(item.id)} style={{display:'flex',alignSelf:'end',cursor:'pointer'}}/>
                            <Card.Img variant="top" src={item.image} style={{height:'180px'}}/>
                            <Card.Body style ={{padding:'15px 0 0 0',display: 'flex',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'center'}}>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text style={{height:'110px',overflow:'hidden'}}>
                                    {item.description}
                                </Card.Text>

                                <Form className='d-flex justify-content-between'>
                                    <Button onClick={() => addBasketCount(item.id)} variant="outline-dark">+</Button>
                                    <Form.Control
                                        type="text"
                                        className="mx-5 quantity"
                                        defaultValue={item.quantity}
                                    />
                                    <Button onClick={()=> decreesBasketItem(item.id)} variant="outline-dark">-</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}