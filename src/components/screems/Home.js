import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "../Card";

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState("");

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="carousel-container" style={{ position: 'relative' }}>
                <div className="d-flex justify-content-center search-form" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: '10', width: '80%' }}>
                    <input 
                      className="form-control me-2" 
                      type="search" 
                      placeholder="Search" 
                      aria-label="Search" 
                      value={search} 
                      onChange={(e) => setSearch(e.target.value)} // Fixed this line
                    />
                </div>

                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" style={{ height: '550px', objectFit: 'cover' }} src="https://th.bing.com/th/id/OIP.3V2fvdA6O0fSG6qGMyMeZwHaEo?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" style={{ height: '550px', objectFit: 'cover' }} src="https://img.freepik.com/free-photo/photorealistic-burger-meal_23-2151432928.jpg" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" style={{ height: '550px', objectFit: 'cover' }} src="https://www.shutterstock.com/image-photo/food-feast-around-world-black-260nw-2275785943.jpg" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
            </div>

            <div className="container my-4">
                <h1 className="text-center mb-4">Food Categories</h1>
                {foodCat.length > 0 ? (
                    foodCat.map((data) => (
                        <div key={data._id} className="mb-4">
                            <h2 className="fs-3">{data.CategoryName}</h2>
                            <hr />
                            <div className="row">
                                {foodItem.length > 0 ? (
                                    foodItem
                                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map((filterItem) => (
                                            <div key={filterItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                                                <Card 
                                                    // foodName={filterItem.name}  
                                                    foodItem={filterItem}
                                                    options={filterItem.options[0]}  
                                                    // imgSrc={filterItem.img} // Ensure this is correctly passed
                                                />
                                            </div>
                                        ))
                                ) : (
                                    <div>No items found for this category.</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No Categories Available</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
