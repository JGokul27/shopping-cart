import React, { useState } from 'react'

const ShoppingCart = () => {
    const initialItems = [
        { id: 1, name: 'Product 1', price: 10, quantity: 1 },
        { id: 2, name: 'Product 2', price: 15, quantity: 1 },
        { id: 3, name: 'Product 3', price: 20, quantity: 1 },
    ] 
    const [cartItems, setCartItems] = useState(initialItems)

    const addItem = (id) => {
        const updatedCart = cartItems.map((item) => item.id === id ? {...item, quantity: item.quantity + 1} : item)
        setCartItems(updatedCart)
    }

    const removeItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id)
        setCartItems(updatedCart)
    }

    const updateQuantity = (id, newQuantity) => {
        if(newQuantity <= 0){
            removeItem(id)
        } else {
            const updatedCart = cartItems.map((item)=> item.id === id ? {...item, quantity: newQuantity} : item)
            setCartItems(updatedCart)
        }
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) 
    }
  return (
    <div>
        <h1>Shopping cart</h1>
        { cartItems.length === 0 ? (
            <p>Yourcart is empty</p>
        ) : (
            <>
                <ul>
                    {cartItems.map((item)=> (
                        <li key={item.id}>
                            <div className='container'>
                                <span>{item.name} - ₹{item.price}</span>
                                <input 
                                    type="number" 
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e)=> updateQuantity(item.id,parseInt(e.target.value))}
                                />
                                <button onClick={()=> removeItem(item.id)}>Remove</button>
                            </div>
                            <p className='subtotal'>Subtotal: {item.price * item.quantity}</p>
                        </li>
                    ))}
                </ul>
                <h3>Total price : {getTotalPrice()}</h3>
            </>
        ) }
    </div>
  )
}

export default ShoppingCart