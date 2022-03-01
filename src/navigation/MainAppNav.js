import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { handleNoteDelete } from '../utils/helpers/noteMethods';
import { useHabits } from '../context/HabitProvider';
import { BlurView } from 'expo-blur';
import SettingsDetailScreen from '../screens/SettingsDetailScreen';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    const { colorMode } = useColorMode();
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'list';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={24}
                            color={focused ? colors.mainPurple : 'gray'}
                        />
                    );
                },
                headerShown: false,
                tabBarActiveTintColor: colors.mainPurple,
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
                name="Home"
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarLabelStyle: { fontSize: 12 },
                }}
                component={MainAppStack}
            />
            <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
    );
};

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    const { colorMode } = useColorMode();
    return (
        <Stack.Navigator initiaRouteName="Settings">
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
                        color: colors.mainPurple,
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
                    headerTintColor: colors.mainPurple,
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
    return (
        <Stack.Navigator initialRouteName="StartHabitCreation">
            <Stack.Screen
                name="StartHabitCreation"
                options={{
                    title: 'Add a Habit',
                    headerShown: true,
                    headerTitleStyle: {
                        color: colorMode === 'dark' ? 'white' : 'black',
                        fontWeight: '600',
                        fontSize: 18,
                    },
                    headerBackTitleVisible: true,
                    headerBackTitle: 'Back',
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
        </Stack.Navigator>
    );
};

const MainAppStack = () => {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const { habits, habitSetter } = useHabits();

    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                headerTitleStyle: { color: '#FFFFFF', fontSize: 18 },
            }}
        >
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Dashboard"
                    options={() => ({
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
                            color: colors.mainPurple,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CreateHabitStack')}
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
                    name="Settings"
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
                        headerTintColor: colors.mainPurple,
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
                    name="ShowHabitEditModal"
                    options={({ route }) => ({
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

export default MainTab;
