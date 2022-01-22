import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/Homepage';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import StartHabitCreation from '../screens/StartHabitCreation';
import Settings from '../screens/Settings';
import ShowHabitModal from '../components/modalComponents/ShowHabitModal';
import ShowHabitEditModal from '../components/modalComponents/ShowHabitEditModal';
import CalendarModal from '../components/modalComponents/CalendarModal';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TextStyle from '../utils/Text';

const Stack = createNativeStackNavigator();

const MainAppStack = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                headerTitleStyle: { color: '#FFFFFF', fontFamily: 'Bold', fontSize: 20 },
            }}
        >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen
                name="StartHabitCreation"
                options={{
                    headerShown: true,
                    title: 'Add a Habit',
                    headerTitleStyle: { color: '#FFFFFF', fontFamily: 'Bold', fontSize: 20 },
                    headerBackTitleVisible: false,
                    headerTintColor: colors.mainGreen,
                    headerStyle: { backgroundColor: colors.black },
                }}
                component={StartHabitCreation}
            />
            <Stack.Screen
                name="HabitScreen"
                options={{
                    headerShown: true,
                    title: 'Choose one',
                    headerBackTitleVisible: false,
                    headerTintColor: colors.mainGreen,
                    headerStyle: { backgroundColor: colors.black },
                }}
                component={HabitScreen}
            />
            <Stack.Screen
                name="CreateHabit"
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.name || route.params.habitName,
                    headerBackTitleVisible: false,
                    headerTintColor: colors.mainGreen,
                    headerStyle: { backgroundColor: colors.black },
                })}
                component={CreateHabit}
            />
            <Stack.Screen name="Settings" component={Settings} />

            <Stack.Screen
                name="ShowHabitModal"
                options={({ route }) => ({
                    presentation: 'modal',
                    headerShown: true,
                    title: '',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ShowHabitEditModal', {
                                    data: route.params.data,
                                })
                            }
                        >
                            <TextStyle twenty color={colors.mainGreen}>
                                Edit
                            </TextStyle>
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <Ionicons
                            name="chevron-back"
                            size={28}
                            color="white"
                            onPress={() => navigation.goBack()}
                        />
                    ),
                    headerTintColor: colors.mainGreen,
                    headerStyle: { backgroundColor: colors.mainBackground },
                })}
                component={ShowHabitModal}
            />
            <Stack.Screen
                name="ShowHabitEditModal"
                options={{
                    headerTintColor: colors.mainGreen,
                    headerStyle: { backgroundColor: colors.mainBackground },
                    headerShown: true,
                    title: 'Edit Habit',
                    presentation: 'modal',
                    headerLeft: () => (
                        <Ionicons
                            name="chevron-back"
                            size={28}
                            color={colors.mainGreen}
                            onPress={() => navigation.goBack()}
                        />
                    ),
                }}
                component={ShowHabitEditModal}
            />
            <Stack.Screen
                name="CalendarModal"
                options={({ route }) => ({
                    presentation: 'modal',
                    headerShown: true,
                    title: route.params.data.name,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <TextStyle color={colors.mainGreen}>Done</TextStyle>
                        </TouchableOpacity>
                    ),
                    headerTintColor: colors.mainGreen,
                    headerStyle: { backgroundColor: colors.mainBackground },
                })}
                component={CalendarModal}
            />
        </Stack.Navigator>
    );
};

export default MainAppStack;
