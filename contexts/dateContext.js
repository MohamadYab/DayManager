/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useState, useEffect} from 'react';

export const DateContext = createContext();

export const DateProvider = (props) => {
/*     const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [number, setTestNum] = useState(5);

    const formattingCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`; */
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
/*                 day,
                setDay,
                month,
                setMonth,
                year,
                setYear */
                fullDate,
                setFullDate,
                setDate
            }}
            >
            {props.children}
        </DateContext.Provider>
    )
}