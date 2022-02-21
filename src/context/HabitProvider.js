import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    formatDateForHabitEndDate,
    getCurrentDay,
    getCurrentMonth,
    getCurrentWeek,
} from '../utils/helpers/dateHelpers';
import { cancelPushNotification } from '../utils/helpers/notification';
import { toasts } from '../utils/helpers/toastMethods';

const HabitContext = createContext();

const currentDay = getCurrentDay();
const currentMonth = getCurrentMonth();
const currentWeek = getCurrentWeek();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [habitsLoading, setHabitsLoading] = useState(true);

    const getHabits = async () => {
        if (Object.keys(habits).length > 0) setHabitsLoading(true);

        try {
            const result = await AsyncStorage.getItem('@habit');
            if (result !== null) {
                const parsedResult = JSON.parse(result);
                const mappedHabits = parsedResult.map((habit) => {
                    if (currentMonth > habit.dataCurrentMonth && habit.frequency === 'monthly') {
                        habit.progress = 0;
                    }
                    if (currentDay !== habit.dataCurrentDay && habit.frequency === 'weekly') {
                        habit.progress = 0;
                        habit.dataCurrentDay = currentDay;
                        habit.completed = false;
                    }
                    if (currentWeek !== habit.dataCurrentWeek) {
                        habit.timesDonesThisWeek = 0;
                        habit.dataCurrentWeek = currentWeek;
                    }
                    if (
                        formatDateForHabitEndDate(new Date()) ===
                        formatDateForHabitEndDate(habit.endDate)
                    ) {
                        Promise.resolve(cancelPushNotification(habit.notificationId));
                    }
                    return habit;
                });
                setHabits(mappedHabits);
                setTimeout(() => {
                    setHabitsLoading(false);
                }, 1000);
            } else {
                setHabitsLoading(false);
            }
        } catch (error) {
            console.error(error);
            toasts.error(error);
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

    const monthlyHabits = habits.filter((habit) => habit.frequency === 'monthly');
    const weeklyHabits = habits.filter((habit) => habit.frequency === 'weekly');

    useEffect(() => {
        getHabits();
    }, [currentDay]);

    return (
        <HabitContext.Provider
            value={{
                habits,
                monthlyHabits,
                weeklyHabits,
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
