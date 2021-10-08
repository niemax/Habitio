import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Image, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { haptics } from '../utils/helpers/haptics';
import { Feather } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { useHabits } from '../context/HabitProvider';
import {
    AddDiaryModalHeaderContainer,
    DiaryInput,
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
import { habitBoxShadow, noHabitsImageStyle } from '../utils/globalStyles';
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
    const [toolTipVisible, setToolTipVisible] = useState();
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [progressNumber, setProgressNumber] = useState(0);
    const [date, setDate] = useState();
    const [diaryInput, setDiaryInput] = useState('');

    const navigation = useNavigation();

    const animation = useRef(null);
    const modalizeRef = useRef(null);
    const { habitSetter, getHabits, habits } = useHabits();

    const addProgressBar = (increment) => {
        setProgress(progress + increment);
    };

    const extractProgressBar = (decrement) => {
        setProgress(progress - decrement);
    };

    const addProgress = (increment) => {
        setProgressNumber(progressNumber + increment);
    };

    const extractProgress = (decrement) => {
        setProgressNumber(progressNumber - decrement);
    };

    const getData = async () => {
        try {
            getHabits();
            const checkedHabits = habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                } else console.log('false');
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
                if (habit.name === item.name) {
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

        haptics.selection();
        try {
            const updatedHabits = habits.filter((habit) => {
                const completedDatesObj = { ...habit.completedDates };

                if (!(newDate in completedDatesObj)) {
                    completedDatesObj[newDate] = {
                        selected: true,
                        marked: true,
                        customStyles: {
                            container: {
                                backgroundColor: colors.mainGreen,
                                height: 'auto',
                            },
                        },
                    };
                    if (habit.name === data.name) {
                        habit.currentDay = currentDay;
                        habit.completed = true;
                        habit.completedDates = completedDatesObj;
                        scheduleOneTimeWeekNotification(currentDay);
                        setTimeout(() => {
                            toasts.info(data.name, data.color, modalizeRef);
                            animation.current.play(30, 120);
                        }, 1200);

                        setTimeout(() => {
                            animation.current.reset();
                        }, 5000);
                    }
                    setCompleted(completed);
                } else {
                    delete completedDatesObj[newDate];
                    if (habit.name === data.name) {
                        habit.currentDay = currentDay;
                        habit.completed = false;
                        habit.completedDates = completedDatesObj;
                    }
                    haptics.warning();
                    setCompleted(!completed);
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
                style={{ marginBottom: 120, color: colors.mainGreen }}
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
                                handleDoneToday={handleDoneToday}
                                progressNumber={progressNumber}
                                addProgressBar={addProgressBar}
                                extractProgressBar={extractProgressBar}
                                progress={progress}
                                addProgress={addProgress}
                                extractProgress={extractProgress}
                                visibleItem={visibleItem}
                                setVisibleItem={setVisibleItem}
                                completed={completed}
                                setCompleted={setCompleted}
                            />
                            <Modalize
                                ref={modalizeRef}
                                data={item}
                                closeSnapPointStraightEnabled={false}
                                closeOnOverlayTap="false"
                                modalTopOffset={200}
                                keyboardAvoidingBehavior="height"
                                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                                snapPoint={430}
                                modalStyle={{
                                    backgroundColor: '#202020',
                                }}
                                HeaderComponent={
                                    <AddDiaryModalHeaderContainer>
                                        <Text
                                            fontFamily="Bold"
                                            twentyTwo
                                            left
                                            marginLeft="10px"
                                            marginTop="10px"
                                        >
                                            How did it go?
                                        </Text>
                                        <TouchableOpacity onPress={() => diaryInputHandler(item)}>
                                            <Feather
                                                name="check"
                                                size={36}
                                                color={colors.mainGreen}
                                            />
                                        </TouchableOpacity>
                                    </AddDiaryModalHeaderContainer>
                                }
                            >
                                <DiaryInput
                                    keyboardAppearance="dark"
                                    autoCorrect={false}
                                    autoFocus={true}
                                    multiline={true}
                                    placeholder="Write a reflection"
                                    placeholderTextColor="gray"
                                    style={{
                                        color: 'white',
                                        fontSize: 17,
                                        fontFamily: 'SemiBold',
                                        ...habitBoxShadow,
                                    }}
                                    onChangeText={(diaryText) => setDiaryInput(diaryText)}
                                />
                            </Modalize>
                        </>
                    ))}
                </HomepageDataView>
            </ScrollView>
        </MainContainer>
    );
};

export default HomepageData;
