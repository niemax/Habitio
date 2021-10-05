import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Image, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import * as Progress from 'react-native-progress';
import { colors } from '../utils/colors';
import { haptics } from '../utils/helpers/haptics';
import {
    HomeheaderContainer,
    HomepageDataBox,
    HomepageDataView,
    HomepageTextContainer,
    MainContainer,
    NoHabitsContainer,
} from '../utils/StyledComponents/Styled';
import { Feather } from '@expo/vector-icons';
import Text from '../utils/Text';
import { useHabits } from '../context/HabitProvider';
import TooltipBlurView from './TooltipBlurView';
import { getCurrentDate } from '../utils/helpers/currentDate';
import { getAllNotifications } from '../utils/helpers/notification';
import { homepageBoxShadow, noHabitsImageStyle } from '../utils/globalStyles';
import ShowHabitModal from './ShowHabitModal';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import { format } from 'date-fns';
import { toasts } from '../utils/helpers/toastMethods';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomepageData = ({ navigation }) => {
    const [visibleItem, setVisibleItem] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [toolTipVisible, setToolTipVisible] = useState();
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [progressNumber, setProgressNumber] = useState(0);
    const [shoot, setShoot] = useState(false);
    const [date, setDate] = useState();

    const animation = useRef(null);

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

    const getData = async () => {
        const getDate = new Date();
        const currentDay = getDate.getDay();
        try {
            getHabits();
            const checkedHabits = habits.map((habit) => {
                if (currentDay > habit.currentDay) {
                    habit.completed = false;
                } else console.log('false');
                return habit;
            });
            habitSetter(checkedHabits);
        } catch (e) {
            console.error(e);
        }
        console.log(Object.keys(habits).length);
    };
    const handleDoneToday = async (data, completed) => {
        haptics.success();
        try {
            const updatedHabits = habits.filter((habit) => {
                const completedDatesObj = { ...habit.completedDates };
                const newDate = format(new Date(), 'yyyy-MM-dd');
                const day = new Date();
                const currentDay = day.getDay();

                completedDatesObj[newDate] = {
                    selected: true,
                    marked: true,
                    customStyles: {
                        container: {
                            backgroundColor: colors.mainGreen,
                            height: 'auto',
                        },
                    },
                };
                if (habit.name === data.name) {
                    habit.currentDay = currentDay;
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                }

                return habit;
            });
            habitSetter(updatedHabits);
        } catch (e) {
            console.error(e);
        }
        setTimeout(() => {
            toasts.info(data.name, data.color);
            animation.current.play(30, 120);
        }, 1200);

        setTimeout(() => {
            animation.current.reset();
        }, 5000);

        setCompleted(completed);
    };

    useEffect(() => {
        getData();
        const { date } = getCurrentDate();
        setDate(date);
        getAllNotifications();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getHabits();
        wait(200).then(() => setRefreshing(false));
    }, []);

    return (
        <MainContainer>
            <LottieView
                style={{ marginBottom: 250 }}
                ref={animation}
                source={require('../assets/lottiejson/lf30_editor_oxsrznpw.json')}
            />
            <HomeheaderContainer>
                <HomepageTextContainer>
                    <TouchableOpacity onPress={() => setShoot(true)}>
                        <Text left twentyEight fontFamily="Extra" marginLeft="15px">
                            Dashboard for
                        </Text>
                    </TouchableOpacity>
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
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
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
                    Your Habits{' '}
                    <Text fontFamily="Medium" color="gray">
                        ({Object.keys(habits).length})
                    </Text>
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
                                Add one below
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
                                            <Feather name="check" size={24} color="white" />
                                            Done
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
                                    content={
                                        <TooltipBlurView
                                            data={item}
                                            handleDoneToday={handleDoneToday}
                                        />
                                    }
                                    placement="center"
                                    backgroundColor="transparent"
                                    onClose={() => setToolTipVisible(false)}
                                />
                                <ShowHabitModal
                                    data={item}
                                    handleDoneToday={handleDoneToday}
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
        </MainContainer>
    );
};

export default HomepageData;
