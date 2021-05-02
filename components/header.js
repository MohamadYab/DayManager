import React, { useContext, useState } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importing the info icon for the tutorial...
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateContext } from '../contexts/dateContext';

// Importing the DateTimePicker Package...
import DateTimePicker from '@react-native-community/datetimepicker';

const width = Dimensions.get('window').width;
// const {width, height} = Dimensions.get('window');

export default function Header({ globaDate }) {
    const navigation = useNavigation();

    const dateContext = useContext(DateContext); // Getting the context of dateContext values...

    const [show, setShow] = useState(false); // Setting the date picker visability...
    const [date, setDate] = useState(new Date()); // Setting the date to the full current date for the date picker...

    /**
     * 
     * @param event 
     * @param selectedDate The Date that is selected from the picker...
     * This function handles the changing of the date from the datepicker
     */
    const onChange = (event, selectedDate) => {
        setShow(false);
        const currentDate = selectedDate || date; // Prevent Error when no date is changed or selected...
        setDate(currentDate);
        dateContext.setDate(currentDate);
        dateContext.setStringDate(currentDate);
    };

    const showPicker = () => { // Shwoing the date picker box...
        setShow(true);
    };

    return(
        <View style={styles.header}>
            <Text style={styles.logo} >DayManager</Text>
            <TouchableOpacity 
                style={styles.date}
                onPress={showPicker}>
                <Text style={styles.dateText}>
                    {globaDate}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.tutorial}
                onPress={() => navigation.navigate('Tutorial')}>
                <AntDesign name="infocirlce" size={width * 0.064} color="#E5E5E5" />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                onChange={onChange}
                minimumDate={new Date().getDate()}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: width,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        flex: 4,
        color: '#ffffff',
        fontSize: width * 0.052,
        fontWeight: 'bold',
    },
    date: {
        flex: 2,
        marginHorizontal: '5%',
    },
    dateText: {
        fontSize: width * 0.044,
        color: '#E5E5E5'
    },
    tutorial: {
        flex: 1,
    },
})