import React from 'react';
import { getByGenre, getTopGrosser } from '../lib/fetchers';
import MovieRow from './MovieRow';

type GenreProps = {
  title: string;
  queryKey: string;
  genreId: number;
};

const Genre = ({ title, queryKey, genreId }: GenreProps) => {
  return (
    <MovieRow
      title={title}
      queryKey={queryKey}
      queryFn={() => getByGenre(genreId)}
    />
  );
};

export default Genre;
