import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentDayNumber } from '../utils/helpers/dateHelpers';

const HabitContext = createContext();
const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);

    const getHabits = async () => {
        try {
            const result = await AsyncStorage.getItem('@habit');
            if (result !== null) {
                const parsedResult = JSON.parse(result);

                const mappedHabits = parsedResult.map((habit) => {
                    if (getCurrentDayNumber() > habit.completedDay) {
                        habit.completed = false;
                        habit.progress = 0;
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

    const dayNumberNow = getCurrentDayNumber();

    useEffect(() => {
        getHabits();
    }, [dayNumberNow]);

    const checkDateForHabitCompletedReset = () => {
        try {
            const checkedHabits = habits.map((habit) => {
                if (getCurrentDayNumber() > habit.completedDay) {
                    habit.completed = false;
                    habit.progress = 0;
                }
                return habit;
            });
            habitSetter(checkedHabits);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <HabitContext.Provider
            value={{
                habits,
                habitSetter,
                getHabits,
                setHabits,
                CRUDHabits,
                checkDateForHabitCompletedReset,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => useContext(HabitContext);

export default HabitProvider;
