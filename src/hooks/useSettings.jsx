import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

// todo: context
const useSettings = () => {
    const [color, setColor] = useState('#FF4040');

    const getMainColor = async () => {
        try {
            const result = await AsyncStorage.getItem('@app-color');
            if (!!result) setColor(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMainColor();
    }, [color]);

    const handleSetColor = async (prop) => {
        try {
            await AsyncStorage.setItem('@app-color', prop);
            setColor(prop);
        } catch (error) {
            console.error(error);
        }
    };

    const colors = {
        mainBackground: '#18181b',
        mainColor: color,
        error: '#EA5B71',
        black: '#000000',
        white: '#F1F1F1',
    };

    const habitSelectionColors = [
        '#FF4040',
        '#FF6347',
        '#7F3FBF',
        '#7FBF3F',
        '#3F3FBF',
        '#FA9C0F',
        '#FA0FE2',
        '#0FCBFA',
        '#0F84FA',
        '#2EB284',
        '#4C7226',
        '#722672',
        '#3FBFBF',
        '#EA5B71',
    ];

    return { colors, habitSelectionColors, getMainColor, handleSetColor, color, setColor };
};

export default useSettings;
