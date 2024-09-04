import React, { useEffect, useState } from 'react';
import Footer from '../Footer'; // Path सही रखें
import Navbar from '../Navbar'; // Path सही रखें

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null); // Initialize as null

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            const data = await response.json();
            console.log(data); 
            
            // If the fetched data is not empty or null, set it to state
            if (data && data.orderData) {
                setOrderData(data.orderData);
            } else {
                setOrderData([]); // Set to empty array if no order data is found
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.length > 0 ? ( 
                        orderData.slice(0).reverse().map((item, index) => (
                            <div key={index}>
                                {item.map((arrayData, idx) => (
                                    <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                        {arrayData.Order_date ? (
                                            <div className='m-auto mt-5'>
                                                <div style={{ color: 'red' }}>{arrayData.Order_date}</div>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ color: 'blue' }}>{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1' style={{ color: 'green' }}>{arrayData.qty}</span>
                                                        <span className='m-1' style={{ color: 'purple' }}>{arrayData.size}</span>
                                                        <span className='m-1'>{arrayData.Order_date}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No order data available</div> 
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
