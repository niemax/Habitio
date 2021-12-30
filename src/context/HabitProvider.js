import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentDay } from '../utils/helpers/dateHelpers';

const HabitContext = createContext();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);

    const currentDay = getCurrentDay();

    const getHabits = async () => {
        try {
            const result = await AsyncStorage.getItem('@habit');
            if (result !== null) {
                const parsedResult = JSON.parse(result);
                const mappedHabits = parsedResult.map((habit) => {
                    if (currentDay > habit.completedDay) {
                        habit.completed = false;
                        habit.progress = 0;
                        habit.completedDay = currentDay;
                    }
                    return habit;
                });
                setHabits(mappedHabits);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const CRUDHabits = async (props) => {
        try {
            await AsyncStorage.setItem('@habit', JSON.stringify([...habits, props]));
            setHabits([...habits, props]);
        } catch (error) {
            console.error(error);
        }
    };

    const habitSetter = async (props) => {
        try {
            await AsyncStorage.setItem('@habit', JSON.stringify(props));
            setHabits(props);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getHabits();
    }, [currentDay]);

    return (
        <HabitContext.Provider
            value={{
                habits,
                habitSetter,
                getHabits,
                setHabits,
                CRUDHabits,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => useContext(HabitContext);

export default HabitProvider;
