import React, { useEffect, useState, useRef } from 'react';
import { AsyncStorage, Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import HabitProvider from './src/context/HabitProvider';
import MainAppStack from './src/navigation/MainAppNav';
import { colors } from './src/utils/colors';
import { Box, NativeBaseProvider, useColorMode } from 'native-base';
import theme from './src/theme';

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
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <StatusBar style="auto" />
                        <FlashMessage position="top" />
                        <MainAppStack />
                    </SafeAreaProvider>
                </NavigationContainer>
            </NativeBaseProvider>
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
        //alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
