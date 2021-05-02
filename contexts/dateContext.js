/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useState, useEffect} from 'react';

export const DateContext = createContext();

export const DateProvider = (props) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]; // This is to set the displayed date in short names instead of numbers to avoid conflicts between days and months...

    // The code below is to initialise the date when starting the application...
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1) < 10 ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const formattingSelectedDate = `${year}-${month}-${day}`;
    const [fullDate, setFullDate] = useState(formattingSelectedDate);
    const [strDate, setStrDate] = useState(`${d.getDate()}/${monthNames[d.getMonth()]}`);
    

    const setDate = (selectedDate) => {
        // Setting the date when selecting a new date from the date picker...
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1) < 10 ? `0${(selectedDate.getMonth() + 1)}` : (selectedDate.getMonth() + 1);
        const day = selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate();
        const formattingSelectedDate = `${year}-${month}-${day}`;
        setFullDate(formattingSelectedDate);
    }

    const setStringDate = (selectedDate) => {
        // Setting a string date to be displayed in the header section...
        setStrDate(`${selectedDate.getDate()}/${monthNames[selectedDate.getMonth()]}`);
    }

    return(
        <DateContext.Provider 
            value={{ // Importing variables, states, and functions...
                fullDate,
                setFullDate,
                setDate,
                strDate,
                setStringDate,
            }}
            >
            {props.children}
        </DateContext.Provider>
    )
}