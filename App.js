import React, { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';
import MainAppStack from './src/navigation/MainAppNav';
import HabitProvider from './src/context/HabitProvider';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    async function loadFonts() {
        await Font.loadAsync({
            // Load the main font from static assets
            Regular: require('./src/assets/font/Raleway-Regular.ttf'),
            Medium: require('./src/assets/font/Raleway-Medium.ttf'),
            SemiBold: require('./src/assets/font/Raleway-SemiBold.ttf'),
            Bold: require('./src/assets/font/Raleway-Bold.ttf'),
            Extra: require('./src/assets/font/Raleway-ExtraBold.ttf'),
        });
        setFontsLoaded(true);
    }

    useEffect(() => {
        loadFonts();
    }, []);

    if (fontsLoaded) {
        return (
            <NavigationContainer>
                <HabitProvider>
                    <SafeAreaProvider>
                        <MenuProvider>
                            <FlashMessage position="top" />
                            <MainAppStack />
                        </MenuProvider>
                    </SafeAreaProvider>
                </HabitProvider>
            </NavigationContainer>
        );
    }
    return <AppLoading />;
}
