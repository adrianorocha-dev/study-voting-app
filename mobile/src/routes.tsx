import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Detail from './pages/Detail';
import CreatePoll from './pages/CreatePoll';
import Search from './pages/Search';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#f5f5f5' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15, padding: 10 }}
                onPress={() => navigation.navigate('Search')}
              >
                <Ionicons name="ios-search" size={24} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15, padding: 10 }}
                onPress={() => navigation.navigate('CreatePoll')}
              >
                <Ionicons name="ios-add" size={24} />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen name="Detail" component={Detail} />

        <Stack.Screen
          name="CreatePoll"
          component={CreatePoll}
          options={{ title: 'Create Poll' }}
        />

        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
