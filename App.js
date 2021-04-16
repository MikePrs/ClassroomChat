import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

import * as firebase from 'firebase';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './screeens/HomeScreen';
import LoadingScreen from './screeens/LoadingScreen';
import SignInScreen from './screeens/SignInScreen';
import SignUpScreen from './screeens/SignUpScreen';
import StudentsHome from './screeens/StudentsHomeScreen';
import TeachersHome from './screeens/TeachersHomeScreen';


var firebaseConfig = {
  apiKey: "AIzaSyCxsbrJ1nxxcI9nwRoi4Di1KLyyMYzye3I",
  authDomain: "chatapp-71839.firebaseapp.com",
  databaseURL: "https://chatapp-71839.firebaseio.com",
  projectId: "chatapp-71839",
  storageBucket: "chatapp-71839.appspot.com",
  messagingSenderId: "987032505977",
  appId: "1:987032505977:web:f7f085e69b0975edce0ea8",
  measurementId: "G-FCWVCY0ZVQ"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


const MainNav = createStackNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },
    Home: { screen: HomeScreen },
    TeachersHome: { screen: TeachersHome },
    StudentsHome: { screen: StudentsHome }
  },
  {
    initialRouteName: "Loading"
  }
);
const App = createAppContainer(MainNav);
export default App;



