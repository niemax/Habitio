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
                setHabits(parsedResult);
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

    const checkDayForHabitReset = () => {
        const mappedHabits = habits.map((habit) => {
            if (getCurrentDay() > habit.completedDay) {
                habit.completed = false;
                habit.progress = 0;
                habit.completedDay = currentDay;
            }
            return habit;
        });
        setHabits(mappedHabits);
    };

    useEffect(() => {
        getHabits();
    }, []);

    useEffect(() => {
        checkDayForHabitReset();
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
