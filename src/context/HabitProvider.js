import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentDay } from '../utils/helpers/dateHelpers';

const HabitContext = createContext();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [habitsLoading, setHabitsLoading] = useState(true);

    const currentDay = getCurrentDay();

    const getHabits = async () => {
        if (Object.keys(habits).length > 0) setHabitsLoading(true);

        try {
            const result = await AsyncStorage.getItem('@habit');
            if (result !== null) {
                const parsedResult = JSON.parse(result);
                const mappedHabits = parsedResult.map((habit) => {
                    if (currentDay === 0) {
                        habit.dataCurrentDay = currentDay + 1;
                        habit.completed = false;
                        habit.progress = 0;
                    }
                    if (currentDay > habit.dataCurrentDay) {
                        habit.dataCurrentDay = currentDay;
                        habit.completed = false;
                        habit.progress = 0;
                    }
                    return habit;
                });
                setHabits(mappedHabits);
                setHabitsLoading(false);
            } else {
                setHabitsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getSpecificHabit = (id) => habits.find((habit) => habit.id === id);

    const CRUDHabits = async (props) => {
        try {
            setHabits([...habits, props]);
            await AsyncStorage.setItem('@habit', JSON.stringify([...habits, props]));
        } catch (error) {
            console.error(error);
        }
    };

    const habitSetter = async (props) => {
        try {
            setHabits(props);
            await AsyncStorage.setItem('@habit', JSON.stringify(props));
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
                habitsLoading,
                habitSetter,
                getSpecificHabit,
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
