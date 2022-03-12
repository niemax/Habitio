import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import React, { createContext, useContext, useEffect, useState } from 'react';
import data from '../categories';
import { getCurrentDay, getCurrentMonth, getCurrentWeek } from '../utils/helpers/dateHelpers';
import { toasts } from '../utils/helpers/toastMethods';

const HabitContext = createContext();

const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [habitsLoading, setHabitsLoading] = useState(false);
    const [initialData] = useState(data);

    const currentDay = getCurrentDay();
    const currentMonth = getCurrentMonth();
    const currentWeek = getCurrentWeek();

    const getHabits = async () => {
        if (AppLoading) setHabitsLoading(true);

        try {
            const result = await AsyncStorage.getItem('@habit');
            if (result !== null) {
                const parsedResult = JSON.parse(result);
                const mappedHabits = parsedResult.map((habit) => {
                    if (currentMonth > habit.dataCurrentMonth && habit.frequency === 'monthly') {
                        habit.progress = 0;
                    }
                    if (currentDay !== habit.dataCurrentDay && habit.frequency === 'daily') {
                        habit.progress = 0;
                        habit.dataCurrentDay = currentDay;
                        habit.completed = false;
                    }
                    if (currentWeek !== habit.dataCurrentWeek) {
                        habit.timesDonesThisWeek = 0;
                        habit.dataCurrentWeek = currentWeek;
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
        setHabitsLoading(false);
    };

    const getSpecificHabit = (id) => habits.find((habit) => habit.id === id);
    console.log(habits);

    const CRUDHabits = async (props) => {
        try {
            setHabits([
                ...habits,
                {
                    ...props,
                    id: Math.floor(Math.random() * 10000),
                    dataCurrentDay: currentDay,
                    dataCurrentWeek: currentWeek,
                    dataCurrentMonth: currentMonth,
                    completed: false,
                    calendarDone: false,
                    completedDates: {},
                    progress: 0,
                    noteInputs: [],
                    streak: [],
                    timesDoneThisWeek: 0,
                },
            ]);
            await AsyncStorage.setItem(
                '@habit',
                JSON.stringify([
                    ...habits,
                    {
                        ...props,
                        id: Math.floor(Math.random() * 10000),
                        dataCurrentDay: currentDay,
                        dataCurrentWeek: currentWeek,
                        dataCurrentMonth: currentMonth,
                        completed: false,
                        calendarDone: false,
                        completedDates: {},
                        progress: 0,
                        noteInputs: [],
                        streak: [],
                        timesDoneThisWeek: 0,
                    },
                ])
            );
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

    const dailyHabits = habits.filter((habit) => habit.frequency === 'daily');
    const monthlyHabits = habits.filter((habit) => habit.frequency === 'monthly');
    const weeklyHabits = habits.filter((habit) => habit.frequency === 'weekly');

    useEffect(() => {
        getHabits();
    }, [currentDay]);

    return (
        <HabitContext.Provider
            value={{
                initialData,
                habits,
                monthlyHabits,
                weeklyHabits,
                dailyHabits,
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
