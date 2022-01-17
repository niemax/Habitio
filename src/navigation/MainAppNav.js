import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Homepage from '../screens/Homepage';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import StartHabitCreation from '../screens/StartHabitCreation';
import Settings from '../screens/Settings';
import ShowHabitModal from '../components/modalComponents/ShowHabitModal';
import ShowHabitEditModal from '../components/modalComponents/ShowHabitEditModal';
import CalendarModal from '../components/modalComponents/CalendarModal';

const Stack = createStackNavigator();

const MainAppStack = () => (
    <Stack.Navigator
        mode="modal"
        initialRouteName="Homepage"
        screenOptions={{
            headerShown: false,
            gestureEnabled: true,
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
            }}
        >
            <Stack.Screen
                name="ShowHabitModal"
                component={ShowHabitModal}
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen
                name="ShowHabitEditModal"
                component={ShowHabitEditModal}
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen
                name="CalendarModal"
                cemponent={CalendarModal}
                options={{ presentation: 'modal' }}
            />
        </Stack.Group>
    </Stack.Navigator>
);

export default MainAppStack;
