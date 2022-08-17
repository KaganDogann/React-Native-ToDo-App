import {View, Text, AsyncStorage} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

import ToDo from '../screens/ToDo';
import Doing from '../screens/Doing';
import Done from '../screens/Done';
import Home from '../screens/Home';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import FlashMessage from 'react-native-flash-message';


const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <DrawerPages></DrawerPages>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Routes;

function DrawerPages() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
      //console.log(user.uid)
     //console.log("USER SESSION TEST!",userSession)
    });
    
    
  }, [userSession]);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
        headerStyle: {
          backgroundColor: '#f0f8ff',
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{
          headerRight: () =>
            userSession ? (
              <Icon
                name="logout"
                size={30}
                color="tomato"
                onPress={() => auth().signOut()}
              />
            ) : null,
        }}
      />
      {userSession ? <Drawer.Screen name="Task" component={ToDoTabs} /> : null}
    </Drawer.Navigator>
  );
}

function HomePage() {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
      //AsyncStorage.setItem("userSession",true)
    });
    //console.log('user Session', userSession);
  }, [userSession]);

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="HomePage"
        component={Home}
        options={{headerShown: false}}
      />
      {!userSession ? (
        <>
          <SettingsStack.Screen
            name="LoginPage"
            component={Login}
            options={{
              headerStyle: {
                backgroundColor: '#64b5e0',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false,
            }}
          />

          <SettingsStack.Screen
            name="SignUpPage"
            component={SignUp}
            options={{headerShown: false}}
          />
        </>
      ) : null}
    </SettingsStack.Navigator>
  );
}

function ToDoTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          if (route.name === 'ToDo') {
            return <Icon name={'format-list-numbered'} size={26} color={color} />;
          } else if (route.name === 'Doing') {
            return <Icon name={'list-status'} size={26}  color={color}/>;
          } else if (route.name === 'Done') {
            return <Icon name={'playlist-check'} size={26}  color={color}/>;
          }
          // You can return any component that you like here!
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="ToDo">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen
              name="ToDoo"
              component={ToDo}
              options={{headerShown: false}}
            />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen name="Doing">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen
              name="Doingg"
              component={Doing}
              options={{headerShown: false}}
            />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen name="Done">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen
              name="Donee"
              component={Done}
              options={{headerShown: false}}
            />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
