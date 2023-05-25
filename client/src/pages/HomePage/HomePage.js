import React from 'react';
import Navbar from '../../components/Navbar/Navbar'
import ImageSlider from '../../components/Navbar/ImageSlider/ImageSlider';

export default function Home() {
  return (
    <div>
      <Navbar />
      
      <main>
        <div className="relative pt-32 pb-10 px-6 sm:px-8 lg:px-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Everything You Need In One Place
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Dive into a world of variety and find exactly what you're looking for. From clothes and accessories to electronics and furniture, we've got you covered.
            </p>
            <br></br>
            <ImageSlider/>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Shopping
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
