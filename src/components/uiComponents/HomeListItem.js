import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
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
import ShowHabitModal from '../modalComponents/ShowHabitModal';
import ProgressModal from '../modalComponents/ProgressModal';
import { LeftActions, RightActions } from '../uiComponents/SwipeableActions';
import HabitCompletedStatusText from './HabitCompletedStatusText';
import { colors } from '../../utils/colors';

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
    const { completedDates, icon, completed, times, color, name, unitValue } = item;

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
                    {icon ? (
                        <Image style={{ height: 30, width: 30 }} source={icon} />
                    ) : (
                        <Feather
                            name="activity"
                            size={32}
                            color={color ? color : colors.mainGreen}
                        />
                    )}
                    <HabitCompletedStatusText name={name} completed={completed} color={color} />

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
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 4,
                                right: 4,
                                borderBottomRightRadius: 30,
                                borderBottomLeftRadius: 30,
                            }}
                            progress={!completed ? prog / times : 1}
                            height={4.5}
                            width={342}
                            color={color}
                            borderColor={colors.mainBoxes}
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
