import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../lib/fetchers';
import MovieCard from './MovieCard';

type MovieRowProps = {
  title: string;
  queryKey: string;
  queryFn: (genreId?: number) => Promise<Movie>;
  genreId?: number;
};

const MovieRow = ({ title, queryKey, queryFn, genreId }: MovieRowProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn(genreId),
  });

  return (
    <>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.text}>
            {title} <Text style={{ color: '#F66902' }}>Movies</Text>
          </Text>
          <FlatList
            style={{ marginVertical: 10 }}
            horizontal
            ItemSeparatorComponent={() => (
              <View style={{ marginHorizontal: 5 }}></View>
            )}
            data={data?.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard movie={item} />}
          />
        </View>
      )}
      {error && (
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
          Something went wrong...
        </Text>
      )}
    </>
  );
};

export default MovieRow;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
  },
});
