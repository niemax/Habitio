import React, { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Popable } from 'react-native-popable';
import { useNavigation } from '@react-navigation/core';
import Text from '../../utils/Text';
import { haptics } from '../../utils/helpers/haptics';
import {
    AddProgressButton,
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
} from '../../utils/StyledComponents/Styled';
import ProgressModal from '../modalComponents/ProgressModal';
import HabitCompletedStatusText from './HabitCompletedStatusText';
import { colors } from '../../utils/colors';
import { progressBar } from '../../utils/globalStyles';
import { useHabits } from '../../context/HabitProvider';
import DoneCheckBox from './DoneCheckBox';

export default function HomeListItem({ item }) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const { icon, completed, times, progress, color, name, unitValue, id } = item;
    const navigation = useNavigation();
    const { habits, habitSetter } = useHabits();

    const handleHabitProgress = (operand) => {
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                habit.progress += operand;
            }
            return habit;
        });
        habitSetter(mapped);
    };

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
                <DoneCheckBox item={item} />
                <View style={{ marginLeft: 2 }}>
                    {icon ? (
                        <Image style={{ height: 25, width: 25 }} source={icon} />
                    ) : (
                        <Feather name="activity" size={32} color={color || colors.mainGreen} />
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
                    <Popable
                        animationType="spring"
                        position="left"
                        content={
                            <View style={{ padding: 4 }}>
                                <Text fifteen fontFamily="Medium">
                                    Progress
                                </Text>
                                <AddProgressButton
                                    onPress={() => handleHabitProgress(1)}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Feather name="plus" size={24} color="white" />
                                    <Text twentyTwo fontFamily="Extra">
                                        1
                                    </Text>
                                </AddProgressButton>
                                <AddProgressButton
                                    onPress={() => handleHabitProgress(Math.floor(times / 2))}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Feather name="plus" size={24} color="white" />
                                    <Text twentyTwo fontFamily="Extra">
                                        {Math.floor(times / 2)}
                                    </Text>
                                </AddProgressButton>
                                <AddProgressButton
                                    onPress={() => handleHabitProgress(-1)}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Feather name="minus" size={24} color="white" />
                                    <Text twentyTwo fontFamily="Extra">
                                        1
                                    </Text>
                                </AddProgressButton>
                            </View>
                        }
                    >
                        <Text color={color} marginLeft="10px" fontFamily="Bold" twenty>
                            {times > 1 && (
                                <>
                                    <Text fontFamily="Extra" color={color} twenty>
                                        {!completed ? progress : times}
                                    </Text>
                                    <Text
                                        fontFamily="Regular"
                                        twenty
                                        color={color}
                                        style={{ opacity: 0.8 }}
                                    >
                                        /
                                    </Text>
                                    <Text
                                        twenty
                                        fontFamily="Regular"
                                        color={color}
                                        style={{ opacity: 0.8 }}
                                    >
                                        {times}
                                    </Text>
                                </>
                            )}
                        </Text>
                        <Text sixteen fontFamily="Medium">
                            {times > 1 && unitValue}
                        </Text>
                    </Popable>
                </ItemTimesContainer>
                {times > 1 && (
                    <Progress.Bar
                        style={progressBar}
                        progress={!completed ? progress / times : 1}
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
