/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useState, useEffect} from 'react';

export const DateContext = createContext();

export const DateProvider = (props) => {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    return(
        <DateContext.Provider 
            value={{
                day,
                setDay,
                month,
                setMonth,
                year,
                setYear
            }}
            >
            {props.children}
        </DateContext.Provider>
    )
}