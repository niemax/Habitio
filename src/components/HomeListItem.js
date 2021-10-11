import React, { useRef, useState } from 'react';
import { Image, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Progress from 'react-native-progress';
import { Feather } from '@expo/vector-icons';
import TextStyle from '../utils/Text';
import { haptics } from '../utils/helpers/haptics';
import { homepageBoxShadow } from '../utils/globalStyles';
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

export default function HomeListItem({
    item,
    index,
    handleDoneToday,
    visibleItem,
    setVisibleItem,
}) {
    const [prog, setProg] = useState(0);
    const LeftActions = () => (
        <LeftAction style={{ backgroundColor: item.completed ? colors.error : colors.mainGreen }}>
            {item.completed ? (
                <Feather name="x" size={48} color="white" style={{ marginLeft: 70 }} />
            ) : (
                <Feather name="check" size={48} color="white" style={{ marginLeft: 70 }} />
            )}
        </LeftAction>
    );

    const RightActions = () => (
        <>
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
                <Feather name="plus" size={28} color="white" />
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
                <TextStyle fontFamily="Bold" twentyEight>
                    <Feather name="minus" size={28} color="white" />
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
                    <TextStyle twenty fontFamily="Bold">
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
                    <TextStyle twenty fontFamily="Bold">
                        -5
                    </TextStyle>
                </RightAction>
            )}
        </>
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
            renderRightActions={RightActions}
        >
            <HomepageDataView>
                <HomepageDataBox
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
                        <TextStyle left marginLeft="15px" fontFamily="Medium">
                            {item.name}
                        </TextStyle>
                        {item.completed ? (
                            <TextStyle
                                left
                                fifteen
                                marginTop="5px"
                                marginLeft="11px"
                                fontFamily="Medium"
                                style={{ opacity: 0.6 }}
                            >
                                <Feather name="check" size={15} color={colors.mainGreen} />
                                Done
                            </TextStyle>
                        ) : (
                            <TextStyle
                                left
                                marginTop="5px"
                                marginLeft="12px"
                                fifteen
                                fontFamily="Medium"
                                style={{ opacity: 0.6 }}
                            >
                                <Feather name="x" size={15} color={colors.error} />
                                Not done
                            </TextStyle>
                        )}
                    </TextNameAndStatus>

                    <ItemTimesContainer>
                        <TextStyle color={item.color} marginLeft="10px" fontFamily="Bold" twenty>
                            {item.times > 1 && (
                                <TextStyle fontFamily="Extra" color={item.color} twenty>
                                    {prog}
                                </TextStyle>
                            )}
                            {item.times > 1 && (
                                <TextStyle
                                    fontFamily="Regular"
                                    twenty
                                    color={item.color}
                                    style={{ opacity: 0.8 }}
                                >
                                    {''}/{''}
                                </TextStyle>
                            )}
                            {item.times > 1 && (
                                <TextStyle
                                    twenty
                                    fontFamily="Regular"
                                    color={item.color}
                                    style={{ opacity: 0.8 }}
                                >
                                    {item.times}
                                </TextStyle>
                            )}
                        </TextStyle>

                        <TextStyle sixteen fontFamily="Medium">
                            {item.times > 1 && item.unitValue}
                        </TextStyle>
                    </ItemTimesContainer>
                    {item.times > 1 && (
                        <Progress.Bar
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 6,
                                borderBottomLeftRadius: 25,
                                borderBottomRightRadius: 25,
                            }}
                            progress={prog / item.times}
                            height={3.5}
                            width={333}
                            color={item.color}
                            borderColor="transparent"
                            borderWidth={0.2}
                        />
                    )}

                    <ShowHabitModal
                        data={item}
                        handleDoneToday={handleDoneToday}
                        modalVisible={visibleItem === index}
                        setModalVisible={setVisibleItem}
                    />
                </HomepageDataBox>
            </HomepageDataView>
        </Swipeable>
    );
}
