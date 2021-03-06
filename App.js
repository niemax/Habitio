import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import HabitProvider from './src/context/HabitProvider';
import MainAppStack from './src/navigation/MainAppNav';
import { NativeBaseProvider, useColorMode, useColorModeValue } from 'native-base';
import theme from './src/theme';
import { colorModeManager } from './src/screens/SettingsDetailScreen';
import MoodProvider from './src/context/MoodProvider';

export default function App() {
    const [, , setExpoPushToken] = useState('');
    const [, , setNotification] = useState(false);
    const { colorMode } = useColorMode();

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                response;
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <HabitProvider>
            <MoodProvider>
                <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
                    <NavigationContainer theme={useColorModeValue(DefaultTheme, DarkTheme)}>
                        <SafeAreaProvider>
                            <StatusBar style="auto" />
                            <FlashMessage position="top" />
                            <MainAppStack />
                        </SafeAreaProvider>
                    </NavigationContainer>
                </NativeBaseProvider>
            </MoodProvider>
        </HabitProvider>
    );
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        console.error('Must use physical device for Push Notifications');
    }
    return token;
}
