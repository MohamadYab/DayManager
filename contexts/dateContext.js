/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useState, useEffect} from 'react';

export const DateContext = createContext();

export const DateProvider = (props) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1) < 10 ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const formattingSelectedDate = `${year}-${month}-${day}`;
    const [fullDate, setFullDate] = useState(formattingSelectedDate);
    const [strDate, setStrDate] = useState(`${d.getDate()}/${monthNames[d.getMonth()]}`);
    

    const setDate = (selectedDate) => {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1) < 10 ? `0${(selectedDate.getMonth() + 1)}` : (selectedDate.getMonth() + 1);
        const day = selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate();
        const formattingSelectedDate = `${year}-${month}-${day}`;
        setFullDate(formattingSelectedDate);
    }

    const setStringDate = (selectedDate) => {
        setStrDate(`${selectedDate.getDate()}/${monthNames[selectedDate.getMonth()]}`);
    }

    return(
        <DateContext.Provider 
            value={{
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