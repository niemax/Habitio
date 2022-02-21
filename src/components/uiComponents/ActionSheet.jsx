import React, { useRef, useState } from 'react';
import {
    Actionsheet,
    Box,
    Flex,
    PresenceTransition,
    ScaleFade,
    Text,
    useColorModeValue,
} from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import deleteHabit from '../../utils/helpers/deleteHabit';
import NoteModal from './NoteModal';
import ProgressAmountModal from './ProgressAmountModal';
import CircularProgress from './CircularProgress';
import MainButton from './Button';

export default function ListItemActionSheet({
    id,
    isOpen,
    onClose,
    handleHabitProgress,
    habitProgress,
    setHabitProgress,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const navigation = useNavigation();
    const { navigate } = navigation;

    const actionSheetRef = useRef(null);
    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habitItem = getSpecificHabit(id);
    const isSelectedWeekly = habitItem.frequency === 'weekly';

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () => deleteHabit(habits, habitSetter, habitItem.notificationId, id),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const renderTransitionedButton = () =>
        !habitItem.completed && (
            <PresenceTransition
                visible={isOpen}
                initial={{
                    opacity: 0,
                    scale: 0,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 1000,
                    },
                }}
            >
                <Box mt={4}>
                    <MainButton
                        onPress={() => handleDoneToday(id, habitItem.name, habits, habitSetter)}
                        size="lg"
                        w={300}
                        h={50}
                        rounded="lg"
                    >
                        {!habitItem.completed ? 'Mark as Done' : 'Mark as Undone'}
                    </MainButton>
                </Box>
            </PresenceTransition>
        );

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content bg={useColorModeValue('white', 'gray.800')}>
                <Box w="100%" px={4} justifyContent="center">
                    <Flex direction="row" justify="flex-end" align="center">
                        <TouchableOpacity
                            onPress={() =>
                                navigate('CalendarModal', {
                                    id: id,
                                    name: habitItem.name,
                                })
                            }
                        >
                            <MaterialCommunityIcons
                                name="history"
                                size={32}
                                color={colors.mainPurple}
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => actionSheetRef.current.show()}>
                            <MaterialCommunityIcons
                                name="dots-horizontal-circle"
                                size={32}
                                color={colors.mainPurple}
                            />
                        </TouchableOpacity>
                    </Flex>
                    <Box mt={2} mb={4}>
                        <Text textAlign="center" fontWeight={800} fontSize="3xl">
                            {habitItem.name}
                        </Text>
                        <Text textAlign="center">
                            Goal: {!isSelectedWeekly ? habitItem.days : habitItem.times}{' '}
                            {habitItem.unitValue} per {isSelectedWeekly ? 'day' : 'month'}
                        </Text>
                    </Box>
                </Box>
                <CircularProgress
                    id={habitItem.id}
                    habitProgress={habitProgress}
                    handleHabitProgress={handleHabitProgress}
                    size={100}
                    fontSize={34}
                    habitItem={true}
                    width={22}
                />
                {renderTransitionedButton()}
            </Actionsheet.Content>
            <NoteModal showModal={showModal} setShowModal={setShowModal} height={200} id={id} />
            <ProgressAmountModal
                showProgressModal={showProgressModal}
                setShowProgressModal={setShowProgressModal}
                setHabitProgress={setHabitProgress}
                times={habitItem.times}
                id={id}
            />
            <ActionSheet
                tintColor={colors.mainPurple}
                ref={actionSheetRef}
                title={'Choose an action'}
                options={['Add a note', 'Change value', 'Edit Habit', 'Delete Habit', 'Cancel']}
                cancelButtonIndex={4}
                onPress={(index) => {
                    if (index === 0) setShowModal(true);
                    if (index === 1) setShowProgressModal(true);
                    if (index === 2) {
                        navigation.navigate('ShowHabitEditModal', {
                            id: id,
                            name: habitItem.name,
                        });
                    }
                    if (index === 3) {
                        displayDeleteAlert();
                    }
                }}
            />
        </Actionsheet>
    );
}
