import 'react-native-gesture-handler';
// Note From Docs: If you are building for Android or iOS, do not skip this step, or your app may crash in production even if it works fine in development.
import React from 'react';
import { SafeAreaView, Platform, StatusBar, ImageBackground, View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {Routes, AppStackNav} from './routes';
import Home from './screens/home';
import Recording from './screens/recording';
import ReminderDetails from './screens/reminderDetails';
import { DateProvider } from './contexts/dateContext';
import { ResourcesProvider } from './contexts/resourcesContext';

export default function App() {
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor: '#333333',
      }}>
        {/* <ReminderDetails />      */}
        <DateProvider>
          <ResourcesProvider>
            <NavigationContainer>
                <AppStackNav />
            </NavigationContainer>
          </ResourcesProvider>
        </DateProvider>
    </SafeAreaView>
  );
}