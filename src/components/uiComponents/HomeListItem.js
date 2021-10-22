import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Progress from 'react-native-progress';
import TextStyle from '../../utils/Text';
import { haptics } from '../../utils/helpers/haptics';
import { progressBarStyle } from '../../utils/globalStyles';
import {
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
} from '../../utils/StyledComponents/Styled';
import ShowHabitModal from '../modalComponents/ShowHabitModal';
import ProgressModal from '../modalComponents/ProgressModal';
import { LeftActions, RightActions } from '../uiComponents/SwipeableActions';
import HabitCompletedStatusText from './HabitCompletedStatusText';

export default function HomeListItem({
    item,
    index,
    handleDoneToday,
    visibleItem,
    setVisibleItem,
}) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [prog, setProg] = useState(0);
    const swipeableRef = useRef(null);
    const { completedDates, icon, completed, times, color, name, unitValue, id } = item;

    const renderLeftActions = () => <LeftActions item={item} />;
    const renderRightActions = () => (
        <RightActions swipeableRef={swipeableRef} prog={prog} setProg={setProg} item={item} />
    );

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
            renderLeftActions={renderLeftActions}
            renderRightActions={times > 1 && renderRightActions}
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
                        source={icon ? icon : require('../../assets/flatIcons/activity.png')}
                    />
                    <HabitCompletedStatusText name={name} completed={completed} color={color} />

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
