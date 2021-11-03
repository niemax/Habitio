import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
    TransitionPresets,
    TransitionSpecs,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Test from '../screens/Test';
import CustomTabBar from '../components/tabNavComponents/CustomTabBar';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import StartHabitCreation from '../screens/StartHabitCreation';
import Settings from '../screens/Settings';
import Splash from '../screens/Splash';
import ShowHabitModal from '../components/modalComponents/ShowHabitModal';
import ShowHabitEditModal from '../components/modalComponents/ShowHabitEditModal';
import CalendarModal from '../components/modalComponents/CalendarModal';
import SplashScreen from '../screens/Splash';

const Stack = createStackNavigator();
/* const Tab = createBottomTabNavigator();


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
); */

const MainAppStack = () => (
    <Stack.Navigator
        mode="modal"
        initialRouteName="Homepage"
        screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            ...TransitionPresets.DefaultTransition,
        }}
    >
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="StartHabitCreation" component={StartHabitCreation} />
        <Stack.Screen name="HabitScreen" component={HabitScreen} />
        <Stack.Screen name="CreateHabit" component={CreateHabit} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Group
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <Stack.Screen name="ShowHabitModal" component={ShowHabitModal} />
            <Stack.Screen name="ShowHabitEditModal" component={ShowHabitEditModal} />
            <Stack.Screen name="CalendarModal" component={CalendarModal} />
        </Stack.Group>
    </Stack.Navigator>
);

export default MainAppStack;
