/**
 * This screen is the home screen
 */
import React from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import {golbalStyles} from '../styles/global';
import ReminderItem from '../components/reminderItem';

const width = Dimensions.get('window').width;
// const {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
    const x = 1;
    return(
        <View style={golbalStyles.container}>
        <ImageBackground source={require('../assets/BG_Gray.png')} style={{flex:1}} imageStyle={{opacity: 0.28}}>
            <View style={styles.container}>
                {/**
                 * I need to add a flatlist that holds reminderItem Component...
                 * The items of this flatlist can be scrolled (flatlist comes with the ability to scroll through elements by default)...
                 * The data of this flat list will change based on the date and the items in the date...
                 * Instead of creating all the list, whenever the user adds a reminder, It will be added with a date, When selecting a date -
                 * - I would use the array.map function to map all matching dates and display them. If there is no matching date, I would display the no reminder text...
                 * I need to have a date property, and use the time as a key to the flatlist. When this time passes, the reminder would push a notification to the user...
                 * I must have a time limit where all the reminders past this time must be deleted to not waste space and memory...
                 * I need to research permissions...
                 * I need to research GDPR Policies and etc about permissions...
                 * I must keep this comment to benefit from it when developing the application...
                 */}
                {/** Here I all the list of the reminderItem Components... */}
                {x === 0 ? 
                <View style={styles.hintTextContainer}>
                    <Text style={styles.hintTextL1}>Use your voice to manage your day!</Text>
                    <Text style={styles.hintTextL2}>Add new tasks and get more organised!</Text>
                </View>
                : <ReminderItem />}
                {/* <FlatList 
                    renderItem={({item}) => {
                        <ReminderItem />
                    }}
                    /> */}
            <View style={styles.addRecordingBtnContainer}>
                <TouchableOpacity style={[styles.addRecordingBtn, golbalStyles.shadow]}
                    onPress={() => navigation.push('Recording')}>
                    <Text style={styles.addRecordingBtnTxt}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
    </View>
    )
}

// The Styling for this component...
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        marginHorizontal:'5%',
    },
    hintTextContainer: {
        marginTop: '10%',
    },
    hintTextL1: {
        color: '#ffffff',
        fontSize: width * 0.048,
    },
    hintTextL2: {
        color: '#E5E5E5',
        fontSize: width * 0.039,
        marginTop: 5,
    },
    addRecordingBtnContainer: {
        width: '100%',
        position: 'absolute',
        bottom: '5%',
    },
    addRecordingBtn: {
        backgroundColor: '#5A5757',
        alignItems: 'center',
        justifyContent: 'center',
        height: width * 0.10,
        width: '100%',
        borderRadius: 25,
    },
    addRecordingBtnTxt: {
        color: '#ffffff',
        fontSize: width * 0.048,
    },
})