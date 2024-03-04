import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/HomeStack';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Artist'
>;

const CastCrew = ({ cast }: { cast: Cast }) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() =>
          navigation.navigate('Artist', {
            artistId: cast?.id,
          })
        }
      >
        {cast.profile_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${cast.profile_path}`,
            }}
            height={100}
            style={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        ) : (
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            }}
            height={100}
            style={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        )}
        <Text style={{ padding: 8, color: 'white' }}>{cast.name}</Text>
      </Pressable>
    </View>
  );
};

export default CastCrew;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#252525',
    borderRadius: 4,
  },
});
