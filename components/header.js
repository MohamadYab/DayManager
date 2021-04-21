import React, { useContext, useState } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Dimensions  } from 'react-native';

// Importing the info icon for the tutorial...
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateContext } from '../contexts/dateContext';

// Importing the DateTimePicker Package...
import DateTimePicker from '@react-native-community/datetimepicker';

const width = Dimensions.get('window').width;
// const {width, height} = Dimensions.get('window');

export default function Header() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]; // To Display the name of the month to avoid confisions between months and days...
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
        dateContext.setDay(selectedDate.getDate());
        dateContext.setMonth(selectedDate.getMonth());
    };

    const showPicker = () => {
        setShow(true);
    };

    return(
        <View style={styles.header}>
            <Text style={styles.logo} >DayManager</Text>
            <TouchableOpacity 
                style={styles.date}
                onPress={showPicker}>
                <Text style={styles.dateText}>
                    {`${dateContext.day}/${monthNames[dateContext.month]}`}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tutorial}>
                <AntDesign name="infocirlce" size={width * 0.064} color="#E5E5E5" />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                onChange={onChange}
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