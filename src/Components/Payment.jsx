import React, { useState, useEffect } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import config from '../Utils/config.js'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const stripePromise = loadStripe(config.KEY);

function Payment(){

    let navigate = useNavigate();

    let {id} = useParams();
    console.log(typeof id)

    const stripe = useStripe();
    const elements = useElements();

    console.log(stripe);

    const handleToken = async (event) => {
        event.preventDefault();

        // Ensure that Stripe and Elements are loaded
        if (!stripe || !elements) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        console.log(cardElement)
        if (!cardElement) {
            console.error("CardElement is not available.");
            return;
        }

        try {
            const { token, error } = await stripe.createToken(cardElement);

            if (error) {
                console.error("Error creating token:", error.message);
                return;
            }

            // Send the token to your server
            const info = {token: token, userID: sessionStorage.getItem('data'), eventID: id}
            const response = await axios.post('https://event-management-backend-1qip.onrender.com/ticket/payment', info);
            console.log("Payment successful:", response.data);
            if(response.status === 200){
                toast.success(response.data.message)
                navigate('/index')
            }

        } catch (error) {
            console.error("Error processing payment:", error.message);
        }
    };
    
    
    

    return (
        <div>
            <h1>Payment Page</h1>
            <Form onSubmit={handleToken} className='pay-container'>
            <Form.Group as={Col} md="4" controlId="cardOwnerName">
                <Form.Label>Card Owner Name</Form.Label>
                <Form.Control type="text" placeholder="Enter card owner name" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <CardElement />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="expirationDate">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="CVV" />
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-4 ml-4' disabled={!stripe}>
                Confirm Payment
            </Button>
        </Form>
        </div>
    );
}

const PaymentPage = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <Payment/>
            </Elements>
        </div>
    );
};

export default PaymentPage;