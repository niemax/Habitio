import React, { useRef, useState } from 'react';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Progress from 'react-native-progress';
import TextStyle from '../../utils/Text';
import { haptics } from '../../utils/helpers/haptics';
import {
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
} from '../../utils/StyledComponents/Styled';
import ProgressModal from '../modalComponents/ProgressModal';
import { LeftActions, RightActions } from '../uiComponents/SwipeableActions';
import HabitCompletedStatusText from './HabitCompletedStatusText';
import { colors } from '../../utils/colors';
import { progressBar } from '../../utils/globalStyles';
import { useNavigation } from '@react-navigation/core';
import handleDoneToday from '../../utils/helpers/handleDone';
import { useHabits } from '../../context/HabitProvider';
import DoneCheckBox from './DoneCheckBox';

export default function HomeListItem({ item, completedDay }) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [prog, setProg] = useState(0);
    const swipeableRef = useRef(null);

    const { completedDates, icon, completed, times, color, name, unitValue } = item;

    const navigation = useNavigation();
    const { habits, habitSetter } = useHabits();

    // come back to these!
    /*  const renderLeftActions = () => <LeftActions item={item} />;

    const renderRightActions = () => (
        <RightActions swipeableRef={swipeableRef} prog={prog} setProg={setProg} item={item} />
    );

    const handleSwipeLeft = () => {
        const { length } = Object.keys(completedDates);
        handleDoneToday(item, habits, completedDay, habitSetter);
        if (length % 4 === 0 && completed === false && length > 1) {
            setProgressModalVisible(true);
        }
        swipeableRef.current.close();
    }; */

    return (
        <HomepageDataView>
            <HomepageDataBox
                onPress={() => {
                    navigation.navigate('ShowHabitModal', {
                        data: item,
                    });
                    haptics.selection();
                }}
            >
                <View>
                    <DoneCheckBox item={item} completedDay={completedDay} />
                </View>
                <View style={{ marginLeft: 2 }}>
                    {icon ? (
                        <Image style={{ height: 30, width: 30 }} source={icon} />
                    ) : (
                        <Feather
                            name="activity"
                            size={32}
                            color={color ? color : colors.mainGreen}
                        />
                    )}
                </View>
                <View>
                    <HabitCompletedStatusText
                        name={name}
                        completed={completed}
                        color={color}
                        data={item}
                    />
                </View>
                <ItemTimesContainer>
                    <TextStyle color={color} marginLeft="10px" fontFamily="Bold" twenty>
                        {times > 1 && (
                            <TextStyle fontFamily="Extra" color={color} twenty>
                                {!completed ? prog : times}
                            </TextStyle>
                        )}
                        {times > 1 && (
                            <TextStyle
                                fontFamily="Regular"
                                twenty
                                color={color}
                                style={{ opacity: 0.8 }}
                            >
                                {''}/{''}
                            </TextStyle>
                        )}
                        {times > 1 && (
                            <TextStyle
                                twenty
                                fontFamily="Regular"
                                color={color}
                                style={{ opacity: 0.8 }}
                            >
                                {times}
                            </TextStyle>
                        )}
                    </TextStyle>

                    <TextStyle sixteen fontFamily="Medium">
                        {times > 1 && unitValue}
                    </TextStyle>
                </ItemTimesContainer>
                {times > 1 && (
                    <Progress.Bar
                        style={progressBar}
                        progress={!completed ? prog / times : 1}
                        height={3}
                        width={Dimensions.get('window').width - 10}
                        color={color}
                        borderColor="transparent"
                    />
                )}

                <ProgressModal
                    data={item}
                    progressModalVisible={progressModalVisible}
                    setProgressModalVisible={setProgressModalVisible}
                />
            </HomepageDataBox>
        </HomepageDataView>
    );
}
