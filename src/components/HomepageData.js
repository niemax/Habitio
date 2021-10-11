import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Image, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { haptics } from '../utils/helpers/haptics';
import { Feather } from '@expo/vector-icons';
import { useHabits } from '../context/HabitProvider';
import {
    HomeheaderContainer,
    HomepageDataView,
    HomepageTextContainer,
    MainContainer,
    NoHabitsContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { getCurrentDate } from '../utils/helpers/currentDate';
import {
    getAllNotifications,
    scheduleOneTimeWeekNotification,
} from '../utils/helpers/notification';
import { noHabitsImageStyle } from '../utils/globalStyles';
import LottieView from 'lottie-react-native';
import { format } from 'date-fns';
import { toasts } from '../utils/helpers/toastMethods';
import { useNavigation } from '@react-navigation/core';
import HomeListItem from './HomeListItem';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const day = new Date();
const currentDay = day.getDay();

const HomepageData = () => {
    const [visibleItem, setVisibleItem] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [prog, setProg] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [progressNumber, setProgressNumber] = useState(0);
    const [date, setDate] = useState();
    const [diaryInput, setDiaryInput] = useState('');

    const navigation = useNavigation();

    const animation = useRef(null);
    const modalizeRef = useRef(null);
    const { habitSetter, getHabits, habits } = useHabits();

    const getData = async () => {
        try {
            getHabits();
            const checkedHabits = habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                }
                setProg(habits.progress);
                return habit;
            });
            habitSetter(checkedHabits);
        } catch (e) {
            console.error(e);
        }
    };

    const diaryInputHandler = (item) => {
        const diaryInputObj = {
            date: day,
            input: diaryInput,
        };
        try {
            const updatedHabits = habits.filter((habit) => {
                if (habit.id === item.id) {
                    habit.diaryInputs.push(diaryInputObj);
                }
                return habit;
            });
            habitSetter(updatedHabits);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDoneToday = async (data, completed) => {
        const newDate = format(new Date(), 'yyyy-MM-dd');

        haptics.success();
        try {
            const updatedHabits = habits.filter((habit) => {
                const completedDatesObj = { ...habit.completedDates };

                if (!(newDate in completedDatesObj)) {
                    completedDatesObj[newDate] = {
                        selected: true,
                        marked: false,
                        customStyles: {
                            container: {
                                backgroundColor: colors.mainGreen,
                                height: 33,
                            },
                        },
                    };
                    if (habit.name === data.name) {
                        habit.currentDay = currentDay;
                        habit.completed = true;
                        habit.completedDates = completedDatesObj;
                        setCompleted(true);
                        scheduleOneTimeWeekNotification(currentDay);
                        setTimeout(() => {
                            toasts.info(data.name, data.color, modalizeRef);
                            animation.current.play(30, 120);
                        }, 1200);

                        setTimeout(() => {
                            animation.current.reset();
                        }, 5000);
                    }
                } else {
                    delete completedDatesObj[newDate];
                    if (habit.name === data.name) {
                        habit.currentDay = currentDay;
                        habit.completed = false;
                        habit.completedDates = completedDatesObj;
                        setCompleted(false);
                    }
                    haptics.warning();
                }
                return habit;
            });
            habitSetter(updatedHabits);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
        const { date } = getCurrentDate();
        setDate(date);
        getAllNotifications();
        //deleteNotifications();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    return (
        <MainContainer>
            <LottieView
                style={{ marginBottom: 250 }}
                ref={animation}
                source={require('../assets/lottiejson/lf30_editor_oxsrznpw.json')}
            />
            <HomeheaderContainer>
                <HomepageTextContainer>
                    <TouchableOpacity>
                        <Text left twentyEight fontFamily="Extra" marginLeft="15px">
                            Dashboard for
                        </Text>
                    </TouchableOpacity>
                    <Text
                        twenty
                        color={colors.mainGreen}
                        fontFamily="SemiBold"
                        left
                        marginLeft="15px"
                    >
                        {date}
                    </Text>
                </HomepageTextContainer>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Feather
                        name="settings"
                        size={28}
                        color="white"
                        style={{ marginTop: 35, marginRight: 10 }}
                    />
                </TouchableOpacity>
            </HomeheaderContainer>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        title="Pull to refresh"
                        tintColor={colors.mainGreen}
                        titleColor={colors.mainGreen}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={{ marginBottom: 90 }}
            >
                <Text twentyTwo fontFamily="Bold" marginTop="30px" marginLeft="15px" left>
                    Your Habits{' '}
                    <Text fontFamily="Medium" color="gray">
                        ({Object.keys(habits).length})
                    </Text>
                </Text>
                <HomepageDataView>
                    {Object.values(habits).length <= 0 && (
                        <NoHabitsContainer>
                            <Text twenty fontFamily="MediumItalic">
                                No habits yet
                            </Text>
                            <Image
                                source={require('../assets/flatIcons/sloth.png')}
                                style={noHabitsImageStyle}
                            />
                            <Text marginBottom="45px" fontFamily="MediumItalic" marginTop="10px">
                                Add one below
                            </Text>
                            <Feather name="arrow-down" size={90} color="white" />
                        </NoHabitsContainer>
                    )}
                    {Object.values(habits).map((item, index) => (
                        <>
                            <HomeListItem
                                item={item}
                                index={index.toString()}
                                modalizeRef={modalizeRef}
                                diaryInputHandler={diaryInputHandler}
                                handleDoneToday={handleDoneToday}
                                visibleItem={visibleItem}
                                setVisibleItem={setVisibleItem}
                                completed={completed}
                                setCompleted={setCompleted}
                            />
                        </>
                    ))}
                </HomepageDataView>
            </ScrollView>
        </MainContainer>
    );
};

export default HomepageData;
