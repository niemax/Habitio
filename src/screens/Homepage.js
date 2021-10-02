import React, { useEffect, useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { Image, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import * as Progress from 'react-native-progress';
import ShowHabitModal from '../components/ShowHabitModal';
import { colors } from '../utils/colors';
import { haptics } from '../utils/helpers/haptics';
import {
    HomeheaderContainer,
    HomepageDataBox,
    HomepageDataView,
    HomepageImageView,
    HomepageTextContainer,
    MainContainer,
    NoHabitsContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import TooltipBlurView from '../components/TooltipBlurView';
import { homepageBoxShadow, noHabitsImageStyle } from '../utils/globalStyles';
import getCurrentDate from '../utils/helpers/currentDate';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Homepage({ navigation }) {
    const [visibleItem, setVisibleItem] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [toolTipVisible, setToolTipVisible] = useState();
    const [progress, setProgress] = useState(0);
    const [progressNumber, setProgressNumber] = useState(0);
    const [date, setDate] = useState();

    const { habitSetter, getHabits, habits } = useHabits();

    const addProgressBar = (increment) => {
        setProgress(progress + increment);
    };

    const extractProgressBar = (decrement) => {
        setProgress(progress - decrement);
    };

    const addProgress = (increment) => {
        setProgressNumber(progressNumber + increment);
    };

    const extractProgress = (decrement) => {
        setProgressNumber(progressNumber - decrement);
    };

    useEffect(() => {
        const { date } = getCurrentDate();
        setDate(date);
    }, [date]);

    const getData = async () => {
        const getDate = new Date();
        const currentDay = getDate.getDay();
        try {
            getHabits();
            const checkedHabits = habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                }
                return habit;
            });
            habitSetter(checkedHabits);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
        //AsyncStorage.removeItem('@habit');
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
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
                        {date}
                    </Text>
                </HomepageTextContainer>
                <TouchableOpacity onPress={() => navigation.push('Settings')}>
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
                style={{ marginBottom: 120, color: colors.mainGreen }}
            >
                <Text twentyTwo fontFamily="Bold" marginTop="30px" marginLeft="15px" left>
                    Your Habits
                </Text>
                <HomepageDataView>
                    {Object.values(habits).length <= 0 && (
                        <NoHabitsContainer>
                            <Text twenty fontFamily="MediumItalic">
                                No habits yet
                            </Text>
                            <Image
                                source={require('../assets/flatIcons/sloth.png')}
                                style={noHabitsImageStyle}
                            />
                            <Text marginBottom="45px" fontFamily="MediumItalic" marginTop="10px">
                                Create one below
                            </Text>
                            <Feather name="arrow-down" size={90} color="white" />
                        </NoHabitsContainer>
                    )}
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
                                style={homepageBoxShadow}
                            >
                                <Text
                                    marginBottom="15px"
                                    color={item.color}
                                    fontFamily="Extra"
                                    marginLeft="100px"
                                    twenty
                                >
                                    {item.times > 1 && progressNumber}
                                    {item.times > 1 && <Text color={item.color}>/</Text>}
                                    {item.times > 1 && item.times}
                                </Text>
                                <Image style={{ height: 50, width: 50 }} source={item.icon} />
                                <Text fontFamily="SemiBold" marginTop="6px" marginLeft="5px">
                                    {!item.completed ? (
                                        item.name
                                    ) : (
                                        <Text color={item.color} twenty fontFamily="SemiBold">
                                            Done
                                            <Feather name="check" size={24} color="white" />
                                        </Text>
                                    )}
                                </Text>
                                {item.times > 1 && (
                                    <Progress.Bar
                                        style={{ position: 'absolute', bottom: 1, borderRadius: 0 }}
                                        progress={progress}
                                        height={5}
                                        width={159}
                                        color={item.color}
                                        borderColor={colors.homepageProgress}
                                        borderWidth={0.2}
                                    />
                                )}

                                <Tooltip
                                    isVisible={toolTipVisible === id}
                                    contentStyle={{
                                        backgroundColor: '#101010',
                                        borderRadius: 15,
                                    }}
                                    content={<TooltipBlurView data={item} />}
                                    placement="center"
                                    backgroundColor="transparent"
                                    onClose={() => setToolTipVisible(false)}
                                />
                                <ShowHabitModal
                                    data={item}
                                    progressNumber={progressNumber}
                                    addProgressBar={addProgressBar}
                                    extractProgressBar={extractProgressBar}
                                    addProgress={addProgress}
                                    extractProgress={extractProgress}
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
