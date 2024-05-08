import React, { useState, useEffect } from 'react';
import { Beach } from '../interfaces/Beach';
import { fetchBeaches } from '../services/BeachService';
import Carousel from './Carousel';

const BeachCarousel: React.FC = () => {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBeaches().then((data) => setBeaches(data));
  }, []);

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className={'carouselContainer'}>
      <Carousel/>
    </div>
  );
};

export default BeachCarousel;