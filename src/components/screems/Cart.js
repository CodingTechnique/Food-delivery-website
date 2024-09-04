import React from 'react';
import { useCard, useDispatchCard } from '../ContexReducer';
import trash from '../../assets/trash.svg';

export default function Cart() {
    const data = useCard();
    const dispatch = useDispatchCard();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        );
    }
       
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
    
        if (!userEmail) {
            alert("User not logged in.");
            return;
        }
    
        let response = await fetch('http://localhost:5000/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString() // Make sure this is sent correctly
            })
        });
    
        const jsonResponse = await response.json();
        console.log("Order Response:", jsonResponse);
    
        if (response.status === 200) {
            dispatch({ type: 'DROP' });
        } else {
            alert("Order Error: " + (jsonResponse.error || "Unknown error"));
        }
    };
    
    const totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td style={{ color: 'white' }}>{food.name || "N/A"}</td>
                                <td style={{ color: 'white' }}>{food.qty || "N/A"}</td>
                                <td style={{ color: 'white' }}>{food.size || "N/A"}</td>
                                <td style={{ color: 'white' }}>{food.price || "N/A"}</td>
                                <td >
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => dispatch({ type: "REMOVE", index: index })}
                                    >
                                        <img src={trash} alt='delete' height="20px" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 style={{ color: 'white' }} className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
}
