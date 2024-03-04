import React, { useEffect, useState } from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discover from './src/screens/Discover';
import Favourites from './src/screens/Favourites';
import Account from './src/screens/Account';
import About from './src/screens/About';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeStack from './src/screens/HomeStack';
import AuthState from './src/context/AuthState';

export type RootTabParamList = {
  HomeStack: undefined;
  Discover: undefined;
  Favourites: undefined;
  Account: undefined;
  About: undefined;
};

const App = () => {
  const [routeName, setRouteName] = useState<string | undefined>('');

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  const Tab = createBottomTabNavigator();

  const navigationRef = createNavigationContainerRef();

  return (
    <AuthState>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            setRouteName(navigationRef.getCurrentRoute()?.name);
          }}
          onStateChange={async () => {
            const currentRouteName = navigationRef?.getCurrentRoute()?.name;
            setRouteName(currentRouteName);
          }}
          theme={{
            dark: true,
            colors: {
              primary: '#F66902',
              background: '#121212',
              card: '#121212',
              text: '#fff',
              border: '#333',
              notification: '#F66902',
            },
          }}
        >
          <Tab.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#121212',
                borderBottomColor: '#333',
                borderBottomWidth: 1,
                elevation: 0,
              },
              headerTitleStyle: {
                color: '#fff',
              },
              headerShadowVisible: false,
              tabBarActiveTintColor: '#F66902',
              tabBarInactiveTintColor: '#fff',

              tabBarStyle: {
                backgroundColor: '#121212',
                borderTopColor: '#333',
              },
            }}
          >
            <Tab.Screen
              name='Home'
              component={HomeStack}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/logo.png')}
                    height={50}
                    width={10}
                  />
                ),
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name='home' size={24} color={color} />
                ),
                headerShown:
                  routeName === 'Movie Details' ||
                  routeName === 'Artist' ||
                  routeName === 'Search'
                    ? false
                    : true,
              }}
            />
            <Tab.Screen
              name='Discover'
              component={Discover}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name='search' size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name='Favourites'
              component={Favourites}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialIcons
                    name='favorite-outline'
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='Account'
              component={Account}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialIcons
                    name='account-circle'
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name='About'
              component={About}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialIcons name='info-outline' size={24} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar />
      </QueryClientProvider>
    </AuthState>
  );
};

export default App;
