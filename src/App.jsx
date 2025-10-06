import './App.css';
import React, {useEffect, useState} from "react";

import NavScrollExample from "./components/header";
import Product from "./components/product";

function App() {
    const [itemCount, setItemCount] = useState(0);

    // Fetch the total item count from localStorage when the component mounts
    useEffect(() => {
        const count = parseInt(localStorage.getItem("totalItems") || "0", 10);
        setItemCount(count);
    }, []);

    const handleAddToCart = (itemId) => {
        localStorage.setItem("item" + itemId, itemId);
        for (let [key, value] of Object.entries(localStorage)) {
            console.log(`${key}: ${value}`);
        }
        // Update total count of items in localStorage (global cart count)
        let totalItems = parseInt(localStorage.getItem("totalItems") || "0", 10);

        totalItems++;
        localStorage.setItem("totalItems", totalItems.toString());
        setItemCount(totalItems)
    };
  return (
    <div className="App">
      <NavScrollExample itemCount={itemCount}/>
       <Product handleAddToCart={handleAddToCart}/>
    </div>
  );
}

export default App;
