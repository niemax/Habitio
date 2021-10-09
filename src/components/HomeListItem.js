import React, { useRef, useEffect, useState } from 'react';
import { Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Progress from 'react-native-progress';
import { Feather } from '@expo/vector-icons';
import TextStyle from '../utils/Text';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Modalize } from 'react-native-modalize';
import { haptics } from '../utils/helpers/haptics';
import { homepageBoxShadow } from '../utils/globalStyles';
import {
    AddDiaryModalHeaderContainer,
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
    LeftAction,
    TextNameAndStatus,
} from '../utils/StyledComponents/Styled';
import ShowHabitModal from './ShowHabitModal';
import { colors } from '../utils/colors';

export default function HomeListItem({
    item,
    index,
    handleDoneToday,
    progressNumber,
    addProgressBar,
    extractProgressBar,
    progress,
    addProgress,
    extractProgress,
    visibleItem,
    setVisibleItem,
    modalizeRef,
}) {
    const LeftActions = () => (
        <LeftAction style={{ backgroundColor: item.completed ? colors.error : colors.mainGreen }}>
            {item.completed ? (
                <Feather name="x" size={48} color="white" />
            ) : (
                <Feather name="check" size={48} color="white" />
            )}
        </LeftAction>
    );
    const swipeableRef = useRef(null);
    return (
        <Swipeable
            key={index}
            ref={swipeableRef}
            onSwipeableLeftOpen={() => {
                handleDoneToday(item);
                swipeableRef.current.close();
            }}
            renderLeftActions={LeftActions}
        >
            <HomepageDataView>
                <HomepageDataBox
                    key={index}
                    onPress={() => {
                        setVisibleItem(index);
                        haptics.selection();
                    }}
                    style={homepageBoxShadow}
                >
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={
                            item.icon
                                ? item.icon
                                : require('../assets/flatIcons/morning-routine.png')
                        }
                    />
                    <TextNameAndStatus>
                        <TextStyle left marginLeft="25px" fontFamily="SemiBold">
                            {item.name}
                        </TextStyle>
                        {item.completed ? (
                            <TextStyle
                                left
                                sixteen
                                marginLeft="25px"
                                fontFamily="SemiBold"
                                style={{ opacity: 0.6 }}
                            >
                                <Feather name="check" size={18} color={colors.mainGreen} />
                                Done
                            </TextStyle>
                        ) : (
                            <TextStyle
                                left
                                marginLeft="25px"
                                sixteen
                                fontFamily="SemiBold"
                                style={{ opacity: 0.6 }}
                            >
                                <Feather name="x" size={18} color={colors.error} />
                                Not done
                            </TextStyle>
                        )}
                    </TextNameAndStatus>

                    <ItemTimesContainer>
                        <TextStyle color={item.color} marginLeft="10px" fontFamily="Bold" twenty>
                            {item.times > 1 && progressNumber}
                            {item.times > 1 && <TextStyle color={item.color}>/</TextStyle>}
                            {item.times > 1 && item.times}
                        </TextStyle>
                        <TextStyle fontFamily="Regular">{item.unitValue}</TextStyle>
                    </ItemTimesContainer>
                    {item.times > 1 && (
                        <Progress.Bar
                            style={{
                                position: 'absolute',
                                bottom: 1,
                            }}
                            progress={progress}
                            height={4}
                            width={348}
                            color={item.color}
                            borderColor={colors.homepageProgress}
                            borderWidth={0.2}
                        />
                    )}

                    <ShowHabitModal
                        data={item}
                        handleDoneToday={handleDoneToday}
                        progressNumber={progressNumber}
                        addProgressBar={addProgressBar}
                        extractProgressBar={extractProgressBar}
                        addProgress={addProgress}
                        extractProgress={extractProgress}
                        modalVisible={visibleItem === index}
                        setModalVisible={setVisibleItem}
                    />
                </HomepageDataBox>
            </HomepageDataView>
        </Swipeable>
    );
}
