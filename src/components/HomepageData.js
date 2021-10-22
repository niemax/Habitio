import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
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
import { noHabitsImageStyle } from '../utils/globalStyles';
import { useNavigation } from '@react-navigation/core';
import HomeListItem from './HomeListItem';
import handleDoneToday from '../utils/helpers/handleDone';
import { getAllNotifications } from '../utils/helpers/notification';
import checkDateForHabitCompletedReset from '../utils/helpers/checkHabitsDate';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomepageData = () => {
    const [visibleItem, setVisibleItem] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [date, setDate] = useState();
    const navigation = useNavigation();
    const animation = useRef(null);
    const modalizeRef = useRef(null);
    const { habitSetter, getHabits, habits } = useHabits();

    const day = new Date();
    const currentDay = day.getDay();

    useEffect(() => {
        checkDateForHabitCompletedReset(getHabits, habitSetter, habits, currentDay);
        const { date } = getCurrentDate();
        setDate(date);
        getAllNotifications();
    }, [currentDay]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    return (
        <MainContainer>
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
                            index={index.toString()}
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
