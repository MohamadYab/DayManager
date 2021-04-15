/**
 * This screen is for the process of recording and doing the speech to text functionality...
 */
import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, Dimensions } from 'react-native';
// import {ResposiveFontSize} from 'react-native-responsive-dimentsions';
import { golbalStyles } from '../styles/global';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RecordButton from '../components/recordButton';

const {width, height} = Dimensions.get('window');

export default function Recording({ navigation }) {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [task, setTask] = useState('');
    
    const taskInput = useRef();

    return (
        <TouchableWithoutFeedback
        onPress={() => {Keyboard.dismiss();}}>
            <View style={golbalStyles.container}>
                <ImageBackground source={require('../assets/BG_Gray.png')} style={styles.bgImage} imageStyle={{opacity: 0.28}}>
                    <View style={styles.container} >
                        <View style={styles.timeVContainer} >
                            <Text style={styles.questionsText} >
                                When do you want me to remind you?
                            </Text>
                            <View style={styles.timerInputContainer}>
                                <TextInput 
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    style={{...styles.txtInputFldTimer, ...styles.txtInputField}}
                                    onChangeText={hours => setHours(hours)}
                                    defaultValue={hours}
                                    placeholder='00'
                                    placeholderTextColor='#E5E5E5'
                                    // Making the Under line Transparent...
                                    underlineColorAndroid="transparent"
                                    />
                                <Text style={styles.questionsText}>:</Text>
                                <TextInput 
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    style={{...styles.txtInputFldTimer, ...styles.txtInputField}}
                                    onChangeText={minutes => setMinutes(minutes)}
                                    defaultValue={minutes}
                                    placeholder='00'
                                    placeholderTextColor='#E5E5E5'
                                    // Making the Under line Transparent...
                                    underlineColorAndroid="transparent"
                                    />
                            </View>
                        </View>

                        <View style={styles.taskVContainer} >
                            <View>
                                <Text style={styles.questionsText} >
                                    What task do you want to record?
                                </Text>
                                    <TouchableWithoutFeedback
                                        onPress={()=> { taskInput.current.focus()} }
                                        >
                                        <View style={{...styles.txtInputField, ...styles.txtInputFldTaskContainer}}>
                                            <TextInput
                                                multiline
                                                onChangeText={task => setTask(task)}
                                                defaultValue={task}
                                                // Making the Under line Transparent...
                                                underlineColorAndroid="transparent"
                                                ref={taskInput}
                                                style={styles.txtInputFldTask}
                                                />
                                        </View>
                                    </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>

                    <View style={styles.btnsContainer}>
                        <Text style={styles.recordHintTxt}>Press and hold the microphone button to start recording!</Text>
                        <View style={styles.btnsOptions} >
                            <TouchableOpacity
                                style={golbalStyles.shadow}
                                onPress={() => navigation.pop()}>
                                <AntDesign name="closecircle" size={width * 0.17} color="#CA4D4C" />
                            </TouchableOpacity>

                            <RecordButton 
                                onPressIn={() => console.log("Pressed In")}
                                onPressOut={() => console.log("Pressed out")} />

                            <TouchableOpacity
                                style={golbalStyles.shadow}
                                onPress={() => navigation.pop()}>
                                <AntDesign name="checkcircle" size={width * 0.17} color="#0FAB69" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    bgImage :{
        flex: 1,
    },
    container: {
        flex: 1,
        marginHorizontal: '5%'
    },
    questionsText: {
        color: '#ffffff',
        fontSize: width * 0.048,
        marginVertical: '5%',
    },
    timeVContainer: {
        marginTop: '5%',
    },
    timerInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: '5%',
    },
    txtInputField: {
        backgroundColor: '#5A5757',
        opacity: 0.9,
        borderColor: '#757575',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: width * 0.053,
        color: '#ffffff',
    },
    txtInputFldTimer: {
        height: width * 0.12,
        width: width * 0.192,
        fontSize: height * 0.032,
    },
    taskVContainer: {

    },
    recordHintTxt: {
        color: '#E5E5E5',
        fontSize: width * 0.03,
        marginVertical: '5%',
        marginHorizontal: '5%'
    },

    txtInputFldTaskContainer: {
        height: '65%',
        width: '100%',
    },
    txtInputFldTask: {
        paddingVertical: width * 0.028,
        color: '#ffffff',
    },
    btnsContainer: {
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: '5%',
    },
    btnsOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '5%',
        justifyContent: 'space-between',
    },
})