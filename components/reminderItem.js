/**
 * This Component will be a clickable flat list item to store reminder information...
 * This would be displayed in a ScrollView in the Home View... 
 */
 import React from 'react';
 import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { golbalStyles } from '../styles/global';

 const {width, height} = Dimensions.get('window');

export default function ReminderItem ({onPress}) {
    return (
        <TouchableOpacity 
            style={[styles.container, golbalStyles.shadow]}
            onPress={onPress}>
            <Text style={styles.text}>Task Title</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5A5757',
        justifyContent: 'center',
        height: 60,
        width: width,
        borderRadius: 15,
      },
    text: {
        color: '#ffffff',
        fontSize: width * 0.039,
        marginHorizontal: '5%'
    },
}) 