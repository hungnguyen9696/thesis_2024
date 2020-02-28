import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { isAuthenticated } from '../auth/index';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Checkout</button>
        ) : (
                <Link to='/signin'>
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>
            )
    }

    // const buy = () => {
    //     // code
    //     createOrder(userId, token, createOrderData)
    //         .then(response => {
    //             emptyCart(() => {
    //                 setRun(!run); // run useEffect in parent Cart
    //                 console.log('payment success and empty cart');
    //                 setData({
    //                     loading: false,
    //                     success: true
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             setData({ loading: false });
    //         });
    // }
    // // code


    return (
        <div>
            <h2>Total: ${getTotal()}</h2>

            {showCheckout()}

        </div>
    )
}

export default Checkout;