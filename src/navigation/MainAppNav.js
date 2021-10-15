import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Test from '../screens/Test';
import CustomTabBar from '../components/CustomTabBar';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import StartHabitCreation from '../screens/StartHabitCreation';
import Settings from '../screens/Settings';
import SplashScreen from '../screens/AuthScreens/Splash';

const Tab = createBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator initialRouteName="Homepage" tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
            options={{
                headerShown: false,
            }}
            name="Habits"
            component={Homepage}
            initialParams={{ icon: 'list' }}
        />
        <Tab.Screen
            options={{
                headerShown: false,
            }}
            name="Test"
            component={Test}
            initialParams={{ icon: 'open-book' }}
        />
    </Tab.Navigator>
);

const Stack = createStackNavigator();

const MainAppStack = () => (
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
            name="SplashScreen"
            options={{ headerShown: false, gestureEnabled: false }}
            component={SplashScreen}
        />
        <Stack.Screen
            name="MainTab"
            options={{ headerShown: false, gestureEnabled: false }}
            component={MainTab}
        />
        <Stack.Screen
            screenOptions={{ presentation: 'modal' }}
            name="StartHabitCreation"
            options={{ headerShown: false, gestureEnabled: false }}
            component={StartHabitCreation}
        />
        <Stack.Screen
            name="HabitScreen"
            options={{ headerShown: false, gestureEnabled: true }}
            component={HabitScreen}
        />
        <Stack.Screen
            name="CreateHabit"
            options={{
                gestureEnabled: true,
                headerShown: false,
            }}
            component={CreateHabit}
        />
        <Stack.Screen
            name="Settings"
            options={{
                gestureEnabled: true,
                headerShown: false,
            }}
            component={Settings}
        />
    </Stack.Navigator>
);

export default MainAppStack;
