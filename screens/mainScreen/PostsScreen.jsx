import React from 'react';
import { moduleName } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DefaultScreen from '../nestedScreens/DefaultsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';

const NestedScreen = createNativeStackNavigator();

const PostScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name='DefaultScreen' component={DefaultScreen} />
      <NestedScreen.Screen name='Comments' component={CommentsScreen} />
      <NestedScreen.Screen name='Map' component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostScreen;
