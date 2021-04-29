/**
 * This screen is for the process of recording and doing the speech to text functionality...
 */
import React, {useState, useEffect, useRef, useContext} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground, Dimensions, Alert } from 'react-native';

// Importing Libraries and Packages...
import Voice from '@react-native-voice/voice'; // Importing the Voice Package...
import AntDesign from 'react-native-vector-icons/AntDesign'; // Importing Icons...
import PushNotification from "react-native-push-notification";


// Importing local files...
import { golbalStyles } from '../styles/global'; 
import RecordButton from '../components/recordButton';

// Import Contexts
import { ResourcesContext } from '../contexts/resourcesContext';
import { DateContext } from '../contexts/dateContext';
const {width, height} = Dimensions.get('window');

export default function Recording({ navigation }) {

    const dateContext = useContext(DateContext); 
    const resourcesContext = useContext(ResourcesContext); 

    /** ====== useRef to reference the tasks text input ====== */
    const hoursInput = useRef();
    const minutesInput = useRef();
    const taskInput = useRef();

    /** ====== useStates for the text inputs ====== */
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    var timer = false;
    const [task, setTask] = useState('');
    
    /** ====== useStates for the Voice library ====== */
    const [error, setError] = useState('');
    // const [results, setResults] = useState([]);


    /** ====== useEffect for the Voice library ====== */
    useEffect(() => {
        // Setting Callbacks that are invoked when a native event emitted for the process status...
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
    
        return () => {
          // Destroy the process after switching the screen...
          Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechError = (e) => {
    // Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e) => {
    // Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    !timer ? assignTimer(e.value) : setTask(e.value[0]);
    };

    const onSpeechPartialResults = (e) => {
    // Invoked when any results are computed
    timer ? setTask(e.value[0]) : "";
    };

    const startRecognizing = async () => {
        // Starts listening for speech for a specific locale
        try {
          await Voice.start('en-US');
        } catch (e) {
          console.error(e);
        }
    };

    const stopRecognizing = async () => {
        // Stops listening for speech
        try {
          await Voice.stop();
        } catch (e) {
          console.error(e);
        }
    };
    

    const assignTimer = (results) => {
        // TODO The best way is to let the user enter the time by saying the four numbers of the timer (one, two, three, four), instead of using various formats...
        
        for(const result of results) {
            if(result.length === 4) {
                console.log("from 4 "+result);
                setHours(result.slice(0, 2));
                setMinutes(result.slice(2, 4));
                timer = true;
                return;
            }
            console.log(result);
            if(result.includes(':')){
                const time = result.toString();
                const splitTime = time.split(':');
                console.log(splitTime);
                splitTime[0] < 10 ? setHours(`0${splitTime[0]}`) : setHours(splitTime[0]);
                setMinutes(splitTime[1]);            
                timer = true;
                return;
            }

            if(result.includes(' past ')){
                const time = result.toString();
                const splitTime = time.split(' past ');
                console.log(splitTime);
                splitTime[1] < 10 ? setHours(`0${splitTime[1]}`) : setHours(splitTime[1]);
                splitTime[0] < 10 ? setMinutes(`0${splitTime[0]}`) : setMinutes(splitTime[0]);            
                timer = true;
                return;
            }

            if(result.includes(' to ')){
                const time = result.toString();
                const splitTime = time.split(' to ');
                console.log(splitTime);
                splitTime[1] < 10 ? setHours(`0${splitTime[1]}`) : setHours(splitTime[1]);
                splitTime[0] < 10 ? setMinutes(`0${splitTime[0]}`) : setMinutes(splitTime[0]);           
                timer = true;
                return;
            }
        }

        if(!timer){
            Alert.alert(
                "OOPS!",
                "Sorry, I couldn't recognise your input, please try again!",
                [
                    {text: "OK"}
                ],
                {
                  cancelable: true,
                }
            );
        }
    }

    const handleScheduledNotification = () => {
        const date = new Date(dateContext.fullDate + 'T' + hours + ':' + minutes + ':00Z');
        date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
        PushNotification.localNotificationSchedule({
            channelId: "default-channel-id",
            title: "New task is due!",
            message: "Click for more information...",
            date: date,
        });
    }

    const submitHandler = () => {
        if(task === null || hours === null || minutes === null ) {
            Alert.alert(
                "OOPS!",
                "Sorry, one or more inputs are empty!",
                [
                    {text: "OK"}
                ],
                {
                  cancelable: true,
                }
            );
            return;
        }

        if(isNaN(hours) || isNaN(minutes)){
            Alert.alert(
                "OOPS!",
                `Hours and Minutes must contain numbers only!
Delete any character that is not a number, or cancel the task and re-open it again!`,
                [
                    {text: "OK"}
                ],
                {
                  cancelable: true,
                }
            );
            return;
        }

        const taskTime = `${hours}:${minutes}`;
        resourcesContext.insertRecord(taskTime, task);
        handleScheduledNotification();
        navigation.pop();
    }

    return (
        <TouchableWithoutFeedback
        onPress={() => {Keyboard.dismiss();}}>
            <View style={golbalStyles.container}>
                <ImageBackground source={require('../assets/BG_Gray.png')} style={styles.bgImage} imageStyle={{opacity: 0.28}}>
                    <View style={styles.container} >
                        <View style={styles.timeVContainer} >
                            <Text style={styles.questionsText} >
                                1) Reminder Time?
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
                                    2) Reminder Task?
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
                                onPress={submitHandler}>
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