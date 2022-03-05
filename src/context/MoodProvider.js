import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentDateFormatted } from '../utils/helpers/dateHelpers';

const MoodContext = createContext();

const MoodProvider = ({ children }) => {
    const [moods, setMoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentDay = getCurrentDateFormatted(new Date());

    const addMood = async (props) => {
        try {
            setMoods([...moods, props]);
            await AsyncStorage.setItem('@moods', JSON.stringify([...moods, props]));
        } catch (error) {
            console.error(error);
        }
    };

    const updateMoods = async (props) => {
        try {
            setMoods(props);
            await AsyncStorage.setItem('@moods', JSON.stringify(props));
        } catch (error) {
            console.error(error);
        }
    };

    const getMoods = async () => {
        if (!!moods.length) setIsLoading(true);

        try {
            const result = await AsyncStorage.getItem('@moods');
            if (result !== null) {
                const parsed = JSON.parse(result);
                setMoods(parsed);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            toasts.error(error);
        }
    };

    const getSpecificMood = (id) => moods.find((mood) => mood.id === id);

    const deleteMood = (id) => {
        const filtered = moods.filter((mood) => mood.id !== id);
        updateMoods(filtered);
    };

    const getHappyMoodCount = () =>
        moods.map((mood) => mood.moodName === 'Happy').reduce((acc, curr) => acc + curr ?? 0, 0);

    const getTodaysMood = () => {
        const found = moods?.find((mood) => mood.date === currentDay);
        return found?.moodName;
    };

    useEffect(() => {
        getMoods();
    }, []);

    return (
        <MoodContext.Provider
            value={{
                moods,
                setMoods,
                getMoods,
                addMood,
                isLoading,
                getSpecificMood,
                deleteMood,
                updateMoods,
                getHappyMoodCount,
                getTodaysMood,
            }}
        >
            {children}
        </MoodContext.Provider>
    );
};

export const useMoods = () => useContext(MoodContext);

export default MoodProvider;
