import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthState';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './HomeStack';
import { useQuery } from '@tanstack/react-query';
import { getFavourites } from '../lib/fetchers';
import { useRefreshByUser } from '../lib/useRefreshByUser';
import { useRefreshOnFocus } from '../lib/useRefreshOnFocus';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Movie Details'
>;

const Favourites = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['favourites'],
    queryFn: () => getFavourites(currentUser?.uid as string),
    enabled: currentUser ? true : false,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useRefreshOnFocus(refetch, currentUser);

  return (
    <>
      {currentUser ? (
        !isPending ? (
          <ScrollView style={styles.container}>
            <FlatList
              style={{ marginBottom: 20 }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefetchingByUser}
                  onRefresh={refetchByUser}
                />
              }
              scrollEnabled={false}
              data={data}
              numColumns={2}
              keyExtractor={(item) => item?.name as string}
              renderItem={({ item }) => (
                <Pressable
                  style={{ backgroundColor: '#252525', borderRadius: 6 }}
                  onPress={() => {
                    navigation.navigate('Movie Details', {
                      movieId: item.id as number,
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    height={160}
                    width={160}
                    style={{ margin: 1 }}
                  />
                  <View style={{ padding: 8 }}>
                    <Text
                      style={[
                        styles.text,
                        { fontSize: 14, textAlign: 'center' },
                      ]}
                    >
                      {item?.name}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )
      ) : (
        <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
          <Text style={[styles.text, { fontSize: 20, textAlign: 'center' }]}>
            Please login to view favourites
          </Text>
        </View>
      )}
      {error && (
        <Text style={{ textAlign: 'center', color: '#fff' }}>
          Something went wrong...
        </Text>
      )}
    </>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
