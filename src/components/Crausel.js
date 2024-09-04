import React from 'react';

export default function Crausel() {
  return (
    <div className="carousel-container" style={{ position: 'relative' }}>
      <form className="d-flex search-form" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: '10', width: '80%' }}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
      </form>

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
  );
}
