import React, { useEffect, useState } from 'react';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/Homepage';
import HabitScreen from '../screens/HabitScreen';
import CreateHabit from '../screens/CreateHabit';
import StartHabitCreation from '../screens/StartHabitCreation';
import Settings from '../screens/Settings';
import ShowHabitEditModal from '../components/modalComponents/ShowHabitEditModal';
import { AntDesign, FontAwesome5, Fontisto } from '@expo/vector-icons';
import CalendarModal from '../components/modalComponents/CalendarModal';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TextStyle from '../utils/Text';
import { useColorMode, useColorModeValue } from 'native-base';

const Stack = createNativeStackNavigator();

const MainAppStack = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(async () => {
        try {
            const result = await AsyncStorage.getItem('@name');
            if (result !== null) {
                setName(result);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Stack.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                headerShown: true,
                gestureEnabled: true,
                headerTitleStyle: { color: '#FFFFFF', fontFamily: 'Bold', fontSize: 20 },
            }}
        >
            <Stack.Group>
                <Stack.Screen
                    name="Homepage"
                    options={() => ({
                        headerTransparent: true,
                        headerBlurEffect: useColorModeValue('systemUltraThinMaterialLight', 'dark'),
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontSize: 34,
                            fontWeight: '800',
                            color: useColorModeValue('black', 'white'),
                        },
                        title: `${name}'s Dashboard`,
                        headerTitleStyle: {
                            color: useColorModeValue('black', 'white'),
                        },
                        headerRight: () => (
                            <>
                                <TouchableOpacity
                                    onPress={toggleColorMode}
                                    style={{ marginRight: 20 }}
                                >
                                    {colorMode === 'dark' ? (
                                        <Fontisto name="sun" size={24} color="white" />
                                    ) : (
                                        <FontAwesome5 name="moon" size={24} color="black" />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('StartHabitCreation')}
                                >
                                    <AntDesign
                                        name="pluscircle"
                                        size={28}
                                        color={colors.mainGreen}
                                    />
                                </TouchableOpacity>
                            </>
                        ),
                    })}
                    component={Homepage}
                />
                <Stack.Screen
                    name="StartHabitCreation"
                    options={{
                        title: 'Add a Habit',
                        headerTitleStyle: {
                            color: useColorModeValue('black', 'white'),
                            fontFamily: 'Bold',
                            fontSize: 20,
                        },
                        headerBackTitleVisible: true,
                        headerTintColor: useColorModeValue('black', colors.mainGreen),
                        headerStyle: {
                            backgroundColor: useColorModeValue(colors.white, colors.mainBackground),
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
                        headerTintColor: useColorModeValue('black', colors.mainGreen),
                        headerStyle: {
                            backgroundColor: useColorModeValue(colors.white, colors.mainBackground),
                        },
                        headerTitleStyle: {
                            color: useColorModeValue('black', 'white'),
                            fontFamily: 'Bold',
                            fontSize: 20,
                        },
                    }}
                    component={HabitScreen}
                />
                <Stack.Screen
                    name="CreateHabit"
                    options={({ route }) => ({
                        headerBlurEffect: useColorModeValue('systemUltraThinMaterialLight', 'dark'),
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontSize: 26,
                            fontWeight: '800',
                            color: useColorModeValue('black', 'white'),
                        },
                        headerTransparent: true,
                        headerTintColor: useColorModeValue('black', colors.mainGreen),
                        headerBackTitleVisible: true,
                        title: route.params.name || route.params.habitName,
                        headerTitleStyle: {
                            color: useColorModeValue('black', 'white'),
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
                        headerTransparent: true,
                        headerBlurEffect: useColorModeValue('systemUltraThinMaterialLight', 'dark'),
                        title: route.params.data.name,
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontSize: 26,
                            fontWeight: '800',
                            color: useColorModeValue('black', 'white'),
                        },
                        headerTitleStyle: {
                            color: useColorModeValue('black', 'white'),
                            fontFamily: 'Bold',
                            fontSize: 18,
                        },
                        headerLeft: () => (
                            <Ionicons
                                name="chevron-down"
                                size={28}
                                color={useColorModeValue('black', colors.mainGreen)}
                                onPress={() => navigation.goBack()}
                            />
                        ),
                    })}
                    component={ShowHabitEditModal}
                />
                <Stack.Screen
                    name="CalendarModal"
                    options={({ route }) => ({
                        headerTransparent: true,
                        headerBlurEffect: useColorModeValue('systemUltraThinMaterialLight', 'dark'),
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontSize: 26,
                            fontWeight: '800',
                            color: useColorModeValue('black', 'white'),
                        },
                        title: route.params.data.name,
                        headerTitleStyle: {
                            color: useColorModeValue('black', 'white'),
                            fontFamily: 'Bold',
                            fontSize: 18,
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <TextStyle color={useColorModeValue('black', colors.mainGreen)}>
                                    Done
                                </TextStyle>
                            </TouchableOpacity>
                        ),
                        headerTintColor: colors.mainGreen,
                    })}
                    component={CalendarModal}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MainAppStack;
