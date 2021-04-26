/**
 * This screen will display the information of a clicked reminder...
 * Here, the user woulc be able to complete the tasks... 
 */
 import React, {useContext} from 'react';
 import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
 import {golbalStyles} from '../styles/global';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import {ResourcesContext} from '../contexts/resourcesContext';

 const width = Dimensions.get('window').width;
 // const {width, height} = Dimensions.get('window');


export default function ReminderDetails({route, navigation }) {
    const {item} = route.params;
    const resourcesContext = useContext(ResourcesContext);

    const deleteHandler = () => {
        resourcesContext.deleteRecord(item.id);
        navigation.pop();
    }
    return(
        <View style={golbalStyles.container}>
            <ImageBackground source={require('../assets/BG_Gray.png')} style={styles.bgImage} imageStyle={{opacity: 0.28}}>
                <View style={styles.container} >
                    <Text style={styles.txtTime} >{item.taskTime}</Text>
                    <Text style={styles.txtTask} >{item.task}</Text>
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity 
                            style={[styles.completedBtn, golbalStyles.shadow]}
                            onPress={deleteHandler}
                            >
                            <Text style={styles.btnTxt} >Completed</Text>
                            <Ionicons name="checkmark-done-sharp" size={width * 0.064} color="green" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal:'5%',
    },
    bgImage :{
        flex: 1,
    },
    txtTime: {
        color: '#ffffff',
        fontSize:width * 0.085,
        marginVertical: '10%'
    },
    txtTask: {
        color: '#ffffff',
        fontSize:width * 0.062,
        marginVertical: '10%'
    },
    btnsContainer: {
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: '5%',

    },
    completedBtn: {
        height: width * 0.10,
        width: '100%',
        backgroundColor: '#5A5757',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    btnTxt: {
        color: '#ffffff',
        fontSize: width * 0.048,
        marginRight: width * 0.04,
    },
})