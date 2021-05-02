import 'react-native-gesture-handler';
/**
 * Note From react-native-gesture-handler Docs 
 * If you are building for Android or iOS, do not skip this step, or your app may crash in production even if it works fine in development.
 * (import 'react-native-gesture-handler'; must be at the top of the file, nothing should be before it)...
 * */

import React from 'react';
import { SafeAreaView } from 'react-native'; // SafeAreaView is good to prevent the notches and other elements that interfere the screen's size...

// Importing the Navigation container to allow navigation through the application...
import { NavigationContainer } from "@react-navigation/native";
import { AppStackNav } from './routes';

// Importing and using the contexts to provide the contexts values to the whole application... 
import { DateProvider } from './contexts/dateContext';
import { ResourcesProvider } from './contexts/resourcesContext';

export default function App() {
  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor: '#333333',
      }}>
        {/* The order of these components is based on which one relies on the other...
          * Date must be accessible to the whole application, so it comes first */}
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