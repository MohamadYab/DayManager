/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useState, useEffect} from 'react';

export const DateContext = createContext();

export const DateProvider = (props) => {
    const [fullDate, setFullDate] = useState();

    useEffect(() => {
        setDate(new Date())
    }, []);

    const setDate = (selectedDate) => {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1) < 10 ? `0${(selectedDate.getMonth() + 1)}` : (selectedDate.getMonth() + 1);
        const day = selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate();
        const formattingSelectedDate = `${year}-${month}-${day}`;
        setFullDate(formattingSelectedDate);
    }

    return(
        <DateContext.Provider 
            value={{
                fullDate,
                setFullDate,
                setDate
            }}
            >
            {props.children}
        </DateContext.Provider>
    )
}