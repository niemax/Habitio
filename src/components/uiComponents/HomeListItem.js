import React, { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import TextStyle from '../../utils/Text';
import { haptics } from '../../utils/helpers/haptics';
import {
    HomepageDataBox,
    HomepageDataView,
    ItemTimesContainer,
} from '../../utils/StyledComponents/Styled';
import ProgressModal from '../modalComponents/ProgressModal';
import HabitCompletedStatusText from './HabitCompletedStatusText';
import Dialog from 'react-native-dialog';
import { colors } from '../../utils/colors';
import { progressBar } from '../../utils/globalStyles';
import { useNavigation } from '@react-navigation/core';
import handleDoneToday from '../../utils/helpers/handleDone';
import { useHabits } from '../../context/HabitProvider';
import DoneCheckBox from './DoneCheckBox';

export default function HomeListItem({ item, completedDay }) {
    const [progressModalVisible, setProgressModalVisible] = useState(false);
    const [prog, setProg] = useState(0);
    const [inputText, setInputText] = useState(0);
    const [visible, setVisible] = useState(false);
    const { icon, completed, times, progress, color, name, unitValue, id } = item;
    const navigation = useNavigation();
    const { habits, habitSetter } = useHabits();

    const handleProgress = (operand) => {
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                if (operand === '+') {
                    habit.progress += Number(inputText);
                } else {
                    habit.progress -= Number(inputText);
                }
            }
            return habit;
        });
        habitSetter(mapped);
        setVisible(false);
        setInputText('');
    };

    /*  const handleProgressIncrement = () => {
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                habit.progress += Number(inputText);
            }
            return habit;
        });
        setProg(prog + Number(inputText));
        habitSetter(mapped);
        setVisible(false);
        setInputText('');
    }; */

    return (
        <HomepageDataView>
            <HomepageDataBox
                onLongPress={() => handleDoneToday(item, habits, completedDay, habitSetter)}
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
                        <Image style={{ height: 35, width: 35 }} source={icon} />
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
                <ItemTimesContainer onPress={() => setVisible(true)}>
                    <TextStyle color={color} marginLeft="10px" fontFamily="Bold" twenty>
                        {times > 1 && (
                            <TextStyle fontFamily="Extra" color={color} twenty>
                                {progress}
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
                        progress={!completed ? progress / times : 1}
                        height={3}
                        width={Dimensions.get('window').width - 10}
                        color={color}
                        borderColor="transparent"
                    />
                )}
                <Dialog.Container visible={visible}>
                    <Dialog.Title>Add Progress</Dialog.Title>
                    <Dialog.Input
                        autoFocus={true}
                        placeholder="Amount"
                        keyboardType="numeric"
                        onChangeText={(text) => setInputText(text)}
                    />
                    <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
                    <Dialog.Button label="-" onPress={() => handleProgress('-')} />
                    <Dialog.Button label="+" onPress={() => handleProgress('+')} />
                </Dialog.Container>
                <ProgressModal
                    data={item}
                    progressModalVisible={progressModalVisible}
                    setProgressModalVisible={setProgressModalVisible}
                />
            </HomepageDataBox>
        </HomepageDataView>
    );
}
