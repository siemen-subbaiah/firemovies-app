import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../lib/fetchers';
import useDebounce from '../lib/useDebounce';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './HomeStack';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movie Details'
>;

const SearchScreen = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isPending } = useQuery({
    queryKey: ['popular', { debouncedSearch }],
    queryFn: () => searchMovies(debouncedSearch),
  });

  return (
    <>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={search}
          onChangeText={setSearch}
          placeholder='Search for movies'
          placeholderTextColor='gray'
          autoFocus
        />
        {isPending ? (
          <ActivityIndicator />
        ) : (
          search.length >= 1 && (
            <FlatList
              style={{ marginVertical: 10 }}
              scrollEnabled={false}
              data={data?.results}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={() => (
                <Text
                  style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}
                >
                  No data found for the search term
                </Text>
              )}
              ItemSeparatorComponent={() => (
                <Text
                  style={{
                    position: 'relative',
                    top: -10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                  }}
                ></Text>
              )}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('Movie Details', {
                      movieId: item.id,
                    })
                  }
                >
                  <View style={styles.movieResults}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                      }}
                      height={50}
                      width={50}
                      style={{ borderRadius: 4 }}
                    />
                    <Text style={{ color: '#fff' }}>{item.title}</Text>
                  </View>
                </Pressable>
              )}
            />
          )
        )}
        {error && (
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            Something went wrong...
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  inputBox: {
    color: '#fff',
    height: 40,
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: '#252525',
    padding: 8,
  },
  movieResults: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
