import React, { useState, useEffect } from 'react';
import { Alert, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { showHabitImageBackground } from '../utils/globalStyles';
import { haptics } from '../utils/helpers/haptics';
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
import GestureRecognizer from 'react-native-swipe-gestures';

export default function ShowHabitModal({ modalVisible, setModalVisible, data, handleDoneToday }) {
    const [editHabitModalVisible, setEditHabitModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [prog, setProg] = useState(0);
    const [isEdit, setIsEdit] = useState(false);

    const { habits, habitSetter } = useHabits();

    const config = {
        velocityThreshold: 1.5,
        directionalOffsetThreshold: 50,
    };

    useEffect(() => {
        setProg(data.progress);
    }, []);

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

    const deleteHabit = (name) => {
        const newHabits = habits.filter((habit) => habit.id !== data.id);
        cancelPushNotification(data.notificationId);
        setModalVisible(false);
        habitSetter(newHabits);
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
        <GestureRecognizer config={config} onSwipeDown={() => setModalVisible(false)}>
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
                                    source={
                                        data.icon
                                            ? data.icon
                                            : require('../assets/flatIcons/morning-routine.png')
                                    }
                                />
                            </View>
                            {/* {data.description !== '' && <Text>{data.description.toString()}</Text>} */}
                            <Text fontFamily="Bold" marginTop="15px" twentyFour>
                                {data.name}
                            </Text>
                        </ShowHabitDataContainer>
                        <Text marginTop="10px" color="gray">
                            {data.description}
                        </Text>
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
                    </ScrollView>
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
                </ModalContent>
            </Modal>
        </GestureRecognizer>
    );
}
