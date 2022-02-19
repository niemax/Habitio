import React, { useState, useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { colors } from '../utils/colors';
import { useHabits } from '../context/HabitProvider';
import { HomepageDataView } from '../utils/StyledComponents/Styled';
import ContentLoader, { Rect } from 'react-content-loader/native';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { Text, useColorModeValue, Flex, Center, HStack, Box, Spacer } from 'native-base';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { habits, getHabits, habitsLoading } = useHabits();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    const HABITS_LENGTH = habits.length;

    const renderHeader = () => (
        <HStack px={4} mt={40}>
            <Box>
                <Text fontWeight={800} fontSize="xl">
                    Your Habits{' '}
                    <Text opacity={0.6} fontWeight={400} fontSize="sm">
                        ({HABITS_LENGTH})
                    </Text>
                </Text>
            </Box>
            <Spacer />
        </HStack>
    );

    const renderContentLoader = () =>
        habitsLoading &&
        Array.from(Array(HABITS_LENGTH)).map((_, index) => (
            <Center key={index.toString()}>
                <View style={{ marginTop: 30 }}>
                    <ContentLoader
                        height={80}
                        width={350}
                        speed={2}
                        backgroundColor="#333"
                        foregroundColor="#999"
                        viewBox="0 0 340 60"
                    >
                        <Rect x="0" y="5" rx="10" ry="10" width="30" height="30" />
                        <Rect x="40" y="15" rx="5" ry="4" width="100%" height="20" />
                        <Rect x="40" y="00" rx="10" ry="0" width="40" height="6" />
                    </ContentLoader>
                </View>
            </Center>
        ));

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
                {renderHeader()}
                {Object.keys(habits).length <= 0 && (
                    <Center mt={10}>
                        <Text fontWeight={800} fontSize="3xl" color={colors.mainPurple}>
                            No habits yet
                        </Text>
                    </Center>
                )}
                {renderContentLoader()}
                <HomepageDataView>
                    {!habitsLoading &&
                        habits?.map((item) => (
                            <HabitListItem key={item.id} item={item} completed={item.completed} />
                        ))}
                </HomepageDataView>
            </ScrollView>
        </Flex>
    );
};

export default HomeScreen;
