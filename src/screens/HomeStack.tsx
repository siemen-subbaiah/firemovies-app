import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Home from './Home';
import MovieDetail from './MovieDetail';
import ArtistDetail from './ArtistDetail';
import SearchScreen from './SearchScreen';

export type RootStackParamList = {
  HomeStack: undefined;
  'Movie Details': { movieId: number };
  Artist: { artistId: number };
  Search: undefined;
};

const HomeStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeStack'
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Movie Details' component={MovieDetail} />
      <Stack.Screen name='Artist' component={ArtistDetail} />
      <Stack.Screen name='Search' component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
