import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/loginScreen'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AddClassScreen from './screens/addClassScreen';
import TimetableScreen from './screens/timetableScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}
const TabNavigator = createBottomTabNavigator({
  Timetable:{screen:TimetableScreen},
  AddClass:{screen:AddClassScreen},
})
const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabNavigator:{screen:TabNavigator},
})
const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
