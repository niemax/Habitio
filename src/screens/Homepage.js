import React, { useState, useCallback } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { colors } from '../utils/colors';
import { useHabits } from '../context/HabitProvider';
import { HomepageDataView } from '../utils/StyledComponents/Styled';
import ContentLoader, { Rect } from 'react-content-loader/native';
import HabitListItem from '../components/uiComponents/HabitListItem';
import { Box, Text, useColorModeValue, Flex, Center, Wrap } from 'native-base';
const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const Homepage = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [_, setName] = useState('');
    const { habits, getHabits, habitsLoading } = useHabits();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    const HABITS_LENGTH = Object.keys(habits).length;

    return (
        <Box flex={1} bg={useColorModeValue(colors.white, colors.black)}>
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
                <Flex mt={40}>
                    <Text fontWeight={800} fontSize="xl" marginLeft="20px" mt={4}>
                        Your Habits{' '}
                        <Text opacity={0.6} fontSize="md">
                            ({HABITS_LENGTH})
                        </Text>
                    </Text>
                    {Object.keys(habits).length <= 0 && (
                        <Center mt={10}>
                            <Text fontWeight={800} fontSize="3xl" color={colors.mainPurple}>
                                No habits yet
                            </Text>
                        </Center>
                    )}
                    {habitsLoading &&
                        Array.from(Array(HABITS_LENGTH)).map((_, index) => (
                            <Center>
                                <View key={index.toString()} style={{ marginTop: 20 }}>
                                    <ContentLoader
                                        height={80}
                                        width="350px"
                                        speed={2}
                                        backgroundColor="#333"
                                        foregroundColor="#999"
                                        viewBox="0 0 340 60"
                                    >
                                        <Rect x="0" y="5" rx="10" ry="10" width="30" height="30" />
                                        <Rect
                                            x="40"
                                            y="15"
                                            rx="5"
                                            ry="4"
                                            width="100%"
                                            height="20"
                                        />
                                        <Rect x="40" y="00" rx="10" ry="0" width="40" height="6" />
                                    </ContentLoader>
                                </View>
                            </Center>
                        ))}
                    <HomepageDataView>
                        {!habitsLoading &&
                            habits?.map((item) => (
                                <HabitListItem
                                    key={item.id}
                                    item={item}
                                    completed={item.completed}
                                />
                            ))}
                    </HomepageDataView>
                </Flex>
            </ScrollView>
        </Box>
    );
};

export default Homepage;
