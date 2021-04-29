/**
 * This Component will be a clickable flat list item to store reminder information...
 * This would be displayed in a ScrollView in the Home View... 
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions, View } from 'react-native';
import { golbalStyles } from '../styles/global';

const {width, height} = Dimensions.get('window');

export default function ReminderItem ({onPress, taskTime, taskDate}) {
    const date = new Date();
    date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );

    const taskDateCheck = new Date(taskDate + "T" + taskTime + ":00Z");
    return (
        <TouchableOpacity 
            style={[styles.container, golbalStyles.shadow]}
            onPress={onPress}>
            <Text style={styles.text}>{taskTime}</Text>
            { (taskDateCheck < date) ? <Text style={styles.text}>Due</Text>:<View />}            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#5A5757',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        width: width * 0.9,
        borderRadius: 15,
        marginVertical: 15,
      },
    text: {
        color: '#ffffff',
        fontSize: width * 0.039,
        marginHorizontal: '5%'
    },
}) 