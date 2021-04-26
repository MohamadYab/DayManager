import React, {useContext} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Recording from "./screens/recording";
import Home from "./screens/home";
import ReminderDetails from "./screens/reminderDetails";
import Header from "./components/header";
import { DateContext } from './contexts/dateContext';


export const Stack = createStackNavigator();
export function AppStackNav() {
  const dateContext = useContext(DateContext); // Getting the context of dateContext values...
  return (
        <Stack.Navigator
          screenOptions={
            {headerStyle: {
              backgroundColor: '#5A5757' },
              headerTitle: props => <Header {...props} globaDate={dateContext.strDate} />,
              headerLeft: null }}
            initialRouteName="Home"
            headerMode="screen">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Recording" component={Recording} />
            <Stack.Screen name="ReminderDetails" component={ReminderDetails} />
        </Stack.Navigator>
  );
}