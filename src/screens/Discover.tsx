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
import { getPopular } from '../lib/fetchers';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './HomeStack';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movie Details'
>;

const Discover = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const { data, error, isPending } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopular,
  });

  return (
    <>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <View style={styles.inputBox}>
              <Text style={{ color: 'gray' }}>Search for movies</Text>
            </View>
          </Pressable>
          <FlatList
            style={{ marginBottom: 20 }}
            scrollEnabled={false}
            data={data?.results}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Movie Details', {
                    movieId: item.id,
                  })
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                  }}
                  height={110}
                  width={110}
                  style={{ margin: 1 }}
                />
              </Pressable>
            )}
          />
        </ScrollView>
      )}
      {error && (
        <Text style={{ textAlign: 'center', color: '#fff' }}>
          Something went wrong...
        </Text>
      )}
    </>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
  },
  inputBox: {
    color: '#fff',
    height: 40,
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#252525',
    justifyContent: 'center',
  },
});
