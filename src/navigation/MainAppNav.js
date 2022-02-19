import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabitScreen';
import StartHabitCreation from '../screens/StartHabitCreationScreen';
import Settings from '../screens/SettingsScreen';
import ShowHabitEditModal from '../components/modalComponents/HabitEditModal';
import CalendarModal from '../components/modalComponents/CalendarModal';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Text, useColorMode, Circle, HStack } from 'native-base';
import EditNote from '../screens/EditNoteModal';
import { formatDateForHabitEndDate } from '../utils/helpers/dateHelpers';
import { handleNoteEdit, handleNoteDelete } from '../utils/helpers/noteMethods';
import { useHabits } from '../context/HabitProvider';

const Stack = createNativeStackNavigator();

const MainAppStack = () => {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const { habits, habitSetter } = useHabits();

    return (
        <Stack.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                headerShown: true,
                gestureEnabled: true,
                headerTitleStyle: { color: '#FFFFFF', fontSize: 18 },
            }}
        >
            <Stack.Group>
                <Stack.Screen
                    name="Homepage"
                    options={() => ({
                        headerTransparent: true,
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        headerLargeTitle: true,
                        headerLargeStyle: {
                            backgroundColor: colorMode === 'dark' ? colors.black : colors.white,
                        },
                        headerLargeTitleStyle: {
                            fontSize: 38,
                            fontWeight: '800',
                            color: colorMode === 'dark' ? 'white' : 'black',
                        },
                        title: 'Dashboard',
                        headerTitleStyle: {
                            color: colors.mainPurple,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('StartHabitCreation')}
                            >
                                <Circle
                                    size="xs"
                                    shadow="5"
                                    rounded="full"
                                    _pressed={{ bg: colors.purple }}
                                    bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
                                >
                                    <AntDesign name="plus" size={20} color={colors.mainPurple} />
                                </Circle>
                            </TouchableOpacity>
                        ),
                    })}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="StartHabitCreation"
                    options={{
                        title: 'Add a Habit',
                        headerTitleStyle: {
                            color: colorMode === 'dark' ? 'white' : 'black',
                            fontWeight: '600',
                            fontSize: 18,
                        },
                        headerBackTitleVisible: true,
                        headerTintColor: colors.mainPurple,
                        headerStyle: {
                            backgroundColor:
                                colorMode === 'dark' ? colors.mainBackground : colors.white,
                        },
                    }}
                    component={StartHabitCreation}
                />
                <Stack.Screen
                    name="HabitScreen"
                    options={{
                        title: 'Choose one',
                        headerBackTitleVisible: true,
                        headerBackTitle: 'Back',
                        headerTintColor: colors.mainPurple,
                        headerStyle: {
                            backgroundColor:
                                colorMode === 'dark' ? colors.mainBackground : colors.white,
                        },
                        headerTitleStyle: {
                            color: colorMode === 'dark' ? 'white' : 'black',
                            fontWeight: '600',
                            fontSize: 18,
                        },
                    }}
                    component={HabitScreen}
                />
                <Stack.Screen
                    name="CreateHabit"
                    options={({ route }) => ({
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        headerLargeTitle: true,
                        headerLargeStyle: {
                            backgroundColor:
                                colorMode === 'dark' ? colors.mainBackground : colors.white,
                        },
                        headerLargeTitleStyle: {
                            fontSize: 30,
                            fontWeight: '800',
                            color: colorMode === 'light' ? 'black' : 'white',
                        },
                        headerTransparent: true,
                        headerTintColor: colors.mainPurple,
                        headerBackTitleVisible: true,
                        headerBackTitle: 'Back',
                        title: route.params.name || route.params.habitName,
                        headerTitleStyle: {
                            color: colorMode === 'light' ? 'black' : 'white',
                            fontWeight: '600',
                            fontSize: 18,
                        },
                    })}
                    component={CreateHabit}
                />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="ShowHabitEditModal"
                    options={({ route }) => ({
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        headerLargeTitle: true,
                        headerLargeStyle: {
                            backgroundColor:
                                colorMode === 'dark' ? colors.mainBackground : colors.white,
                        },
                        headerLargeTitleStyle: {
                            fontSize: 30,
                            fontWeight: '800',
                            color: colorMode === 'light' ? 'black' : 'white',
                        },
                        headerTransparent: true,
                        headerTintColor: colors.mainPurple,
                        headerBackTitleVisible: true,
                        headerBackTitle: 'Back',
                        title: route.params.name,
                        headerTitleStyle: {
                            color: colorMode === 'light' ? 'black' : 'white',
                            fontWeight: '600',
                            fontSize: 18,
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text color={colors.mainPurple} fontSize="lg" fontWeight={600}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        ),
                    })}
                    component={ShowHabitEditModal}
                />
                <Stack.Screen
                    name="CalendarModal"
                    options={({ route }) => ({
                        headerTransparent: true,
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        headerLargeTitle: true,
                        headerLargeStyle: {
                            backgroundColor:
                                colorMode === 'light' ? colors.white : colors.mainBackground,
                        },
                        headerLargeTitleStyle: {
                            fontSize: 30,
                            fontWeight: '800',
                            color: colorMode === 'light' ? 'black' : 'white',
                        },
                        title: route.params.name,
                        headerTitleStyle: {
                            color: colorMode === 'light' ? 'black' : 'white',
                            fontWeight: '600',
                            fontSize: 18,
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text color={colors.mainPurple} fontSize="lg" fontWeight={600}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        ),
                        headerTintColor: colors.mainPurple,
                    })}
                    component={CalendarModal}
                />
                <Stack.Screen
                    name="EditNote"
                    options={({ route }) => ({
                        headerTransparent: true,
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        headerLargeTitle: true,
                        headerLargeStyle: {
                            backgroundColor:
                                colorMode === 'light' ? colors.white : colors.mainBackground,
                        },
                        headerLargeTitleStyle: {
                            fontSize: 24,
                            fontWeight: '700',
                            color: colorMode === 'light' ? 'black' : 'white',
                        },

                        title: `📌 ${formatDateForHabitEndDate(route.params.date)}`,
                        headerTitleStyle: {
                            color: colorMode === 'light' ? 'black' : 'white',
                            fontWeight: '600',
                            fontSize: 16,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text color={colors.mainPurple} fontSize="lg" fontWeight={600}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <HStack space={8}>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleNoteDelete(
                                            route.params.habitId,
                                            route.params.id,
                                            habits,
                                            route.params.allNotes,
                                            habitSetter
                                        );
                                        navigation.goBack();
                                    }}
                                >
                                    <Ionicons name="trash" size={24} color={colors.error} />
                                </TouchableOpacity>
                            </HStack>
                        ),

                        headerTintColor: colors.mainPurple,
                    })}
                    component={EditNote}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MainAppStack;
