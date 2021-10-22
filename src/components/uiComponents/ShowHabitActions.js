import React from 'react';
import Text from '../../utils/Text';
import {
    ShowHabitActionsButton,
    ShowHabitActionsContainer,
} from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native';
import CalendarModal from '../../components/modalComponents/CalendarModal';

const ShowHabitActions = ({
    actions: { handleDoneToday, displayDeleteAlert },
    setters: { setModalVisible, setCalendarModalVisible },
    states: { calendarModalVisible },
    data,
}) => (
    <ShowHabitActionsContainer>
        <ShowHabitActionsButton
            onPress={() => {
                handleDoneToday(data, true);
                setTimeout(() => {
                    setModalVisible(false);
                }, 500);
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
            <Text color={colors.error} marginTop="25px" fontFamily="Bold" twenty>
                Delete Habit
            </Text>
        </TouchableOpacity>
        <CalendarModal
            data={data}
            calendarModalVisible={calendarModalVisible}
            setCalendarModalVisible={setCalendarModalVisible}
        />
    </ShowHabitActionsContainer>
);

export default ShowHabitActions;
