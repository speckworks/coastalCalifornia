import React, { useState, useEffect, useRef } from 'react';
import AwesomeSlider, { AwesomeSliderProps } from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import fetchBeaches from '../services/BeachService';
import { Beach } from '../interfaces/Beach'

interface CustomSliderProps extends AwesomeSliderProps {
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void
}

const Carousel: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selected, setSelected] = useState(0);


  useEffect(() => {
    // Fetch image URLs from an API or other data source
    fetchBeaches()
      .then((data: Beach[]) => {
        // Extract the image URLs or paths from the fetched data
        const imageUrls = data.map((item) => item.Photo_1);
        const imageUrlsFiltered = imageUrls.filter((item) => item !== "");
        console.log('imageUrlsFiltered', imageUrlsFiltered)
        // Update the images state with the extracted image URLs or paths
        setImages(imageUrlsFiltered);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const sliderProps: CustomSliderProps = {
    startupScreen: <div key={ currentSlide } />,
    onPrev: handlePrevious,
    onNext: handleNext,
    selected: currentSlide,
    onSelect: handleSelect,
    buttons: true,
  };

  return (
    <div>
      <div className='slider-container'>
        <AwesomeSlider
          {...sliderProps}
        >
          {images.map((image, index) => (
            <div key={index} data-src={image} />
          ))}    
        </AwesomeSlider>
      </div>
    <div className={'glass-panel'}>
    <button className={'glass-button'}onClick={handlePrevious}>Previous</button>
    <button className={'glass-button'} onClick={handleNext}>Next</button>
    </div>
    </div>
  );
};

export default Carousel;