import React, { useState, useEffect, useRef } from 'react';
import AwesomeSlider, { AwesomeSliderProps } from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import fetchBeaches from '../services/BeachService';
import { Beach } from '../interfaces/Beach'

interface CustomSliderProps extends AwesomeSliderProps {
  onPrev: () => void;
  onNext: () => void;
}

const Carousel: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch image URLs from an API or other data source
    fetchBeaches()
      .then((data: Beach[]) => {
        // Extract the image URLs or paths from the fetched data
        const imageUrls = data.map((item) => item.Photo_1);
        console.log('imageUrls', imageUrls)
        // Update the images state with the extracted image URLs or paths
        setImages(imageUrls);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const sliderProps: CustomSliderProps = {
    startupScreen: <div key={currentSlide} />,
    onPrev: handlePrevious,
    onNext: handleNext,
  };

  return (
    <div>
    <AwesomeSlider
      {...sliderProps}
    >
      {images.map((image, index) => (
        <div key={index} data-src={image} />
      ))}    
    </AwesomeSlider>
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;