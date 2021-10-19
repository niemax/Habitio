import React, { useState, useEffect, useRef } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
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
import { scheduleOneTimeWeekNotification } from '../utils/helpers/notification';
import { noHabitsImageStyle } from '../utils/globalStyles';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core';
import HomeListItem from './HomeListItem';
import handleDoneToday from '../utils/helpers/handleDone';
import diaryInputHandler from '../utils/helpers/diaryInputHandler';

const day = new Date();
const currentDay = day.getDay();

const HomepageData = () => {
    const [visibleItem, setVisibleItem] = useState();
    const [date, setDate] = useState();
    const [diaryInput] = useState('');

    const navigation = useNavigation();

    const animation = useRef(null);
    const modalizeRef = useRef(null);
    const { habitSetter, getHabits, habits } = useHabits();

    useEffect(() => {
        scheduleOneTimeWeekNotification(currentDay);
    }, []);

    useEffect(() => {
        getHabits();
        console.log(habits);
        try {
            const checkedHabits = habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                }
                return habit;
            });
            habitSetter(checkedHabits);
        } catch (e) {
            console.error(e);
        }
        const { date } = getCurrentDate();
        setDate(date);
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
            <ScrollView style={{ marginBottom: 90 }}>
                <Text twentyTwo fontFamily="Bold" marginTop="30px" marginLeft="15px" left>
                    Your Habits{' '}
                    <Text fontFamily="Medium" color="gray">
                        ({Object.keys(habits).length})
                    </Text>
                </Text>
                <HomepageDataView>
                    {Object.keys(habits).length <= 0 && (
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
                    {habits.map((item, index) => (
                        <HomeListItem
                            item={item}
                            index={index}
                            modalizeRef={modalizeRef}
                            handleDoneToday={() =>
                                handleDoneToday(
                                    item,
                                    habits,
                                    currentDay,
                                    modalizeRef,
                                    animation,
                                    habitSetter
                                )
                            }
                            visibleItem={visibleItem}
                            setVisibleItem={setVisibleItem}
                            completed={item.completed}
                        />
                    ))}
                </HomepageDataView>
            </ScrollView>
        </MainContainer>
    );
};

export default HomepageData;
