import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import checkDateForHabitCompletedReset from '../utils/helpers/checkHabitsDate';

const HabitContext = createContext();
const day = new Date();
const currentDay = day.getDay();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);

    const checkHabits = async () => {
        try {
            const checkedHabits = habits.map((habit) => {
                if (currentDay > habit.completedDay) {
                    habit.completed = false;
                }
                return habit;
            });
            await AsyncStorage.setItem('@habit', JSON.stringify(checkedHabits));
            setHabits(checkedHabits);
        } catch (e) {
            console.error(e);
        }
    };

    const getHabits = async () => {
        try {
            const result = await AsyncStorage.getItem('@habit');
            if (result !== null) {
                const parsedResult = JSON.parse(result);

                const mappedHabits = parsedResult.map((habit) => {
                    if (currentDay > habit.completedDay) {
                        habit.completed = false;
                    }
                    return habit;
                });
                setHabits(mappedHabits);
            }
            console.log(habits);
        } catch (error) {
            console.error(error);
        }
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
        <HabitContext.Provider
            value={{ habits, habitSetter, getHabits, setHabits, CRUDHabits, checkHabits }}
        >
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => useContext(HabitContext);

export default HabitProvider;
