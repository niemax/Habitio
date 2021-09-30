import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import ShowHabitModal from '../components/ShowHabitModal';
import { colors } from '../utils/colors';
import Tooltip from 'react-native-walkthrough-tooltip';
import { haptics } from '../utils/helpers/haptics';
import {
    HomeheaderContainer,
    HomepageDataBox,
    HomepageDataView,
    HomepageImageView,
    HomepageTextContainer,
    MainContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import TooltipBlurView from '../components/TooltipBlurView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Homepage() {
    const [visibleItem, setVisibleItem] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [count, setCount] = useState(0);
    const [toolTipVisible, setToolTipVisible] = useState();
    const [date, setDate] = useState('');

    const { getHabits, habits } = useHabits();

    /*    useEffect(() => {
        const { date } = getCurrentDate();
        setDate(date);
    }, [date]); */

    const getData = async () => {
        const getDate = new Date();
        const currentDay = getDate.getDay();
        try {
            getHabits();
            habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                }
                return habit;
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
        wait(200).then(() => setRefreshing(false));
    }, []);

    return (
        <MainContainer>
            <HomeheaderContainer>
                <HomepageTextContainer>
                    <Text left twentyEight fontFamily="Extra" marginLeft="15px">
                        Dashboard for
                    </Text>
                    <Text
                        twenty
                        color={colors.mainGreen}
                        fontFamily="SemiBold"
                        left
                        marginLeft="15px"
                    >
                        1. lokakuuta, 2021
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
                    {Object.values(habits).map((item, index) => {
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
                                    setToolTipVisible(id);
                                }}
                                style={{
                                    borderBottomWidth: 5,
                                    borderBottomColor: `${item.color}`,
                                }}
                            >
                                <Text
                                    marginBottom="15px"
                                    color={colors.mainGreen}
                                    fontFamily="SemiBold"
                                    marginLeft="100px"
                                >
                                    {item.times > 1 && count}
                                    {item.times > 1 && <Text color={colors.mainGreen}>/</Text>}
                                    {item.times > 1 && item.times}
                                </Text>
                                <Image style={{ height: 50, width: 50 }} source={item.icon} />
                                <Text fontFamily="SemiBold" marginTop="15px" marginLeft="5px">
                                    {!item.completed ? (
                                        item.name
                                    ) : (
                                        <Text color={colors.mainGreen} twenty fontFamily="Bold">
                                            Done
                                            <Feather
                                                name="check"
                                                size={24}
                                                color={colors.mainGreen}
                                            />
                                        </Text>
                                    )}
                                </Text>

                                <Tooltip
                                    isVisible={toolTipVisible === id}
                                    contentStyle={{ backgroundColor: '#101010', borderRadius: 15 }}
                                    content={<TooltipBlurView data={item} />}
                                    placement="center"
                                    backgroundColor="transparent"
                                    onClose={() => setToolTipVisible(false)}
                                />
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
                {/* <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../assets/flatIcons/bonsai.png')}
                /> */}
            </HomepageImageView>
        </MainContainer>
    );
}
