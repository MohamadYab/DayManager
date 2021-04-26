/**
 * This screen is the home screen
 */
import React, {useContext} from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import {golbalStyles} from '../styles/global';
import ReminderItem from '../components/reminderItem';
import { ResourcesContext } from '../contexts/resourcesContext';

const width = Dimensions.get('window').width; // Get the widh of the mobile device...
// const {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
    const resourcesContext = useContext(ResourcesContext); 
    return(
        <View style={golbalStyles.container}>
        <ImageBackground source={require('../assets/BG_Gray.png')} style={{flex:1}} imageStyle={{opacity: 0.28}}>
            <View style={styles.container}>
                <View style={{flex:8}}>
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
                                return (
                                    <ReminderItem title={item.taskTime} onPress={()=> navigation.navigate('ReminderDetails', {item})} />
                                )
                            }}
                        />
                    }
                </View>
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