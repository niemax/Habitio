import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { showHabitImageBackground } from '../utils/globalStyles';
import { haptics } from '../utils/helpers/haptics';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import * as Notifications from 'expo-notifications';
import { cancelPushNotification } from '../utils/helpers/notification';
import { toasts } from '../utils/helpers/toastMethods';
import {
    HomeheaderContainer,
    LineBreak,
    ModalContent,
    ProgressBarContainer,
    ShowHabitActionsAddButton,
    ShowHabitActionsAddContainer,
    ShowHabitActionsButton,
    ShowHabitActionsContainer,
    ShowHabitDataContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import CalendarModal from './CalendarModal';
import ShowHabitEditModal from './ShowHabitEditModal';

export default function ShowHabitModal({
    modalVisible,
    setModalVisible,
    data,
    addProgress,
    addProgressBar,
    extractProgress,
    extractProgressBar,
    progressNumber,
    handleDoneToday,
}) {
    const [editHabitModalVisible, setEditHabitModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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
        const parsedReminderTimeHour = habitReminderTime !== null && habitReminderTime.getHours();
        const parsedReminderTimeMinute =
            habitReminderTime !== null && habitReminderTime.getMinutes();
        /* const parsedSpecificHours = habitSpecificDate !== null && habitSpecificDate.getHours();
        const parsedSpecificMinutes = habitSpecificDate !== null && habitSpecificDate.getMinutes();

        const currentReminderTimeHours = data.reminderTime?.getHours();
        const currentReminderTimeMinutes = data.reminderTime?.getMinutes();
        const currentSpecificTimeHours = data.specificDate?.getHours();
        const currentSpecificTimeMinutes = data.specificDate?.getMinutes(); */

        cancelPushNotification(data.notificationId).then(() => {
            console.log(`Successfully removed notification with id: ${data.notificationId}`);
        });

        if (habitReminderTime !== null && daysCount > 1)
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: habitName,
                    body: `Time to be productive! Your daily reminder to ${habitName}`,
                },
                trigger: {
                    hour: parsedReminderTimeHour,
                    minute: parsedReminderTimeMinute,
                    repeats: true,
                },
            });
        if (habitSpecificDate !== null)
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: habitName,
                    body: `Your reminder for ${habitName}`,
                },
                trigger: {
                    date: habitSpecificDate,
                    repeats: false,
                },
            });

        const newHabits = habits.filter((habit) => {
            if (habit.name === data.name) {
                habit.name = habitName;
                habit.unitValue = unitValue;
                habit.color = color;
                habit.description = description;
                habit.days = daysCount;
                habit.times = timesCount;
                habit.reminder = habitReminderTime !== null ? habitReminderTime : null;
                habit.specificDate = habitSpecificDate !== null ? habitSpecificDate : null;
            }
            return habit;
        });
        habitSetter(newHabits);
    };

    const deleteHabit = (name, color) => {
        const newHabits = habits.filter((habit) => habit.id !== data.id);
        habitSetter(newHabits);

        cancelPushNotification(data.notificationId);
        setTimeout(() => {
            setModalVisible(false);
        }, 1500);
        toasts.error(name);
    };

    const displayDeleteAlert = (data) => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit? Action cannot be undone.',
            [
                { text: 'OK', onPress: () => deleteHabit(data.name) },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <GestureRecognizer onSwipeDown={() => setModalVisible(false)}>
            <Modal animationType="slide" presentationStyle="pageSheet" visible={modalVisible}>
                <ModalContent>
                    <ScrollView>
                        <HomeheaderContainer>
                            <TouchableOpacity
                                style={{ marginLeft: 10, marginTop: 10 }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Ionicons name="close-circle-sharp" size={34} color="gray" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsEdit(true);
                                    setEditHabitModalVisible(true);
                                }}
                            >
                                <Text
                                    twenty
                                    marginRight="15px"
                                    color={colors.mainGreen}
                                    fontFamily="SemiBold"
                                >
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </HomeheaderContainer>
                        <ShowHabitDataContainer>
                            <View style={showHabitImageBackground}>
                                <Image
                                    style={{
                                        width: 90,
                                        height: 90,
                                        borderBottomWidth: 10,
                                        borderRadius: 15,
                                        borderBottomColor: data.color,
                                    }}
                                    source={data.icon}
                                />
                            </View>
                            {/* {data.description !== '' && <Text>{data.description.toString()}</Text>} */}
                            <Text fontFamily="SemiBold" marginTop="15px" twentyEight>
                                {data.name}
                            </Text>
                        </ShowHabitDataContainer>
                        <Text marginTop="10px" color="gray">
                            {data.description}
                        </Text>
                        <ProgressBarContainer>
                            {data.times > 1 && (
                                <Text fontFamily="Extra" color={data.color} twentyTwo>
                                    {progressNumber} / {data.times}
                                </Text>
                            )}
                        </ProgressBarContainer>
                        <Text marginTop="35px" twenty marginLeft="15px" left fontFamily="Medium">
                            {data.days === 7 ? (
                                <Text twenty marginLeft="15px" left fontFamily="Medium">
                                    Every day
                                </Text>
                            ) : (
                                data.days !== null && (
                                    <Text twenty marginLeft="15px" left fontFamily="Medium">
                                        {data.days} times weekly
                                    </Text>
                                )
                            )}
                        </Text>
                        <LineBreak />
                        {data.times !== null && (
                            <Text marginLeft="15px" left twenty fontFamily="Medium">
                                {data.times} {data.unitValue} per day
                            </Text>
                        )}
                        <LineBreak />
                        <ShowHabitActionsAddContainer>
                            {data.times > 1 && (
                                <>
                                    <ShowHabitActionsAddButton
                                        onPress={() => {
                                            haptics.selection();
                                            extractProgress(1);
                                            extractProgressBar(
                                                data.times / data.times / data.times
                                            );
                                        }}
                                        style={{ backgroundColor: data.color }}
                                    >
                                        <Text fontFamily="Bold" twentyEight>
                                            -1
                                        </Text>
                                    </ShowHabitActionsAddButton>
                                    <ShowHabitActionsAddButton
                                        onPress={() => {
                                            haptics.selection();
                                            addProgress(1);
                                            addProgressBar(data.times / data.times / data.times);
                                        }}
                                        style={{ backgroundColor: data.color }}
                                    >
                                        <Text fontFamily="Bold" twentyEight>
                                            +1
                                        </Text>
                                    </ShowHabitActionsAddButton>
                                </>
                            )}
                        </ShowHabitActionsAddContainer>
                        <ShowHabitActionsContainer>
                            <ShowHabitActionsButton
                                onPress={() => {
                                    handleDoneToday(data, true);
                                    setTimeout(() => {
                                        setModalVisible(false);
                                    }, 1000);
                                }}
                            >
                                {!data.completed ? (
                                    <Text fontFamily="SemiBold" twenty>
                                        Done for Today
                                    </Text>
                                ) : (
                                    <Text color={colors.error}>Mark as Undone</Text>
                                )}
                            </ShowHabitActionsButton>
                            <ShowHabitActionsButton onPress={() => setCalendarModalVisible(true)}>
                                <Text fontFamily="SemiBold" twenty>
                                    Show Details
                                </Text>
                            </ShowHabitActionsButton>
                            <TouchableOpacity onPress={displayDeleteAlert}>
                                <Text
                                    color={colors.error}
                                    marginTop="25px"
                                    fontFamily="Bold"
                                    twenty
                                >
                                    Delete Habit
                                </Text>
                            </TouchableOpacity>
                        </ShowHabitActionsContainer>

                        <CalendarModal
                            data={data}
                            calendarModalVisible={calendarModalVisible}
                            setCalendarModalVisible={setCalendarModalVisible}
                        />

                        <ShowHabitEditModal
                            data={data}
                            isEdit={isEdit}
                            onSubmit={handleUpdate}
                            editHabitModalVisible={editHabitModalVisible}
                            setEditHabitModalVisible={setEditHabitModalVisible}
                        />
                    </ScrollView>
                </ModalContent>
            </Modal>
        </GestureRecognizer>
    );
}
