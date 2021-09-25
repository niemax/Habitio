import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Test from '../screens/Test';
import CustomTabBar from '../components/CustomTabBar';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import FirstHabitModal from '../components/AddGoalModal';

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
                screenOptions={{ presentation: 'modal' }}
                name="FirstHabitModal"
                options={{ headerShown: false, gestureEnabled: false }}
                component={FirstHabitModal}
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
        </Stack.Group>
    </Stack.Navigator>
);

const Stack = createStackNavigator();

export default MainAppStack;
