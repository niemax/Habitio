import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Progress from 'react-native-progress';
import { Feather } from '@expo/vector-icons';
import TextStyle from '../utils/Text';
import { haptics } from '../utils/helpers/haptics';
import { progressBarStyle } from '../utils/globalStyles';
import {
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
    LeftAction,
    RightAction,
    TextNameAndStatus,
} from '../utils/StyledComponents/Styled';
import ShowHabitModal from './ShowHabitModal';
import { colors } from '../utils/colors';
import ProgressModal from './ProgressModal';
import { Fragment } from 'react';

export default function HomeListItem({
    item,
    index,
    handleDoneToday,
    visibleItem,
    setVisibleItem,
}) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [prog, setProg] = useState(0);
    const LeftActions = () => (
        <LeftAction style={{ backgroundColor: item.completed ? colors.error : colors.mainGreen }}>
            {item.completed ? (
                <Feather name="x" size={48} color="white" style={{ marginLeft: 70 }} />
            ) : (
                <Feather name="check" size={42} color="white" style={{ marginLeft: 90 }} />
            )}
        </LeftAction>
    );

    const RightActions = () => (
        <Fragment>
            <RightAction
                onPress={() => {
                    haptics.selection();
                    swipeableRef.current.close();
                    setTimeout(() => {
                        setProg((prevProg) => prevProg + 1);
                    }, 500);
                }}
                style={{ backgroundColor: item.color }}
            >
                <TextStyle fontFamily="SemiBold" twentyEight>
                    +1
                </TextStyle>
            </RightAction>
            <RightAction
                onPress={() => {
                    haptics.selection();
                    swipeableRef.current.close();
                    setTimeout(() => {
                        prog > 0 && setProg((prevProg) => prevProg - 1);
                    }, 500);
                }}
                style={{ backgroundColor: item.color, marginRight: 7 }}
            >
                <TextStyle fontFamily="SemiBold" twentyEight>
                    -1
                </TextStyle>
            </RightAction>
            {item.times > 10 && (
                <RightAction
                    onPress={() => {
                        haptics.selection();
                        swipeableRef.current.close();
                        setTimeout(() => {
                            prog <= item.times && setProg((prevProg) => prevProg + 5);
                        }, 500);
                    }}
                    style={{ backgroundColor: item.color, marginRight: 7 }}
                >
                    <TextStyle twentyEight fontFamily="SemiBold">
                        +5
                    </TextStyle>
                </RightAction>
            )}
            {item.times > 10 && (
                <RightAction
                    onPress={() => {
                        haptics.selection();
                        swipeableRef.current.close();
                        setTimeout(() => {
                            prog <= item.times && setProg((prevProg) => prevProg - 5);
                        }, 500);
                    }}
                    style={{ backgroundColor: item.color, marginRight: 7 }}
                >
                    <TextStyle twentyEight fontFamily="SemiBold">
                        -5
                    </TextStyle>
                </RightAction>
            )}
        </Fragment>
    );

    const swipeableRef = useRef(null);
    const { completedDates, icon, completed, times, color, name, unitValue, id } = item;
    return (
        <Swipeable
            key={name}
            ref={swipeableRef}
            onSwipeableLeftOpen={() => {
                const length = Object.keys(completedDates).length;
                handleDoneToday(item).then(() => {
                    if (length % 2 === 0 && completed === false && length >= 2) {
                        setProgressModalVisible(true);
                    }
                });
                swipeableRef.current.close();
            }}
            renderLeftActions={LeftActions}
            renderRightActions={times > 1 && RightActions}
        >
            <HomepageDataView>
                <HomepageDataBox
                    onPress={() => {
                        setVisibleItem(index);
                        haptics.selection();
                    }}
                >
                    <Image
                        style={{ height: 37, width: 37 }}
                        source={icon ? icon : require('../assets/flatIcons/activity.png')}
                    />
                    <TextNameAndStatus>
                        <TextStyle left marginLeft="15px" fontFamily="SemiBold">
                            {name}
                        </TextStyle>
                        {completed ? (
                            <TextStyle
                                left
                                fifteen
                                marginTop="5px"
                                marginLeft="11px"
                                fontFamily="Medium"
                                style={{ opacity: 0.7 }}
                            >
                                <Feather name="check" size={15} color={color} />
                                Done
                            </TextStyle>
                        ) : (
                            <TextStyle
                                left
                                fifteen
                                marginTop="5px"
                                marginLeft="12px"
                                fontFamily="Medium"
                                style={{ opacity: 0.7 }}
                            >
                                <Feather name="x" size={15} color={color} />
                                Not done
                            </TextStyle>
                        )}
                    </TextNameAndStatus>

                    <ItemTimesContainer>
                        <TextStyle color={color} marginLeft="10px" fontFamily="Bold" twenty>
                            {times > 1 && (
                                <TextStyle fontFamily="Extra" color={color} twenty>
                                    {prog}
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
                            style={progressBarStyle}
                            progress={prog / times}
                            height={3}
                            width={338}
                            color={color}
                            borderColor="transparent"
                            borderWidth={0.2}
                        />
                    )}

                    <ShowHabitModal
                        data={item}
                        handleDoneToday={handleDoneToday}
                        modalVisible={visibleItem === index}
                        setModalVisible={setVisibleItem}
                        progressModalVisible={progressModalVisible}
                        setProgressModalVisible={setProgressModalVisible}
                    />
                    <ProgressModal
                        data={item}
                        progressModalVisible={progressModalVisible}
                        setProgressModalVisible={setProgressModalVisible}
                    />
                </HomepageDataBox>
            </HomepageDataView>
        </Swipeable>
    );
}
