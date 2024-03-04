import React from 'react';
import { getTrending } from '../lib/fetchers';
import MovieRow from './MovieRow';

const Trending = () => {
  return (
    <MovieRow title='Trending' queryKey='trending' queryFn={getTrending} />
  );
};

export default Trending;
