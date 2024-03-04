import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addFavourite,
  deleteFavourite,
  getFavourites,
  getMovieDetails,
  getMovieTrailer,
} from '../lib/fetchers';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './HomeStack';
import CastCrew from '../components/CastCrew';
import MovieCard from '../components/MovieCard';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext, AuthContextType } from '../context/AuthState';
import { serverTimestamp } from 'firebase/firestore';

type DetailsScreenNavigationProp = RouteProp<
  RootStackParamList,
  'Movie Details'
>;

const MovieDetail = () => {
  const queryClient = useQueryClient();

  const { params } = useRoute<DetailsScreenNavigationProp>();

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const { data, error, isPending } = useQuery({
    queryKey: ['movieId', params.movieId],
    queryFn: () => getMovieDetails(params.movieId),
  });

  const { data: trailerData } = useQuery({
    queryKey: ['trailerId', params.movieId],
    queryFn: () => getMovieTrailer(params.movieId),
  });

  const {
    data: likeData,
    isPending: likePending,
    refetch,
  } = useQuery({
    queryKey: ['favourites'],
    queryFn: () => getFavourites(currentUser?.uid as string),
  });

  const trailerKey = trailerData?.results?.sort(
    (a, b) =>
      new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
  )[0]?.key;

  const isMovieLiked = likeData?.find(
    (item) => item.id === params.movieId && item.uid === currentUser?.uid
  );

  const addMutation = useMutation({
    mutationFn: addFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
      refetch();
    },
  });

  const handleLiking = (favBody: Favs) => {
    addMutation.mutate(favBody);
  };

  const handleUnLiking = () => {
    deleteMutation.mutate(isMovieLiked?.docId as string);
  };

  return (
    <>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`,
              }}
              height={150}
              style={{ borderRadius: 6, marginBottom: 10 }}
            />
          </View>
          <Text style={[styles.text, { fontSize: 24, marginBottom: 10 }]}>
            {data?.title}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={[styles.certification, { fontSize: 10 }]}>
              {data?.adult ? 'A' : 'UA'}
            </Text>
            <Text style={styles.text}>•</Text>
            <Text style={styles.text}>{data?.release_date}</Text>
            <Text style={styles.text}>•</Text>
            <Text style={styles.text}>{data?.runtime} mins</Text>
          </View>
          {likePending ? (
            <ActivityIndicator />
          ) : isMovieLiked ? (
            <Pressable
              onPress={handleUnLiking}
              style={[styles.likeButton, { width: 75 }]}
            >
              <AntDesign name='heart' size={16} color='white' />
              <Text style={styles.text}>UnLike</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                handleLiking({
                  id: data?.id,
                  image: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`,
                  name: data?.title,
                  overview: data?.overview,
                  timeStamp: serverTimestamp(),
                  uid: currentUser?.uid,
                })
              }
              style={styles.likeButton}
            >
              <AntDesign name='hearto' size={16} color='white' />
              <Text style={styles.text}>Like</Text>
            </Pressable>
          )}

          <Text style={[styles.text, { marginBottom: 10, lineHeight: 18 }]}>
            {data?.overview}
          </Text>
          <Text style={[styles.text, { fontSize: 20, marginBottom: 10 }]}>
            Trailer
          </Text>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
            style={{ height: 170, marginBottom: 10 }}
          />
          <View>
            <Text style={[styles.text, { fontSize: 20, marginBottom: 10 }]}>
              Cast
            </Text>
            <FlatList
              style={{ marginBottom: 10 }}
              horizontal
              data={data?.credits.cast}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ marginHorizontal: 5 }}></View>
              )}
              renderItem={({ item }) => <CastCrew cast={item} />}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.text, { fontSize: 20, marginBottom: 10 }]}>
              Similar
            </Text>
            <FlatList
              horizontal
              data={data?.similar.results}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ marginHorizontal: 5 }}></View>
              )}
              renderItem={({ item }) => <MovieCard movie={item} />}
            />
          </View>
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

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  certification: {
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    padding: 2,
    textAlign: 'center',
    borderRadius: 3,
  },
  likeButton: {
    backgroundColor: '#F66902',
    padding: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
    width: 65,
  },
});
