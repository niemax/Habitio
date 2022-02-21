import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import { useHabits } from '../context/HabitProvider';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { Text, useColorModeValue, Flex, Center, HStack, Box, Spacer } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import CircularProgress from 'react-native-circular-progress-indicator';
import { MainContainer } from '../utils/StyledComponents/Styled';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const TotalProgressCircle = () => {
    const { weeklyHabits } = useHabits();

    const totalTimesWeeklyToDo = weeklyHabits
        ?.map((habit) => habit.times * habit.days)
        .reduce((acc, curr) => acc + curr, 0);
    console.log(totalTimesWeeklyToDo);

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
                value={weeklyHabits.length === 0 ? 0 : value}
                valueSuffix="%"
                radius={90}
                textColor={useColorModeValue('black', 'white')}
                maxValue={totalTimesWeeklyToDo}
                activeStrokeColor={totalTimesWeeklyToDo === 100 ? '#43E443' : colors.mainPurple}
                activeStrokeSecondaryColor={totalTimesWeeklyToDo === 100 ? '#43E4E4' : '#C25AFF'}
            />
        </Box>
    );
};

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { habits, weeklyHabits, monthlyHabits, getHabits, habitsLoading } = useHabits();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    const WEEKLY_HABITS_LENGTH = weeklyHabits.length;
    const MONTHLY_HABITS_LENGTH = monthlyHabits.length;

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
            visible={habitsLoading}
            textContent={'Loading habits...'}
            textStyle={{ color: useColorModeValue('', 'white') }}
            color={colors.mainPurple}
        />
    );

    if (habits.length === 0 && !habitsLoading)
        return (
            <Center mt={10} flex={1} bg={useColorModeValue(colors.white, colors.black)}>
                <Text fontWeight={800} fontSize="3xl" color={colors.mainPurple}>
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
                        tintColor={colors.mainPurple}
                        titleColor={colors.mainPurple}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={{ marginBottom: 10 }}
            >
                {habitsLoading ? (
                    renderContentLoader()
                ) : (
                    <>
                        <Center mt={40}>
                            <TotalProgressCircle />
                        </Center>
                        {renderHeader('weekly', 10)}
                        <Box>
                            {!habitsLoading &&
                                weeklyHabits?.map((item) => (
                                    <HabitListItem
                                        key={item.id}
                                        item={item}
                                        completed={item.completed}
                                    />
                                ))}
                        </Box>
                        {renderHeader('monthly', 10)}
                        <Box>
                            {!habitsLoading &&
                                monthlyHabits?.map((item) => (
                                    <HabitListItem
                                        key={item.id}
                                        item={item}
                                        completed={item.completed}
                                    />
                                ))}
                        </Box>
                    </>
                )}
            </ScrollView>
        </Flex>
    );
};

export default HomeScreen;
