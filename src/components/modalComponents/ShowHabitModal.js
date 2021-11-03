import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHabits } from '../../context/HabitProvider';
import { showHabitImage, showHabitImageBackground } from '../../utils/globalStyles';
import {
    cancelPushNotification,
    scheduleOneTimeEdit,
    scheduleRepeatingEdit,
} from '../../utils/helpers/notification';
import {
    HabitHeaderLineBreak,
    ModalContent,
    ShowHabitDataContainer,
} from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import ShowHabitHeader from '../uiComponents/ShowHabitHeader';
import ShowHabitActions from '../uiComponents/ShowHabitActions';
import deleteHabit from '../../utils/helpers/deleteHabit';
import { HabitFrequency } from '../uiComponents/HabitFrequency';
import { colors } from '../../utils/colors';

export default function ShowHabitModal({ route, navigation }) {
    const { data } = route.params;
    const {
        notificationId,
        id,
        name,
        icon,
        description,
        days,
        times,
        unitValue,
        reminder,
        endDate,
        specificDate,
        color,
    } = data;

    const { habits, habitSetter } = useHabits();

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () =>
                        deleteHabit(
                            notificationId,
                            habits,
                            habitSetter,
                            cancelPushNotification,
                            data,
                            navigation
                        ),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <ModalContent>
            <ShowHabitHeader data={data} />
            <HabitHeaderLineBreak />
            <ScrollView>
                <ShowHabitDataContainer>
                    <View style={showHabitImageBackground}>
                        {icon ? (
                            <Image
                                style={{ height: 30, width: 30 }}
                                source={icon}
                                style={showHabitImage}
                            />
                        ) : (
                            <Feather
                                name="activity"
                                size={46}
                                color={color ? color : colors.mainGreen}
                            />
                        )}
                    </View>
                    <Text fontFamily="Bold" marginTop="15px" twentyFour>
                        {name}
                    </Text>
                </ShowHabitDataContainer>
                <HabitFrequency
                    description={description}
                    days={days}
                    times={times}
                    unitValue={unitValue}
                    reminder={reminder}
                    specificDate={specificDate}
                    endDate={endDate}
                    color={color}
                />
                <ShowHabitActions actions={{ displayDeleteAlert }} data={data} />
            </ScrollView>
        </ModalContent>
    );
}
