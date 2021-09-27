import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import { showHabitImageBackground } from '../utils/globalStyles';
import {
    HomeheaderContainer,
    LineBreak,
    ModalContent,
    ShowHabitActionsButton,
    ShowHabitActionsButtonDelete,
    ShowHabitActionsContainer,
    ShowHabitDataContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import ShowHabitEditModal from './ShowHabitEditModal';
import { format } from 'date-fns';
import CalendarModal from './CalendarModal';

export default function ShowHabitModal({ modalVisible, setModalVisible, data }) {
    const [editHabitModalVisible, setEditHabitModalVisible] = useState(false);
    const [calendarModalVisible, setCalendarModalVisbile] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleDoneToday = async () => {
        try {
            const result = await AsyncStorage.getItem('@habit');
            let habits = [];
            if (result !== null) habits = JSON.parse(result);

            const updatedHabits = habits.filter((habit) => {
                const obj = { ...habits.completedDates };
                const newDate = format(new Date(), 'yyyy-MM-dd');

                obj[newDate] = {
                    selected: true,
                    marked: true,
                    selectedColor: colors.mainGreen,
                    customStyles: {
                        container: {
                            backgroundColor: colors.mainGreen,
                            height: 60,
                            elevation: 2,
                        },
                    },
                };
                if (habit.name === data.name) {
                    habit.completed = true;
                    habit.completedDates = obj;
                }
                return habit;
            });
            await AsyncStorage.setItem('@habit', JSON.stringify(updatedHabits));
        } catch (e) {
            console.error(e);
        }

        setCompleted(true);
    };

    return (
        <Modal animationType="slide" presentationStyle="pageSheet" visible={modalVisible}>
            <ModalContent>
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
                        <Image style={{ width: 90, height: 90 }} source={data.icon} />
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
                <ShowHabitActionsContainer>
                    <ShowHabitActionsButton onPress={handleDoneToday}>
                        {!completed ? (
                            <Text fontFamily="SemiBold" twenty>
                                Done for Today
                            </Text>
                        ) : (
                            <Text>Mark as Undone</Text>
                        )}
                    </ShowHabitActionsButton>
                    <ShowHabitActionsButton onPress={() => setCalendarModalVisbile(true)}>
                        <Text fontFamily="SemiBold" twenty>
                            Show Details
                        </Text>
                    </ShowHabitActionsButton>
                    <ShowHabitActionsButtonDelete>
                        <Text fontFamily="Bold" twenty>
                            Delete Habit
                        </Text>
                    </ShowHabitActionsButtonDelete>
                </ShowHabitActionsContainer>
            </ModalContent>
            <CalendarModal
                data={data}
                calendarModalVisible={calendarModalVisible}
                setCalendarModalVisbile={setCalendarModalVisbile}
            />
            <ShowHabitEditModal
                data={data}
                editHabitModalVisible={editHabitModalVisible}
                setEditHabitModalVisible={setEditHabitModalVisible}
            />
        </Modal>
    );
}
