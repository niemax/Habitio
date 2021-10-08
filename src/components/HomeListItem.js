import React, { useRef } from 'react';
import { KeyboardAvoidingView, Image } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Modalize } from 'react-native-modalize';
import * as Progress from 'react-native-progress';
import { Feather } from '@expo/vector-icons';
import TextStyle from '../utils/Text';
import { haptics } from '../utils/helpers/haptics';
import { habitBoxShadow, homepageBoxShadow } from '../utils/globalStyles';
import {
    DiaryInput,
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
    LeftAction,
} from '../utils/StyledComponents/Styled';
import ShowHabitModal from './ShowHabitModal';
import { colors } from '../utils/colors';

export default function HomeListItem({
    item,
    index,
    modalizeRef,
    handleDoneToday,
    progressNumber,
    addProgressBar,
    extractProgressBar,
    progress,
    addProgress,
    extractProgress,
    visibleItem,
    setVisibleItem,
    completed,
    setCompleted,
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
                    <TextStyle marginLeft="25px" fontFamily="SemiBold">
                        {!item.completed ? (
                            item.name
                        ) : (
                            <TextStyle color={item.color} twenty fontFamily="SemiBold">
                                <Feather name="check" size={24} color="white" />
                                Done
                            </TextStyle>
                        )}
                    </TextStyle>
                    <ItemTimesContainer>
                        <TextStyle color={item.color} marginLeft="10px" fontFamily="Extra" twenty>
                            {item.times > 1 && progressNumber}
                            {item.times > 1 && <TextStyle color={item.color}>/</TextStyle>}
                            {item.times > 1 && item.times}
                        </TextStyle>
                    </ItemTimesContainer>
                    {item.times > 1 && (
                        <Progress.Bar
                            style={{
                                position: 'absolute',
                                bottom: 1,
                                borderRadius: 15,
                            }}
                            progress={progress}
                            height={5}
                            width={159}
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
