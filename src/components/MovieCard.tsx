import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../screens/HomeStack';
import { StackNavigationProp } from '@react-navigation/stack';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movie Details'
>;

const MovieCard = ({ movie }: { movie: Result }) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() =>
          navigation.navigate('Movie Details', {
            movieId: movie.id,
          })
        }
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          height={300}
          width={200}
          style={styles.img}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  card: {
    backgroundColor: '#252525',
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  img: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
});
