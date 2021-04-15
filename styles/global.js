/**
 * Creating a global style that can be used and applied for the entire application.
 * This would reduce code douplicates...
 */
import {StyleSheet, Platform, StatusBar} from 'react-native';


export const golbalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333',
      },
    titleText: {
        color: '#ffffff',
    },
    shadow: {
        // The below property works for iOS only and will be ignored by Android...
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowColor: '#262626',
        shadowOpacity: 1,
        shadowRadius: 7,
        // The below property works for Android only and will be ignored by iOS...
        elevation: 5, 
    }
})