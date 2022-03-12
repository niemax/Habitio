import React, { useState, useCallback } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useHabits } from '../context/HabitProvider';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { Text, useColorModeValue, Flex, Center, HStack, Box, Spacer } from 'native-base';
import CircularProgress from 'react-native-circular-progress-indicator';
import useSettings from '../hooks/useSettings';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const TotalProgressCircle = () => {
    const { dailyHabits } = useHabits();

    const { colors } = useSettings();

    const totalTimesWeeklyToDo = dailyHabits
        ?.map((habit) => habit.times)
        .reduce((acc, curr) => acc + curr, 0);

    const value = dailyHabits
        ?.map((habit) => habit.timesDoneThisWeek)
        .reduce((acc, curr) => acc + curr, 0);

    return (
        <Box mt={4}>
            <CircularProgress
                inActiveStrokeColor={useColorModeValue('#F9F9F9', colors.mainBackground)}
                inActiveStrokeWidth={24}
                activeStrokeWidth={24}
                duration={1200}
                value={!dailyHabits?.length ? 0 : (value / totalTimesWeeklyToDo) * 100}
                valueSuffix="%"
                radius={100}
                textStyle={{ fontSize: 32, fontWeight: '800' }}
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
    const { habits, weeklyHabits, monthlyHabits, dailyHabits, getHabits, habitsLoading } =
        useHabits();

    const { colors } = useSettings();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    const WEEKLY_HABITS_LENGTH = weeklyHabits.length;
    const MONTHLY_HABITS_LENGTH = monthlyHabits.length;
    const DAILY_HABITS_LENGTH = dailyHabits.length;

    const getSpecificHabitsLengthByFrequency = (frequency) => {
        switch (frequency) {
            case 'daily':
                return DAILY_HABITS_LENGTH;
                break;
            case 'weekly':
                return WEEKLY_HABITS_LENGTH;
                break;
            case 'monthly':
                return MONTHLY_HABITS_LENGTH;
                break;
        }
    };

    const renderHeader = (frequency, marginTop) => (
        <HStack px={4} mt={marginTop}>
            <Box>
                <Text fontWeight={800} fontSize="xl">
                    {frequency} habits{' '}
                    <Text opacity={0.6} fontWeight={400} fontSize="sm">
                        ({getSpecificHabitsLengthByFrequency(frequency)})
                    </Text>
                </Text>
            </Box>
            <Spacer />
        </HStack>
    );

    const renderContentLoader = () => (
        <Center flex={1} mt={40}>
            <ActivityIndicator size="small" color={colors.mainColor} />
        </Center>
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
                contentInsetAdjustmentBehavior="automatic"
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
                    <Box mb={20}>
                        <Center>
                            <TotalProgressCircle />
                        </Center>
                        <Box>{!!dailyHabits.length && renderHeader('daily', 10)}</Box>
                        <Box>
                            {!!dailyHabits.length &&
                                dailyHabits?.map((item) => (
                                    <HabitListItem
                                        key={item.id}
                                        item={item}
                                        completed={item.completed}
                                    />
                                ))}
                        </Box>
                        <Box>{!!weeklyHabits.length && renderHeader('weekly', 10)}</Box>
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
                    </Box>
                )}
            </ScrollView>
        </Flex>
    );
};

export default HomeScreen;
