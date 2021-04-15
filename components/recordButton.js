/**
 * This Component will be a clickable button to start recording to create a new task...
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions  } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { golbalStyles } from '../styles/global';

const width = Dimensions.get('window').width;

export default function RecordButton ({onPressIn, onPressOut}) {
    return(
        <TouchableOpacity 
            style={[styles.container, golbalStyles.shadow]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}>
            <FontAwesome name="microphone" size={width * 0.10} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5A5757',
        alignItems: 'center',
        justifyContent: 'center',
        height: width * 0.175,
        width: width * 0.175,
        borderRadius: 100,
      }
}) 