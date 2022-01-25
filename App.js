import React, { useEffect, useState, useRef } from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import FlashMessage from 'react-native-flash-message';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import HabitProvider from './src/context/HabitProvider';
import MainAppStack from './src/navigation/MainAppNav';
import { colors } from './src/utils/colors';
import { NativeBaseProvider } from 'native-base';
import { customTheme } from './src/theme';

export default function App() {
    const [, , setExpoPushToken] = useState('');
    const [, , setNotification] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const notificationListener = useRef();
    const responseListener = useRef();

    async function loadFonts() {
        await Font.loadAsync({
            Regular: require('./src/assets/font/Raleway-Regular.ttf'),
            Medium: require('./src/assets/font/Raleway-Medium.ttf'),
            SemiBold: require('./src/assets/font/Raleway-SemiBold.ttf'),
            Bold: require('./src/assets/font/Raleway-Bold.ttf'),
            Extra: require('./src/assets/font/Raleway-ExtraBold.ttf'),
            MediumItalic: require('./src/assets/font/Raleway-MediumItalic.ttf'),
        });
        setFontsLoaded(true);
    }

    useEffect(() => {
        loadFonts();
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

    if (fontsLoaded) {
        return (
            <HabitProvider>
                <NativeBaseProvider theme={customTheme}>
                    <NavigationContainer>
                        <SafeAreaProvider>
                            <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
                                <StatusBar style="light" />
                                <FlashMessage position="top" />
                                <MainAppStack />
                            </View>
                        </SafeAreaProvider>
                    </NavigationContainer>
                </NativeBaseProvider>
            </HabitProvider>
        );
    }
    return <AppLoading />;
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
