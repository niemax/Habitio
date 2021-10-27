import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useHabits } from '../../context/HabitProvider';
import { showHabitImage, showHabitImageBackground } from '../../utils/globalStyles';
import {
    cancelPushNotification,
    scheduleOneTimeEdit,
    scheduleRepeatingEdit,
} from '../../utils/helpers/notification';
import { ModalContent, ShowHabitDataContainer } from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
import ShowHabitEditModal from '../../components/modalComponents/ShowHabitEditModal';
import ShowHabitHeader from '../uiComponents/ShowHabitHeader';
import ShowHabitActions from '../uiComponents/ShowHabitActions';
import deleteHabit from '../../utils/helpers/deleteHabit';
import { HabitFrequency } from '../uiComponents/HabitFrequency';

const config = {
    velocityThreshold: 2,
    directionalOffsetThreshold: 80,
};

export default function ShowHabitModal({ modalVisible, setModalVisible, data, handleDoneToday }) {
    const [editHabitModalVisible, setEditHabitModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);

    const {
        notificationId,
        name,
        icon,
        description,
        days,
        times,
        unitValue,
        reminder,
        specificDate,
        color,
    } = data;

    const { habits, habitSetter } = useHabits();

    const handleUpdate = async (
        habitName,
        unitValue,
        color,
        description,
        daysCount,
        timesCount,
        habitReminderTime,
        habitSpecificDate
    ) => {
        cancelPushNotification(notificationId);
        const parsedReminderTimeHour = habitReminderTime !== null && habitReminderTime.getHours();
        const parsedReminderTimeMinute =
            habitReminderTime !== null && habitReminderTime.getMinutes();

        if (habitReminderTime !== null)
            scheduleRepeatingEdit(parsedReminderTimeHour, parsedReminderTimeMinute, habitName);
        if (habitSpecificDate !== null) {
            scheduleOneTimeEdit(habitSpecificDate, habitName).then(() => {});
        }

        const newHabits = habits.filter((habit) => {
            if (habit.name === name) {
                habit.name = habitName;
                habit.unitValue = unitValue;
                habit.color = color;
                habit.description = description;
                habit.days = daysCount;
                habit.times = timesCount;
                habit.reminder = habitReminderTime !== null ? habitReminderTime : null;
                habit.specificDate = habitSpecificDate !== null ? habitSpecificDate : null;
                habit.notificationId = notificationId;
            }
            return habit;
        });
        habitSetter(newHabits);
    };

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
                            setModalVisible,
                            data
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
        <GestureRecognizer config={config} onSwipeDown={() => setModalVisible(false)}>
            <Modal animationType="fade" presentationStyle="pageSheet" visible={modalVisible}>
                <ModalContent>
                    <ShowHabitHeader
                        setModalVisible={setModalVisible}
                        setEditHabitModalVisible={setEditHabitModalVisible}
                    />
                    <ScrollView>
                        <ShowHabitDataContainer>
                            <View style={showHabitImageBackground}>
                                <Image
                                    style={showHabitImage}
                                    source={
                                        icon ? icon : require('../../assets/flatIcons/activity.png')
                                    }
                                />
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
                            color={color}
                        />
                        <ShowHabitActions
                            states={{ calendarModalVisible }}
                            actions={{ handleDoneToday, displayDeleteAlert }}
                            setters={{ setModalVisible, setCalendarModalVisible }}
                            data={data}
                        />
                    </ScrollView>
                    <ShowHabitEditModal
                        data={data}
                        onSubmit={handleUpdate}
                        editHabitModalVisible={editHabitModalVisible}
                        setEditHabitModalVisible={setEditHabitModalVisible}
                    />
                </ModalContent>
            </Modal>
        </GestureRecognizer>
    );
}
