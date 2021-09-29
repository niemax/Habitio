import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import ShowHabitModal from '../components/ShowHabitModal';
import { colors } from '../utils/colors';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import getCurrentDate from '../utils/helpers/currentDate';
import { haptics } from '../utils/helpers/haptics';
import {
    HomeheaderContainer,
    HomepageDataBox,
    HomepageDataView,
    HomepageImageView,
    HomepageTextContainer,
    HomepageTimesView,
    MainContainer,
    NoHabitsContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { color } from 'react-native-elements/dist/helpers';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Homepage() {
    const [habitData, setHabitData] = useState({});
    const [message, setMessage] = useState('');
    const [visibleItem, setVisibleItem] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [count, setCount] = useState(0);
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [date, setDate] = useState('');

    /*    useEffect(() => {
        const { date } = getCurrentDate();
        setDate(date);
    }, [date]); */

    const getData = async () => {
        const getDate = new Date();
        const currentDay = getDate.getDay();
        console.log(currentDay);
        try {
            const result = await AsyncStorage.getItem('@habit');
            let habits = [];
            if (result !== null) habits = JSON.parse(result);
            habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                }
                return habit;
            });
            setHabitData(habits);
            console.log(habitData);
        } catch (e) {
            console.error(e);
        }
    };

    const setProgress = (index) => {};

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getData();
        //AsyncStorage.clear();
    }, []);

    return (
        <MainContainer>
            <HomeheaderContainer>
                <HomepageTextContainer>
                    <Text left twentyEight fontFamily="Bold" marginLeft="15px">
                        Dashboard for
                    </Text>
                    <Text
                        twenty
                        color={colors.mainGreen}
                        fontFamily="SemiBold"
                        left
                        marginLeft="15px"
                    >
                        29. syyskuuta, 2021
                    </Text>
                </HomepageTextContainer>
                <TouchableOpacity>
                    <Feather
                        name="settings"
                        size={28}
                        color="white"
                        style={{ marginTop: 35, marginRight: 10 }}
                    />
                </TouchableOpacity>
            </HomeheaderContainer>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text twentyTwo fontFamily="Bold" marginTop="30px" marginLeft="15px" left>
                    Your Habits
                </Text>
                <HomepageDataView>
                    {/*   <NoabitsContainer>
                    {message && (
                            <Text marginBottom="55px" fontFamily="SemiBold" twentyEight>
                                {message}
                            </Text>
                            <Image
                                style={{ height: 215, width: 215 }}
                                source={require('../assets/flatIcons/healthy-lifestyle.png')}
                            />
                            )}
                            </NoabitsContainer> */}

                    {Object.values(habitData).map((item, index) => {
                        const id = index.toString();

                        return (
                            <HomepageDataBox
                                key={id}
                                onPress={() => {
                                    setVisibleItem(id);
                                    haptics.selection();
                                }}
                                onLongPress={() => {
                                    haptics.selection();
                                    setToolTipVisible(true);
                                }}
                                style={{
                                    borderBottomWidth: 5,
                                    borderBottomColor: `${item.color}`,
                                }}
                            >
                                <Text
                                    marginBottom="15px"
                                    twentyTwo
                                    color={colors.mainGreen}
                                    fontFamily="SemiBold"
                                >
                                    {item.times > 1 && count}
                                    {item.times > 1 && (
                                        <Text
                                            twentyTwo
                                            color={colors.mainGreen}
                                            fontFamily="SemiBold"
                                        >
                                            /
                                        </Text>
                                    )}
                                    {item.times > 1 && item.times}
                                </Text>
                                {/*  <Menu
                                    containerStyle={{ backgroundColor: 'black' }}
                                    visible={toolTipVisible}
                                >
                                    <MenuTrigger text="Select " />
                                    <MenuOptions>
                                        <MenuOption
                                            onSelect={() => alert(`Save`)}
                                            text={
                                                !item.completed === true
                                                    ? 'mark as completed'
                                                    : 'Not done'
                                            }
                                        />
                                        <MenuOption onSelect={() => alert(`Delete`)}>
                                            <Text style={{ color: 'red' }}>Delete</Text>
                                        </MenuOption>
                                        <MenuOption
                                            onSelect={() => alert(`Not called`)}
                                            disabled={true}
                                            text="Disabled"
                                        />
                                    </MenuOptions>
                                </Menu> */}
                                <Image style={{ height: 45, width: 45 }} source={item.icon} />
                                <Text
                                    fontFamily="SemiBold"
                                    marginTop="15px"
                                    twentyTwo
                                    marginLeft="5px"
                                >
                                    {!item.completed ? (
                                        item.name
                                    ) : (
                                        <Text color={colors.mainGreen} twenty fontFamily="Bold">
                                            Done{' '}
                                            <Feather
                                                name="check"
                                                size={28}
                                                color={colors.mainGreen}
                                            />
                                        </Text>
                                    )}
                                </Text>

                                <ShowHabitModal
                                    data={item}
                                    modalVisible={visibleItem === id}
                                    setModalVisible={setVisibleItem}
                                />
                            </HomepageDataBox>
                        );
                    })}
                </HomepageDataView>
            </ScrollView>
            <HomepageImageView>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../assets/flatIcons/bonsai.png')}
                />
            </HomepageImageView>
        </MainContainer>
    );
}
