import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { Text, useColorModeValue, Flex, Center, HStack, Box, Spacer } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getAllNotifications } from '../utils/helpers/notification';
import useSettings from '../hooks/useSettings';
import { useMoods } from '../context/MoodProvider';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const TotalProgressCircle = () => {
    const { weeklyHabits } = useHabits();

    const { colors } = useSettings();

    const totalTimesWeeklyToDo = weeklyHabits
        ?.map((habit) => habit.times * habit.days)
        .reduce((acc, curr) => acc + curr, 0);

    const value = weeklyHabits
        ?.map((habit) => habit.timesDoneThisWeek)
        .reduce((acc, curr) => acc + curr, 0);

    return (
        <Box mt={4}>
            <CircularProgress
                inActiveStrokeColor={useColorModeValue('#F9F9F9', colors.mainBackground)}
                inActiveStrokeWidth={24}
                activeStrokeWidth={24}
                duration={800}
                value={!weeklyHabits.length ? 0 : (value / totalTimesWeeklyToDo) * 100}
                valueSuffix="%"
                radius={95}
                textColor={useColorModeValue('black', 'white')}
                maxValue={100}
                activeStrokeColor={value === totalTimesWeeklyToDo ? '#43E443' : colors.mainColor}
                activeStrokeSecondaryColor={value === totalTimesWeeklyToDo ? '#43E4E4' : '#C25AFF'}
            />
        </Box>
    );
};

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { habits, weeklyHabits, monthlyHabits, oneTimerHabits, getHabits, habitsLoading } =
        useHabits();

    const { colors } = useSettings();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    const WEEKLY_HABITS_LENGTH = weeklyHabits.length;
    const MONTHLY_HABITS_LENGTH = monthlyHabits.length;

    useEffect(() => {
        getAllNotifications();
    }, []);

    const renderHeader = (frequency, marginTop) => (
        <HStack px={4} mt={marginTop}>
            <Box>
                <Text fontWeight={800} fontSize="xl">
                    {frequency} habits{' '}
                    <Text opacity={0.6} fontWeight={400} fontSize="sm">
                        ({frequency === 'weekly' ? WEEKLY_HABITS_LENGTH : MONTHLY_HABITS_LENGTH})
                    </Text>
                </Text>
            </Box>
            <Spacer />
        </HStack>
    );

    const renderContentLoader = () => (
        <Spinner
            size="small"
            visible={habitsLoading}
            textContent={'Loading...'}
            textStyle={{
                color: useColorModeValue('black', 'white'),
                fontSize: 16,
                fontWeight: '400',
            }}
            color={colors.mainColor}
        />
    );

    if (!habits.length && !habitsLoading)
        return (
            <Center mt={10} flex={1} bg={useColorModeValue(colors.white, colors.black)}>
                <Text fontWeight={800} fontSize="3xl" color={colors.mainColor}>
                    No habits yet
                </Text>
            </Center>
        );

    return (
        <Flex flex={1} bg={useColorModeValue(colors.white, colors.black)}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        title="Release to refresh"
                        tintColor={colors.mainColor}
                        titleColor={colors.mainColor}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {habitsLoading ? (
                    renderContentLoader()
                ) : (
                    <Box>
                        <Center mt={40}>
                            <TotalProgressCircle />
                        </Center>
                        <Box>{renderHeader('weekly', 10)}</Box>
                        <Box>
                            {!!weeklyHabits.length &&
                                weeklyHabits?.map((item) => (
                                    <HabitListItem
                                        key={item.id}
                                        item={item}
                                        completed={item.completed}
                                    />
                                ))}
                        </Box>
                        <Box>{!!monthlyHabits.length && renderHeader('monthly', 10)}</Box>
                        <Box>
                            {monthlyHabits?.map((item) => (
                                <HabitListItem
                                    key={item.id}
                                    item={item}
                                    completed={item.completed}
                                />
                            ))}
                        </Box>
                        <Box>{!!oneTimerHabits.length && renderHeader('one timer', 10)}</Box>
                        <Box mb={40}>
                            {!!oneTimerHabits.length &&
                                oneTimerHabits?.map((item) => (
                                    <HabitListItem
                                        key={item.id}
                                        item={item}
                                        completed={item.completed}
                                    />
                                ))}
                        </Box>
                    </Box>
                )}
            </ScrollView>
        </Flex>
    );
};

export default HomeScreen;
