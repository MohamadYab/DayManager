/**
 * This screen is the home screen
 */
import React, {useContext} from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import {golbalStyles} from '../styles/global';
import ReminderItem from '../components/reminderItem';
import { ResourcesContext } from '../contexts/resourcesContext';
import { DateContext } from '../contexts/dateContext';

const width = Dimensions.get('window').width; // Get the widh of the mobile device...

export default function Home({navigation}) {
    // Contexts variables...
    const resourcesContext = useContext(ResourcesContext);
    const dateContext = useContext(DateContext);
    return(
        <View style={golbalStyles.container}>
        <ImageBackground source={require('../assets/BG_Gray.png')} style={{flex:1}} imageStyle={{opacity: 0.28}}>
            <View style={styles.container}>
                <View style={{flex:8}}>
                    {/** Checking whether there is any tasks registered for the selected date or not and display them dynamically using a Flatlist component... */}
                    {resourcesContext.tasks <= 0 ? 
                        <View style={styles.hintTextContainer}>
                            <Text style={styles.hintTextL1}>Use your voice to manage your day!</Text>
                            <Text style={styles.hintTextL2}>Add new tasks and get more organised!</Text>
                        </View>
                        : <FlatList
                            style={styles.hintTextContainer}
                            keyExtractor={(item) => item.id}
                            data={resourcesContext.tasks} 
                            renderItem={({item}) => 
                            {
                                // Using the Reminder Item component to link the home screen with the reminder details screen...
                                return (
                                    <ReminderItem taskTime={item.taskTime} taskDate={item.taskDate} onPress={()=> navigation.navigate('ReminderDetails', {item})} />
                                )
                            }}
                        />
                    }
                </View>
                {/** Below code is to check if the date is older than today or not. If not, it will allow to add new tasks, if it is older, the add button will not be rendered... */}
                {
                    (new Date() < new Date(dateContext.fullDate+ "T23:59:59Z")) ?  
                        <View style={styles.addRecordingBtnContainer}>
                            <TouchableOpacity style={[styles.addRecordingBtn, golbalStyles.shadow]}
                                onPress={() => navigation.push('Recording')}>
                                <Text style={styles.addRecordingBtnTxt}>Add</Text>
                            </TouchableOpacity>
                        </View> 
                : <View />
                }
                
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
        flex: 2,
        width: '100%',
        justifyContent:'center',
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