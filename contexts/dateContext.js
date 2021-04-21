/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useState, useEffect} from 'react';

export const DateContext = createContext();

export const DateProvider = (props) => {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState(currentMonth);

    return(
        <DateContext.Provider 
            value={{
                day,
                setDay,
                month,
                setMonth
            }}
        >
            {props.children}
        </DateContext.Provider>
    )
}