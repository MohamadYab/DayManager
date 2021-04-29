/**
 * Tutorial Page...
 */
import React from 'react';
import {ScrollView, View, StyleSheet, ImageBackground, Image, Text, Dimensions } from 'react-native';
import { golbalStyles } from '../styles/global';

const {width, height} = Dimensions.get('window'); // Get the widh of the mobile device...

export default Tutorial = () => {
    return(
        <View style={golbalStyles.container}>
            <ImageBackground source={require('../assets/BG_Gray.png')} style={styles.bgImage} imageStyle={{opacity: 0.15}}>
                <ScrollView style={styles.container} >
                    <View style={styles.section} >
                        <Text style={styles.heading} >
                            Header:
                        </Text>
                        {/* <Image source={require('../assets/Header.jpg')} style={[styles.images, {height:60}]} /> */}
                        <Text style={styles.text} >
                            By clicking on the date in the header section above, a date picker will open and you could pick the date you wish to set for the reminder.
                        </Text>
                        <Text style={styles.text} >
                        <Text style={{fontWeight: 'bold', color: '#CA4D4C', fontSize: width*0.035}} >NOTE:</Text> You can not set tasks for older dates, but you could still view incompleted tasks from older dates.                        </Text>
                        <Image source={require('../assets/Date_Picker.jpg')} style={[styles.images, {height:height*0.46}]} />
                        <Text style={styles.text} >
                            The ( i ) icon will open the tutorial page (current page).
                        </Text>
                        <Image source={require('../assets/Line.png')} style={styles.line} />
                    </View>


                    <View style={styles.section} >
                        <Text style={styles.heading} >
                            Home Screen:
                        </Text>
                        <Text style={styles.text} >
                            If you have no tasks for the sat date, you will get a hint message that tells you how to add new tasks.
                        </Text>
                        <Image source={require('../assets/Hint_Text.jpg')} style={[styles.images, {height:height*0.16}]} />

                        <Text style={styles.text} >
                            If there are tasks, those tasks will appear as a list, and the due tasks will have a "Due" word next to them.
                        </Text>
                        <Image source={require('../assets/Tasks_List.png')} style={[styles.images, {height:height*0.18}]} />

                        <Text style={styles.text} >
                            To Add new tasks, click on the add button!
                        </Text>
                        <Image source={require('../assets/Add_Button.png')} style={[styles.images, {height:height*0.06}]} />

                        <Image source={require('../assets/Line.png')} style={styles.line} />
                    </View>


                    <View style={styles.section} >
                        <Text style={styles.heading} >
                            Recording Screen:
                        </Text>
                        <Text style={styles.text} >
                            In the recording screen, there are multiple inputs that can be controled by voice or by manually entering data:
                        </Text>
                        <Text style={styles.text} >
                            Timer Input: The time you wish to set the reminder at.{"\n"}Format is (Hours : Minutes)
                            Timer input voice format.
                        </Text>
                        <Image source={require('../assets/Timer_Input.png')} style={[styles.images, {height:height*0.18}]} />

                        <Text style={styles.text} >
                            Task Input: The task you wish to set.{"\n"}
                            In spite of the recording functionality accepting English only, you can set tasks manually in many languages.{"\n"}
                            Sometimes, you might need to edit the results of the input from the recordings.
                        </Text>
                        <Image source={require('../assets/Task_Input.png')} style={[styles.images, {height:height*0.38}]} />

                        <Text style={styles.text} >
                            Buttons:
                        </Text>
                        <Image source={require('../assets/Recording_Buttons.png')} style={[styles.images, {height:height*0.18}]} />
                        <Text style={styles.text} >
                            <Text style={{fontWeight: 'bold', color: '#CA4D4C', fontSize: width*0.035}} >Dismiss:</Text> Clicking on this button will cancel the task{"\n"}
                            <Text style={{fontWeight: 'bold', color: '#E5E5E5', fontSize: width*0.035}} >Record:</Text> Clicking on this button will start the recording{"\n"}
                            <Text style={{fontWeight: 'bold', color: '#0FAB69', fontSize: width*0.035}} >Accept:</Text> Clicking on this button will set the new task
                        </Text>
                        <Image source={require('../assets/Line.png')} style={styles.line} />
                    </View>


                    <View style={styles.section} >
                        <Text style={styles.heading} >
                            Task Details Screen:
                        </Text>
                        <Text style={styles.text} >
                            The Reminder Details including the time and the task.
                        </Text>
                        <Image source={require('../assets/Task_Details.png')} style={[styles.images, {height:height*0.20}]} />

                        <Text style={styles.text} >
                            Completed Button: Clicking on the completed button will remove the reminder from the tasks list.
                        </Text>
                        <Image source={require('../assets/Task_Complete.png')} style={[styles.images, {height:height*0.07}]} />

                    </View>

                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal:'5%',
        marginTop: '5%',
    },
    bgImage :{
        flex: 1,
    },
    section : {
        marginBottom: '5%',
    },
    heading: {
        color: '#ffffff',
        fontSize: width * 0.039,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    text: {
        color: '#ffffff',
        lineHeight: 21,
        marginBottom:4,
    },
    images: {
        width: '90%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: '5%',
    },
    imageBorder:{
        borderColor: '#999999',
        borderWidth: 1,
    },
    line: {
        width: '100%',
        resizeMode: 'stretch',
        alignSelf: 'center',
        borderRadius: 25,
        height: 4,
        marginTop: '5%',
        opacity: 0.60,
    },
})