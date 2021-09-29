import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from './src/navigation/MainAppNav';
import * as Font from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    async function loadFonts() {
        await Font.loadAsync({
            // Load the main font from static assets
            Regular: require('./src/assets/font/Raleway-Regular.ttf'),
            Medium: require('./src/assets/font/Raleway-Medium.ttf'),
            SemiBold: require('./src/assets/font/Raleway-SemiBold.ttf'),
            Bold: require('./src/assets/font/Raleway-Bold.ttf'),
        });
        setFontsLoaded(true);
    }

    useEffect(() => {
        loadFonts();
    }, []);

    if (fontsLoaded) {
        return (
            <NavigationContainer>
                <StatusBar style="light" />
                <SafeAreaProvider>
                    <MenuProvider>
                        <MainAppStack />
                    </MenuProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        );
    }
    return <AppLoading />;
}
