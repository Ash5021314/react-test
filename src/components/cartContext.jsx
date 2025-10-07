import React,{createContext, useContext, useState, useEffect} from 'react'
const CartContext = createContext();
export const useCart = ()=>useContext(CartContext);

export const CartProvider = ({children})={
    const [CartCount,setCartCount] = useState(0);
}