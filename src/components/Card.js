import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCard, useCard } from './ContexReducer';

export default function Card(props) {
    const dispatch = useDispatchCard();
    const data = useCard();
    const priceRef = useRef();
    const options = props.options || {};
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState('1');
    const [size, setSize] = useState('');

    useEffect(() => {
        if (priceOptions.length > 0) {
            setSize(priceOptions[0]);
        }
    }, [priceOptions]);

    const finalPrice = qty * parseInt(options[size]);

    const handleCart = async () => {
        let food = data.find(item => item.id === props.foodItem._id);

        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: parseInt(qty) });
            } else {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: parseInt(qty),
                    size: size,
                    img: props.foodItem.img || ""
                });
            }
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: parseInt(qty),
                size: size,
                img: props.foodItem.img || ""
            });
        }
    };

    return (
        <div className="card-container">
            <div className="card mt-3">
                <img 
                    src={props.foodItem.img || "https://img.freepik.com/premium-photo/hamburger-with-cheese-onions-it_662214-47258.jpg"} 
                    className="card-img-top" 
                    alt="Card image cap" 
                    style={{ height: "180px", objectFit: "fill" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">This is some important</p>
                    <div className="container">
                        <div className="select-container">
                            <select className="m-2 h-100 bg-success" onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                            <div className="total-price d-inline h-100 fs-5"> 
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className="btn btn-success justify-center ms-2" onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
