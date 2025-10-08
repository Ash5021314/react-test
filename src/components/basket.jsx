import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";

export default function Basket() {
    const [cartProducts, setCartProducts] = useState(() => {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    });

    const [totalItems, setTotalItems] = useState(() => {
        return JSON.parse(localStorage.getItem("totalItems")) || 0;
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        localStorage.setItem("totalItems", JSON.stringify(totalItems));
    }, [cartProducts, totalItems]);

    const removeElementFromBasket = (id) => {
        const productToRemove = cartProducts.find((item) => item.id === id);
        if (!productToRemove) return;

        setCartProducts((prev) => prev.filter((item) => item.id !== id));
        setTotalItems((prev) => prev - productToRemove.quantity);
    };

    const increaseQuantity = (id) => {
        setCartProducts((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        setTotalItems((prev) => prev + 1);
    };

    const decreaseQuantity = (id) => {
        setCartProducts((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
        setTotalItems((prev) => prev - 1);
    };
    return (
        <Container>
            <h1>Cart ({totalItems})</h1>
            <Row xs={2} md={4} className="g-4">
                {cartProducts.map((item) => (
                    <Col key={item.id}>
                        <Card style={{ width: "18rem", height: "500px", padding: "20px" }}>
                            <FaWindowClose
                                onClick={() => removeElementFromBasket(item.id)}
                                style={{ display: "flex", alignSelf: "end", cursor: "pointer" }}
                            />
                            <Card.Img variant="top" src={item.image} style={{ height: "180px" }} />
                            <Card.Body
                                style={{
                                    padding: "15px 0 0 0",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text style={{ height: "110px", overflow: "hidden" }}>
                                    {item.description}
                                </Card.Text>
                                <Form className="d-flex justify-content-between align-items-center w-100">
                                    <Button
                                        onClick={() => increaseQuantity(item.id)}
                                        variant="outline-dark"
                                    > + </Button>
                                    <Form.Control
                                        type="text"
                                        className="mx-3 text-center"
                                        value={item.quantity}
                                        readOnly
                                    />
                                    <Button
                                        onClick={() => decreaseQuantity(item.id)}
                                        variant="outline-dark"
                                        disabled={item.quantity <= 1}
                                    >-</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
