import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/auth/loginScreen';
import RegisterScreen from './screens/auth/registerScreen';
import PostsScreen from './screens/mainScreen/PostsScreen';
import CreateScreen from './screens/mainScreen/CreateScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AuthStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <TabStack.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0195ae',
        tabBarShowLabel: false,
      }}>
      <TabStack.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='newspaper' size={size} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name='Create'
        component={CreateScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name='pluscircle' size={size + 18} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name='account-settings'
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default useRoute;
