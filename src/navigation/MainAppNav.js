import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import SplashScreen from '../screens/AuthScreens/Splash';
import Test from '../screens/Test';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const HomepageStack = () => (
    <Stack.Navigator
        initialRouteName="Homepage" // VAIHDA TÄMÄ TAKAISIN SIGNUP
    >
        <Stack.Screen
            name="Homepage"
            options={{ headerShown: false, gestureEnabled: false }}
            component={Homepage}
        />
    </Stack.Navigator>
);

const MainTab = () => (
    <Tab.Navigator initialRouteName="HomepageStack" tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
            options={{
                headerShown: false,
            }}
            name="Home"
            component={HomepageStack}
        />
        <Tab.Screen
            options={{
                headerShown: false,
            }}
            name="Test"
            component={Test}
        />
    </Tab.Navigator>
);

const MainAppStack = () => (
    <Stack.Navigator
        initialRouteName="SplashScreen" // VAIHDA TÄMÄ TAKAISIN SIGNUP
    >
        <Stack.Screen
            name="SplashScreen"
            options={{ headerShown: false, gestureEnabled: false }}
            component={SplashScreen}
        />
        <Stack.Screen
            name="Homepage"
            options={{ headerShown: false, gestureEnabled: false }}
            component={MainTab}
        />
    </Stack.Navigator>
);

const Stack = createStackNavigator();

export default MainAppStack;
