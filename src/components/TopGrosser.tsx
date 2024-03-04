import React from 'react';
import { getTopGrosser } from '../lib/fetchers';
import MovieRow from './MovieRow';

const TopGrosser = () => {
  return (
    <MovieRow
      title='Box Office #1'
      queryKey='topGrosser'
      queryFn={getTopGrosser}
    />
  );
};

export default TopGrosser;
