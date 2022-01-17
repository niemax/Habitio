import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/Homepage';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import StartHabitCreation from '../screens/StartHabitCreation';
import Settings from '../screens/Settings';
import ShowHabitModal from '../components/modalComponents/ShowHabitModal';
import ShowHabitEditModal from '../components/modalComponents/ShowHabitEditModal';
import CalendarModal from '../components/modalComponents/CalendarModal';

const Stack = createNativeStackNavigator();

const MainAppStack = () => (
    <Stack.Navigator
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
                presentation: 'modal',
            }}
        >
            <Stack.Screen name="ShowHabitModal" component={ShowHabitModal} />
            <Stack.Screen name="ShowHabitEditModal" component={ShowHabitEditModal} />
            <Stack.Screen name="CalendarModal" component={CalendarModal} />
        </Stack.Group>
    </Stack.Navigator>
);

export default MainAppStack;
