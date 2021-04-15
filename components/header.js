import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Dimensions  } from 'react-native';
// Importing the info icon for the tutorial...
import AntDesign from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('window').width;
// const {width, height} = Dimensions.get('window');

export default function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.logo} >DayManager</Text>
            <TouchableOpacity style={styles.date}>
                <Text style={styles.dateText}>
                    18/Mar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tutorial}>
                <AntDesign name="infocirlce" size={width * 0.064} color="#E5E5E5" />
            </TouchableOpacity>
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