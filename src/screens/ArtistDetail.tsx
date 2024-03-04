import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './HomeStack';
import { useQuery } from '@tanstack/react-query';
import { getArtistDetails } from '../lib/fetchers';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

type DetailsScreenNavigationProp = RouteProp<RootStackParamList, 'Artist'>;

const ArtistDetail = () => {
  const { params } = useRoute<DetailsScreenNavigationProp>();

  const { data, error, isPending } = useQuery({
    queryKey: ['movieId', params.artistId],
    queryFn: () => getArtistDetails(params.artistId),
  });

  const openLink = async (type: string, username: string) => {
    let url: string;

    if (type === 'insta') {
      url = `https://www.instagram.com/${username}`;
      console.log(url);
      await Linking.openURL(url);
    }

    if (type === 'twitter') {
      url = `https://www.twitter.com/${username}`;
      console.log(url);
      await Linking.openURL(url);
    }
  };

  return (
    <>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${data?.profile_path}`,
              }}
              height={100}
              width={100}
              style={{ borderRadius: 4 }}
            />
            <View>
              <Text style={[styles.text, { fontSize: 24, marginBottom: 2 }]}>
                {data?.name}
              </Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>
                {data?.place_of_birth}
              </Text>
              <Text style={{ fontSize: 14, color: 'gray', marginBottom: 5 }}>
                {data?.birthday}
              </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {data?.external_ids.instagram_id && (
                  <Pressable
                    onPress={() =>
                      openLink('insta', data?.external_ids.instagram_id)
                    }
                  >
                    <AntDesign name='instagram' size={16} color='white' />
                  </Pressable>
                )}
                {data?.external_ids.twitter_id && (
                  <Pressable
                    onPress={() =>
                      openLink('twitter', data?.external_ids.twitter_id)
                    }
                  >
                    <AntDesign name='twitter' size={16} color='white' />
                  </Pressable>
                )}
              </View>
            </View>
          </View>
          <Text style={[styles.text, { lineHeight: 18, marginBottom: 10 }]}>
            {data?.biography}
          </Text>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 10 }]}>
            Gallery
          </Text>
          <View style={{ marginBottom: 20 }}>
            <FlatList
              scrollEnabled={false}
              data={data?.images.profiles}
              numColumns={3}
              keyExtractor={(item) => item.file_path}
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.file_path}`,
                  }}
                  height={105}
                  width={105}
                  style={{ margin: 1, borderRadius: 4 }}
                />
              )}
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

export default ArtistDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
  },
});
