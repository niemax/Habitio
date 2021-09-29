import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import { showHabitImageBackground } from '../utils/globalStyles';
import Dialog from 'react-native-dialog';
import {
    HomeheaderContainer,
    LineBreak,
    ModalContent,
    ShowHabitActionsAddButton,
    ShowHabitActionsAddContainer,
    ShowHabitActionsButton,
    ShowHabitActionsButtonDelete,
    ShowHabitActionsContainer,
    ShowHabitDataContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import ShowHabitEditModal from './ShowHabitEditModal';
import { format } from 'date-fns';
import CalendarModal from './CalendarModal';
import { haptics } from '../utils/helpers/haptics';

export default function ShowHabitModal({ modalVisible, setModalVisible, data }) {
    const [editHabitModalVisible, setEditHabitModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [trackCompleted, setTrackCompleted] = useState([]);
    const [completed, setCompleted] = useState(false);

    const handleDoneToday = async () => {
        haptics.selection();
        try {
            const result = await AsyncStorage.getItem('@habit');
            let habits = [];
            if (result !== null) habits = JSON.parse(result);

            const updatedHabits = habits.filter((habit) => {
                const completedDatesObj = { ...habit.completedDates };
                const newDate = format(new Date(), 'yyyy-MM-dd');
                const day = new Date();
                const currentDay = day.getDay();

                // example: "Meditate", "Drink Water"
                completedDatesObj[newDate] = {
                    selected: true,
                    marked: true,
                    customStyles: {
                        container: {
                            backgroundColor: colors.mainGreen,
                            height: 'auto',
                        },
                    },
                };
                if (habit.name === data.name) {
                    habit.currentDay = currentDay;
                    habit.completed = true;
                    habit.completedDates = completedDatesObj;
                }

                return habit;
            });
            await AsyncStorage.setItem('@habit', JSON.stringify(updatedHabits));
        } catch (e) {
            console.error(e);
        }

        setCompleted(true);
    };

    const deleteHabit = async () => {
        const result = await AsyncStorage.getItem('@habits');
        let habits = [];
        if (result !== null) habits = JSON.parse(result);
        const newHabits = habits.filter((habit) => habit.name !== data.name);
        try {
            await AsyncStorage.setItem('@habit', JSON.stringify(newHabits));
            setModalVisible(false);
        } catch (error) {
            console.error(error);
        }
    };

    const displayDeleteAlert = () => {
        setDialogVisible(true);
    };

    return (
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
                        <TouchableOpacity onPress={() => setEditHabitModalVisible(true)}>
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
                    <Text marginTop="35px" twenty marginLeft="15px" left fontFamily="Medium">
                        {data.days} times per week
                    </Text>
                    <LineBreak />
                    <Text marginLeft="15px" left twenty fontFamily="Medium">
                        {data.times} times per day
                    </Text>
                    <LineBreak />
                    <ShowHabitActionsAddContainer>
                        {data.times > 1 && (
                            <>
                                <ShowHabitActionsAddButton style={{ backgroundColor: data.color }}>
                                    <Text fontFamily="SemiBold" twentyEight>
                                        -1
                                    </Text>
                                </ShowHabitActionsAddButton>
                                <ShowHabitActionsAddButton style={{ backgroundColor: data.color }}>
                                    <Text fontFamily="SemiBold" twentyEight>
                                        +1
                                    </Text>
                                </ShowHabitActionsAddButton>
                            </>
                        )}
                    </ShowHabitActionsAddContainer>
                    <ShowHabitActionsContainer>
                        <ShowHabitActionsButton onPress={handleDoneToday}>
                            {!data.completed ? (
                                <Text fontFamily="SemiBold" twenty>
                                    Done for Today
                                </Text>
                            ) : (
                                <Text color="red">Mark as Undone</Text>
                            )}
                        </ShowHabitActionsButton>
                        <ShowHabitActionsButton
                            onPress={() => {
                                haptics.selection();
                                setCalendarModalVisible(true);
                            }}
                        >
                            <Text fontFamily="SemiBold" twenty>
                                Show Details
                            </Text>
                        </ShowHabitActionsButton>
                        <ShowHabitActionsButtonDelete onPress={displayDeleteAlert}>
                            <Text fontFamily="Bold" twenty>
                                Delete Habit
                            </Text>
                        </ShowHabitActionsButtonDelete>
                    </ShowHabitActionsContainer>
                </ScrollView>
            </ModalContent>
            <CalendarModal
                data={data}
                calendarModalVisible={calendarModalVisible}
                setCalendarModalVisible={setCalendarModalVisible}
            />
            <ShowHabitEditModal
                data={data}
                editHabitModalVisible={editHabitModalVisible}
                setEditHabitModalVisible={setEditHabitModalVisible}
            />
            <Dialog.Container
                blurStyle={{ backgroundColor: '#191919' }}
                footerStyle={{ backgroundColor: '#181818' }}
                visible={dialogVisible}
            >
                <Dialog.Title>
                    <Text twenty fontFamily="SemiBold">
                        Delete Habit
                    </Text>
                </Dialog.Title>
                <Dialog.Description>
                    <Text color="gray" fontFamily="Regular">
                        Do you want to delete this habit? You cannot undo this action.
                    </Text>
                </Dialog.Description>
                <Dialog.Button color={colors.error} bold label="Delete" onPress={deleteHabit} />
                <Dialog.Button label="Cancel" bold onPress={() => setDialogVisible(false)} />
            </Dialog.Container>
        </Modal>
    );
}
