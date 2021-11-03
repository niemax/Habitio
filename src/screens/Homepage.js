import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Image, RefreshControl, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import { Feather } from '@expo/vector-icons';
import { useHabits } from '../context/HabitProvider';
import {
    HomepageDataView,
    MainContainer,
    NoHabitsContainer,
    TabAddButton,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { noHabitsImageStyle } from '../utils/globalStyles';
import HomeListItem from '../components/uiComponents/HomeListItem';
import { getAllNotifications } from '../utils/helpers/notification';
import checkDateForHabitCompletedReset from '../utils/helpers/checkHabitsDate';
import HomepageHeader from '../components/uiComponents/HomepageHeader';
import SplashScreen from './Splash';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomepageData = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { getHabits, habits } = useHabits();

    const day = new Date();
    const currentDay = day.getDay();

    useEffect(() => {
        getHabits();
        getAllNotifications();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(200).then(() => setRefreshing(false));
    }, []);

    return (
        <MainContainer>
            <HomepageHeader />
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
                    {habits?.map((item, index) => (
                        <HomeListItem
                            item={item}
                            index={index.toString()}
                            completed={item.completed}
                            completedDay={currentDay}
                        />
                    ))}
                </HomepageDataView>
            </ScrollView>
            <TabAddButton onPress={() => navigation.navigate('StartHabitCreation')}>
                <Feather name="plus" size={36} color="white" />
            </TabAddButton>
        </MainContainer>
    );
};

export default HomepageData;
