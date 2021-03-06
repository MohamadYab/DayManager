/**
 * Date context to set and change the date of the task for the application...
 */
import React, {createContext, useContext, useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import { DateContext } from './dateContext';

export const ResourcesContext = createContext();

let db = SQLite.openDatabase({name: 'DayManager.db', createFromLocation : "~DayManager.db"}); // This variable will be used to connect to the database as mentioned in the documentation of the react-native-sqlite-storage repository example folder (Android)... 

export const ResourcesProvider = (props) => {
    const dateContext = useContext(DateContext); 

    const [tasks, setTasks] = useState([]);    
    const [insertedRecordID, setInsertedRecordID] = useState();    

    useEffect(() => { // Selecting the date to be displayed. The app will re-render whenever the date changes, and the data will change to match the selected date...
        selectQuery();
    }, [dateContext.fullDate]);

    const selectQuery = () => { // Select query to select data from the database based on the selected date in the header...
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM DayManager WHERE taskDate=? ORDER BY taskTime', [dateContext.fullDate], (tx, result) => {
                var rows = result.rows;
                const tempArr = [];
                for (let i = 0; i < rows.length; i++) {
                    var item = rows.item(i);
                    tempArr.push(item);
                }
                setTasks(tempArr);
            });
        }); 
    }

    const insertRecord = (taskTime, task) => { // Inserting new records in the database...
        const query = 'INSERT INTO DayManager (taskDate, taskTime, task) VALUES (?,?,?)';
        let params = [dateContext.fullDate, taskTime, task];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                setTasks(prevTasks => [...prevTasks, {"id": results.insertId, taskDate: dateContext.fullDate, taskTime, task}]);
                setInsertedRecordID(results.insertId);
                selectQuery();
            });
        });
    }

    const deleteRecord = (id) => { // Deleting a record from the database...
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM DayManager WHERE id = ?', [id], (tx, results) => {
                selectQuery();
            });
        });
    }



    return(
        <ResourcesContext.Provider 
            value={{ // Importing variables, states, and functions...
            tasks,
            insertRecord,
            insertedRecordID,
            deleteRecord
            }}
            >
            {props.children}
        </ResourcesContext.Provider>
    )
}