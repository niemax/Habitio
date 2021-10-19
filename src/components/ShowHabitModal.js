import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useHabits } from '../context/HabitProvider';
import { colors } from '../utils/colors';
import { showHabitImageBackground } from '../utils/globalStyles';
import {
    cancelPushNotification,
    scheduleOneTimeEdit,
    scheduleRepeatingEdit,
} from '../utils/helpers/notification';
import {
    HomeheaderContainer,
    LineBreak,
    ModalContent,
    ShowHabitDataContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import ShowHabitEditModal from './ShowHabitEditModal';
import ShowHabitActions from './ShowHabitActions';
import deleteHabit from '../utils/helpers/deleteHabit';
import { setISODay } from 'date-fns';

export default function ShowHabitModal({ modalVisible, setModalVisible, data, handleDoneToday }) {
    const [editHabitModalVisible, setEditHabitModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState();

    const { notificationId, name, color, icon, description, days, times, unitValue } = data;

    const { habits, habitSetter } = useHabits();

    const config = {
        velocityThreshold: 1.5,
        directionalOffsetThreshold: 50,
    };

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

        if (habitReminderTime !== null) {
            const { identifier } = scheduleRepeatingEdit(
                parsedReminderTimeHour,
                parsedReminderTimeMinute,
                habitName
            ).then(() => {
                setId(identifier);
            });
        }
        if (habitSpecificDate !== null) {
            const { identifier } = scheduleOneTimeEdit(habitSpecificDate, habitName).then(() => {
                setId(identifier);
            });
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
                habit.notificationId = id;
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
                                        width: 70,
                                        height: 70,
                                        borderBottomWidth: 5,
                                        borderRadius: 15,
                                        borderBottomColor: color,
                                    }}
                                    source={
                                        icon
                                            ? icon
                                            : require('../assets/flatIcons/morning-routine.png')
                                    }
                                />
                            </View>
                            {/* {data.description !== '' && <Text>{data.description.toString()}</Text>} */}
                            <Text fontFamily="Bold" marginTop="15px" twentyFour>
                                {name}
                            </Text>
                        </ShowHabitDataContainer>
                        <Text marginTop="10px" color="gray">
                            {description}
                        </Text>
                        <Text marginTop="35px" twenty marginLeft="15px" left fontFamily="Medium">
                            {days === 7 ? (
                                <Text twenty marginLeft="15px" left fontFamily="Medium">
                                    Every day
                                </Text>
                            ) : (
                                days !== null && (
                                    <Text twenty marginLeft="15px" left fontFamily="Medium">
                                        {days} times weekly
                                    </Text>
                                )
                            )}
                        </Text>
                        <LineBreak />
                        {times !== null && (
                            <Text marginLeft="15px" left twenty fontFamily="Medium">
                                {times} {unitValue} per day
                            </Text>
                        )}

                        <LineBreak />
                        <ShowHabitActions
                            states={{ calendarModalVisible }}
                            actions={{ handleDoneToday, displayDeleteAlert }}
                            setters={{ setModalVisible, setCalendarModalVisible }}
                            data={data}
                        />
                    </ScrollView>

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
