import './App.css';
import React, {useEffect, useState} from "react";
import NavScrollExample from "./components/header";
import Product from "./components/product";
import {Route, Routes} from "react-router-dom";
import Basket from "./components/basket";
import axios from "axios";

function App() {
    const [itemCount, setItemCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [basketProducts, setBasketProducts] = useState([]);

    useEffect(() => {
        const count = parseInt(localStorage.getItem("totalItems") || "0", 10);
        setItemCount(count);
    }, [itemCount]);
    useEffect(() => {
        const productsInBasket = JSON.parse(localStorage.getItem('cart')) || [];
        setBasketProducts(productsInBasket);
    }, []);
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
            }).catch((err) => {
        })
    }, []);
    const handleAddToCart = (itemId) => {
        let product = products.find((p) => p.id === itemId);
        if (!product) return;

        setBasketProducts(prev => {
            const cart = [...prev];
            const index = cart.findIndex(p => p.id === product.id)
            if (index !== -1) {
                cart[index].quantity = (cart[index].quantity || 1) + 1;
            } else {
                cart.push({...product, quantity: 1});

            }
          
            localStorage.setItem('cart', JSON.stringify(cart));
            return cart
        });

        let totalItems = parseInt(localStorage.getItem("totalItems") || "0", 10);
        totalItems++;
        localStorage.setItem("totalItems", totalItems.toString());
        setItemCount(totalItems)
    };
    return (
        <div className="App">
            <NavScrollExample itemCount={itemCount}/>
            <Routes>
                <Route path="/" element={<h1>Главная страница</h1>}/>
                <Route path="/products" element={<Product handleAddToCart={handleAddToCart}/>}/>
                <Route path="/cart" element={<Basket/>}/>
            </Routes>
        </div>
    );
}

export default App;
