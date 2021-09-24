import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import SplashScreen from '../screens/AuthScreens/Splash';
import Test from '../screens/Test';
import CustomTabBar from '../components/CustomTabBar';
import HabitScreen from '../screens/HabitScreen';
import AddModal from '../components/AddGoalModal';

const Tab = createBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator initialRouteName="Homepage" tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
            options={{
                headerShown: false,
            }}
            name="Home"
            component={Homepage}
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
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
            name="MainTab"
            options={{ headerShown: false, gestureEnabled: false }}
            component={MainTab}
        />
        <Stack.Group>
            <Stack.Screen
                screenOptions={{ presentationStyle: 'modal', gestureEnabled: true }}
                name="AddModal"
                options={{ headerShown: false, gestureEnabled: false }}
                component={AddModal}
            />
            <Stack.Screen
                name="HabitScreen"
                options={{ headerShown: false, gestureEnabled: true }}
                component={HabitScreen}
            />
        </Stack.Group>
    </Stack.Navigator>
);

const Stack = createStackNavigator();

export default MainAppStack;
