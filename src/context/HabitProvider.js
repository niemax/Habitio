import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const HabitContext = createContext();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);

    const getHabits = async () => {
        const result = await AsyncStorage.getItem('@habit');
        if (result !== null) setHabits(JSON.parse(result));
    };

    const CRUDHabits = async (props) => {
        await AsyncStorage.setItem('@habit', JSON.stringify([...habits, props]));
        setHabits([...habits, props]);
    };

    const habitSetter = async (props) => {
        await AsyncStorage.setItem('@habit', JSON.stringify(props));
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
