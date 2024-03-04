import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Trending from '../components/Trending';
import TopGrosser from '../components/TopGrosser';
import Genre from '../components/Genre';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Trending />
      <TopGrosser />
      <Genre title='Action' queryKey='action' genreId={28} />
      <Genre title='Comeday' queryKey='comedy' genreId={35} />
      <Genre title='Horror' queryKey='horror' genreId={27} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
});
