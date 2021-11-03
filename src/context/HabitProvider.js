import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const HabitContext = createContext();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);

    const getHabits = async () => {
        const result = await AsyncStorage.getItem('@habit');
        if (result !== null) setHabits(JSON.parse(result));
        console.log(habits);
    };

    const CRUDHabits = async (props) => {
        try {
            await AsyncStorage.setItem('@habit', JSON.stringify([...habits, props]));
            setHabits([...habits, props]);
            console.log(habits);
        } catch (error) {
            console.error(error);
        }
    };

    const habitSetter = async (props) => {
        try {
            await AsyncStorage.setItem('@habit', JSON.stringify(props));
            setHabits(props);
            console.log(habits);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getHabits();
    }, []);

    return (
        <HabitContext.Provider value={{ habits, habitSetter, getHabits, CRUDHabits }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => useContext(HabitContext);

export default HabitProvider;
