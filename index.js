/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import {Platform} from 'react-native';

// It is important that this PushNotification.configure is used in the Highest File (index.js) and is not used inside any component or any component LifeCycle...
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("onNOTIFICATION:", notification);
  },
  popInitialNotification: true,

  /**
   * From Documentation
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
   requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
  {
    channelId: "default-channel-id", // (required)
    channelName: `Default channel`, // (required)
    channelDescription: "A default channel",
    soundName: "default",
    importance: 4,
    vibrate: true,
  },
);

AppRegistry.registerComponent(appName, () => App);
