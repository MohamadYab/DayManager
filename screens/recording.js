/**
 * This screen is for the process of recording and doing the speech to text functionality...
 */
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, Dimensions } from 'react-native';

// Importing Libraries and Packages...
import Voice from '@react-native-voice/voice'; // Importing the Voice Package...
import AntDesign from 'react-native-vector-icons/AntDesign'; // Importing Icons...

// Importing local files...
import { golbalStyles } from '../styles/global'; 
import RecordButton from '../components/recordButton';

const {width, height} = Dimensions.get('window');

export default function Recording({ navigation }) {

    {/** useRef to reference the tasks text input */}
    const taskInput = useRef();

    {/** useStates for the text inputs */}
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [task, setTask] = useState('');
    
    {/** useStates for the Voice library */}
    const [error, setError] = useState('');

    {/** useEffect for the Voice library */}
    useEffect(() => {
        // Setting Callbacks that are invoked when a native event emitted for the process status...
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
    
        return () => {
          // Destroy the process after switching the screen...
          Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    {/** Methods that are linked with the useEffect */}
    const onSpeechStart = (e) => {
        // Invoked when .start() is called without errors
        console.log('onSpeechStart: ', e);
    };
    
    const onSpeechEnd = (e) => {
    // Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    };

    const onSpeechError = (e) => {
    // Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e) => {
    // Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setTask(e.value[0]);
    };

    const onSpeechPartialResults = (e) => {
    // Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setTask(e.value[0]);
    };

    const startRecognizing = async () => {
        // Starts listening for speech for a specific locale
        try {
          await Voice.start('en-US');
        } catch (e) {
          // eslint-disable-next-line
          console.error(e);
        }
    };

    const stopRecognizing = async () => {
        // Stops listening for speech
        try {
          await Voice.stop();
        } catch (e) {
          // eslint-disable-next-line
          console.error(e);
        }
    };
    

    const destroyRecognizer = async () => {
        // Destroys the current SpeechRecognizer instance
        try {
          await Voice.destroy();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };


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
                                onPressIn={startRecognizing}
                                onPressOut={stopRecognizing} />

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