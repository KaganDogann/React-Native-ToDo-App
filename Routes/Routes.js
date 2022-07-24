import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ToDo from '../screens/ToDo';
import Doing from '../screens/Doing';
import Done from '../screens/Done';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <DrawerPages></DrawerPages>
    </NavigationContainer>
  );
};

export default Routes;

function DrawerPages() {
  return (
    <Drawer.Navigator initialRouteName="Home"
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 240,
      },
      headerStyle: {
        backgroundColor: '#f0f8ff',
      }
    }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Task" component={ToDoTabs} />
 
    </Drawer.Navigator>
  );
}

function ToDoTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: () => {
          if (route.name === 'ToDo') {
            return <Icon name={'format-list-numbered'} size={26} />;
          } else if (route.name === 'Doing') {
            return <Icon name={'list-status'} size={26} />;
          } else if (route.name === 'Done') {
            return <Icon name={'playlist-check'} size={26} />;
          }
          // You can return any component that you like here!
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="ToDo">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="ToDoo" component={ToDo}  options={{ headerShown: false }} />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen name="Doing">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="Doingg" component={Doing}  options={{ headerShown: false }} />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen name="Done">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="Donee" component={Done}  options={{ headerShown: false }} />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
