import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <Image source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://miro.medium.com/v2/resize:fit:1024/0*dhDZY5VlvfPB5WtZ.png',
            height: 200,
          }}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.text, { fontSize: 24 }]}>React Native</Text>
          <Text style={[styles.text, { marginVertical: 5 }]}>
            React Native is an open-source UI software framework created by Meta
            Platforms, Inc. It is used to develop applications for Android
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://assets-global.website-files.com/5e740d74e6787687577e9b38/63978bf83d789b4602145daf_maximizing-efficiency-and-productivity-with-expo-dev-tools-2.png',
            height: 200,
          }}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.text, { fontSize: 24 }]}>Expo</Text>
          <Text style={[styles.text, { marginVertical: 5 }]}>
            Expo is an open-source platform for making universal native apps for
            Android, iOS, and the web with JavaScript and React.
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-preview.50e72501.jpg&w=3840&q=75',
            height: 200,
          }}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.text, { fontSize: 24 }]}>Supabase</Text>
          <Text style={[styles.text, { marginVertical: 5 }]}>
            Supabase is an open source Firebase alternative.
          </Text>
        </View>
      </View>
      <View style={[styles.card, { marginBottom: 20 }]}>
        <Image
          source={{
            uri: 'https://play-lh.googleusercontent.com/VgyD9nxsxISYNjNdGMq3ClUVLrKoMSWdwNHHqGSfFaiR4HMaPf6zOvqQfaD6eQ8P3x4',
            height: 200,
          }}
        />
        <View style={styles.cardContent}>
          <Text style={[styles.text, { fontSize: 24 }]}>TMDB</Text>
          <Text style={[styles.text, { marginVertical: 5 }]}>
            The Movie Database (TMDb) is a popular, user editable database for
            movies and TV shows.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
  },
  card: {
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: '#252525',
  },
  cardContent: {
    padding: 8,
  },
});
