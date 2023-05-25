import React, { useState, useEffect } from 'react';

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2230&q=80',
    'https://plus.unsplash.com/premium_photo-1683288662057-2ac296955d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  ];

  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Set up the interval
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer); // This will clear the timer when the component unmounts
  }, [current]);

  return (
    <div className="relative">
      <button onClick={prevSlide} className="absolute left-0 bg-gray-500 text-white px-2 py-1">Previous</button>
      <button onClick={nextSlide} className="absolute right-0 bg-gray-500 text-white px-2 py-1">Next</button>
      {images.map((image, index) => (
        <div className={index === current ? 'block' : 'hidden'} key={index}>
          <img src={image} alt="slide img" className="w-full h-60 object-cover"/>
        </div>
      ))}
    </div>
  );
}
