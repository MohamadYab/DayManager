import React from 'react';
import { SafeAreaView, Platform, StatusBar, ImageBackground, View, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={{
      flex:1, 
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }}>
        {/* <ReminderDetails /> */}
        {/* <NavigationContainer>
          <StackTest />
        </NavigationContainer> */}
        <View
          style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Hello from React Native CLI!!!</Text>        
          <Text>Test Wi-Fi Debugging</Text>        
          <Text>It is working but not auto-saving</Text>        
        </View>
    </SafeAreaView>
  );
}