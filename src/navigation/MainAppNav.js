import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreateHabit from '../screens/CreateHabitScreen';
import StartHabitCreation from '../screens/StartHabitCreationScreen';
import Settings from '../screens/SettingsScreen';
import HabitEditModal from '../components/modalComponents/HabitEditModal';
import CalendarModal from '../components/modalComponents/CalendarModal';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Text, useColorMode, HStack, Flex } from 'native-base';
import EditNote from '../screens/EditNoteModal';
import { formatDateForHabitEndDate } from '../utils/helpers/dateHelpers';
import { handleNoteDelete } from '../utils/helpers/noteMethods';
import { useHabits } from '../context/HabitProvider';
import { BlurView } from 'expo-blur';
import SettingsDetailScreen from '../screens/SettingsDetailScreen';
import useSettings from '../hooks/useSettings';
import MoodMainScreen from '../screens/MoodMainScreen';
import MoodDetailsScreen, { renderEmoji } from '../screens/MoodDetailsScreen';
import MoodEditScreen from '../screens/MoodEditScreen';
import { useMoods } from '../context/MoodProvider';
import SelectFrequencyScreen from '../screens/SelectFrequencyScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    const { colorMode } = useColorMode();

    const { colors } = useSettings();
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = 'aperture-sharp';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    } else if (route.name === 'Mood') {
                        iconName = 'heart';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={24}
                            color={focused ? colors.mainColor : 'gray'}
                        />
                    );
                },
                headerShown: false,
                tabBarActiveTintColor: colors.mainColor,
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    borderTopWidth: 0,
                },
                tabBarBackground: () => (
                    <BlurView
                        tint={colorMode === 'light' ? 'light' : 'dark'}
                        intensity={80}
                        style={StyleSheet.absoluteFill}
                    />
                ),
            })}
        >
            <Tab.Screen
                name="Dashboard"
                options={{
                    tabBarLabelStyle: { fontSize: 12 },
                }}
                component={MainAppStack}
            />
            <Tab.Screen
                name="Mood"
                options={{
                    tabBarLabelStyle: { fontSize: 12 },
                }}
                component={MoodStack}
            />
            <Tab.Screen
                name="Settings"
                options={{
                    tabBarLabelStyle: { fontSize: 12 },
                }}
                component={SettingsStack}
            />
        </Tab.Navigator>
    );
};

const MoodStack = () => {
    const { colorMode } = useColorMode();
    const { colors } = useSettings();
    const { getHappyMoodCount } = useMoods();
    const happyMoodCount = getHappyMoodCount();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Mood"
                options={{
                    tabBarLabelStyle: { fontSize: 12 },
                    headerShown: true,
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
                    headerTitleStyle: {
                        color: colors.mainColor,
                    },
                    headerRight: () => (
                        <Text fontWeight={700}>{happyMoodCount} happy days ❤️‍🔥 </Text>
                    ),
                }}
                component={MoodMainScreen}
            />
            <Stack.Screen
                name="MoodDetailsScreen"
                options={({ route }) => ({
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: colors.mainColor,
                    headerLargeTitle: true,
                    headerLargeStyle: {
                        backgroundColor: colorMode === 'dark' ? colors.black : colors.white,
                    },
                    headerLargeTitleStyle: {
                        fontSize: 32,
                        fontWeight: '700',
                        color: colorMode === 'dark' ? 'white' : 'black',
                    },
                    title: 'Summary',
                    headerBlurEffect:
                        colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',

                    headerTitleStyle: {
                        color: colorMode === 'light' ? 'black' : 'white',
                    },
                    headerBackTitle: 'Back',
                })}
                component={MoodDetailsScreen}
            />
            <Stack.Screen
                name="MoodEditScreen"
                options={{
                    presentation: 'modal',
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: colors.mainColor,
                    headerBlurEffect:
                        colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',

                    headerTitleStyle: {
                        color: colors.mainColor,
                    },
                    headerTitle: 'Edit mood',
                    headerBackTitle: 'Back',
                }}
                component={MoodEditScreen}
            />
        </Stack.Navigator>
    );
};

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    const { colorMode } = useColorMode();
    const { colors } = useSettings();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                options={{
                    tabBarLabel: 'Settings',
                    tabBarLabelStyle: { fontSize: 12 },
                    headerShown: true,
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
                    headerTitleStyle: {
                        color: colors.mainColor,
                    },
                }}
                component={Settings}
            />
            <Stack.Screen
                name="SettingsDetailScreen"
                options={({ route }) => ({
                    headerShown: true,
                    headerBlurEffect:
                        colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                    headerTransparent: true,
                    headerTintColor: colors.mainColor,
                    headerTitle: route.params.name,
                    headerTitleStyle: {
                        color: colorMode === 'dark' ? 'white' : 'black',
                    },
                })}
                component={SettingsDetailScreen}
            />
        </Stack.Navigator>
    );
};

const CreateHabitStack = () => {
    const { colorMode } = useColorMode();
    const { colors } = useSettings();

    return (
        <Stack.Navigator initialRouteName="StartHabitCreation">
            <Stack.Screen
                name="StartHabitCreation"
                options={{
                    headerShown: true,
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
                    headerBackTitle: 'Back',
                    headerTitle: 'Add a habit',
                    headerTitleStyle: {
                        color: colorMode === 'light' ? 'black' : 'white',
                        fontWeight: '600',
                        fontSize: 18,
                    },
                }}
                component={StartHabitCreation}
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
                    headerTintColor: colors.mainColor,
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
            <Stack.Screen
                name="SelectFrequencyScreen"
                options={{
                    title: '',
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerBackTitle: 'Back',
                    headerTintColor: colors.mainColor,
                    headerStyle: {
                        backgroundColor:
                            colorMode === 'dark' ? colors.mainBackground : colors.white,
                    },
                }}
                component={SelectFrequencyScreen}
            />
        </Stack.Navigator>
    );
};

const MainAppStack = ({ navigation }) => {
    const { habits, habitSetter } = useHabits();
    const { colorMode } = useColorMode();
    const { colors } = useSettings();

    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                headerTitleStyle: { color: '#FFFFFF', fontSize: 18 },
            }}
        >
            <Stack.Group screenOptions={{ presentation: 'modal', animation: 'flip' }}>
                <Stack.Screen
                    name="Dashboard"
                    options={() => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        title: 'Today',
                        headerLargeTitle: true,
                        headerLargeStyle: {
                            backgroundColor: colorMode === 'dark' ? colors.black : colors.white,
                        },
                        headerLargeTitleStyle: {
                            fontSize: 38,
                            fontWeight: '800',
                            color: colorMode === 'dark' ? 'white' : 'black',
                        },
                        headerTitleStyle: {
                            color: colors.mainColor,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CreateHabitStack')}
                            >
                                <Flex direction="row" align="center">
                                    <Text color={colors.mainColor} mr={1}>
                                        Add a habit
                                    </Text>
                                    <AntDesign name="plus" size={28} color={colors.mainColor} />
                                </Flex>
                            </TouchableOpacity>
                        ),
                    })}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="SettingsScreen"
                    options={{
                        headerShown: true,
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
                        headerTintColor: colors.mainColor,
                        headerBackTitleVisible: true,
                        headerBackTitle: 'Back',
                        headerTitle: 'Settings',
                        headerTitleStyle: {
                            color: colorMode === 'light' ? 'black' : 'white',
                            fontWeight: '600',
                            fontSize: 18,
                        },
                    }}
                    component={Settings}
                />
                <Stack.Screen name="CreateHabitStack" component={CreateHabitStack} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="HabitEditModal"
                    options={({ route }) => ({
                        headerShown: true,
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',
                        headerTransparent: true,
                        headerTintColor: colors.mainColor,
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
                                <Text color={colors.mainColor} fontSize="lg" fontWeight={600}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        ),
                    })}
                    component={HabitEditModal}
                />
                <Stack.Screen
                    name="CalendarModal"
                    options={({ route }) => ({
                        presentation: 'modal',
                        animation: 'flip',
                        headerShown: true,
                        headerTransparent: true,
                        headerBlurEffect:
                            colorMode === 'light' ? 'systemUltraThinMaterialLight' : 'dark',

                        title: route.params.name,
                        headerBackTitleVisible: true,
                        headerTitleStyle: {
                            color: colorMode === 'light' ? 'black' : 'white',
                            fontWeight: '600',
                            fontSize: 20,
                        },
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text color={colors.mainColor} fontSize="lg" fontWeight={700}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        ),
                        headerTintColor: colors.mainColor,
                    })}
                    component={CalendarModal}
                />
                <Stack.Screen
                    name="EditNote"
                    options={({ route }) => ({
                        headerShown: true,
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
                                <Text color={colors.mainColor} fontSize="lg" fontWeight={600}>
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

                        headerTintColor: colors.mainColor,
                    })}
                    component={EditNote}
                />
                <Stack.Screen name="SelectFrequencyScreen" component={SelectFrequencyScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MainTab;
