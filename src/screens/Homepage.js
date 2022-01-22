import React, { useState, useCallback, useEffect } from 'react';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
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
import ContentLoader, { Rect } from 'react-content-loader/native';
import HabitListItem from '../components/uiComponents/HabitListItem';
import HomepageHeader from '../components/uiComponents/HomepageHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NameAlert from '../components/uiComponents/nameAlert';

const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

const Homepage = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [namePromptVisible, setNamePromptVisible] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const { habits, getHabits, habitsLoading } = useHabits();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    const fetchName = async () => {
        setLoading(true);
        try {
            const result = await AsyncStorage.getItem('@name');
            if (result !== null) {
                setName(result);
            } else {
                setNamePromptVisible(true);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchName();
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const HABITS_LENGTH = Object.keys(habits).length;

    return (
        <MainContainer>
            <NameAlert
                namePromptVisible={namePromptVisible}
                setNamePromptVisible={setNamePromptVisible}
                setName={setName}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        title="Release to refresh"
                        tintColor={colors.mainGreen}
                        titleColor={colors.mainGreen}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={{ marginBottom: 10 }}
            >
                <HomepageHeader name={name} loading={loading} />
                <Text twenty fontFamily="Bold" marginTop="30px" marginLeft="15px" left>
                    Your Habits{' '}
                    <Text fontFamily="Medium" color="gray">
                        ({HABITS_LENGTH})
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
                    {habitsLoading &&
                        Array.from(Array(HABITS_LENGTH)).map((_, index) => (
                            <View key={index.toString()} style={{ marginTop: 20 }}>
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
                        ))}
                    {!habitsLoading &&
                        habits?.map((item) => (
                            <HabitListItem item={item} completed={item.completed} />
                        ))}
                </HomepageDataView>
            </ScrollView>
            <TabAddButton onPress={() => navigation.navigate('StartHabitCreation')}>
                <Feather name="plus" size={36} color="white" />
            </TabAddButton>
        </MainContainer>
    );
};

export default Homepage;
