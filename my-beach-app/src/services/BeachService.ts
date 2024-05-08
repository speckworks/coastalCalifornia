// src/services/BeachService.ts
import { Beach } from '../interfaces/Beach';

const API_URL = 'https://api.coastal.ca.gov/access/v1/locations';

export const fetchBeaches = async (): Promise<Beach[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log('beach data', data);
  return data;
};

export default fetchBeaches;