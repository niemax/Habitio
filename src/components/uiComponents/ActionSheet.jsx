import React, { useRef, useState } from 'react';
import { Actionsheet, Box, Button, Flex, Text, useColorModeValue } from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import deleteHabit from '../../utils/helpers/deleteHabit';
import CircleProgress from './CircleProgress';
import NoteModal from './NoteModal';
import ProgressAmountModal from './ProgressAmountModal';

export default function ListItemActionSheet({
    isOpen,
    onClose,
    name,
    times,
    completed,
    item,
    unitValue,
    id,
    notificationId,
    handleHabitProgress,
    habitProgress,
    setHabitProgress,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [slide, setSlide] = useState(false);
    const actionSheetRef = useRef(null);
    const { habits, habitSetter } = useHabits();
    const navigation = useNavigation();

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () => deleteHabit(habits, habitSetter, notificationId, id),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content bg={useColorModeValue('white', 'gray.800')}>
                <Box w="100%" px={4} justifyContent="center">
                    <Flex direction="row" justify="flex-end" align="center">
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('CalendarModal', {
                                    data: item,
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
                    <Box mt={2}>
                        <Text textAlign="center" fontWeight={800} fontSize="3xl">
                            {name}
                        </Text>
                        {times > 0 && (
                            <Text textAlign="center">
                                Goal: {times} {unitValue} daily
                            </Text>
                        )}
                    </Box>
                </Box>
                <CircleProgress
                    handleHabitProgress={handleHabitProgress}
                    times={times}
                    habitProgress={habitProgress}
                    setHabitProgress={setHabitProgress}
                    completed={completed}
                    unitValue={unitValue}
                    item={item}
                />
                {!completed && (
                    <Box mt={8}>
                        <Button
                            onPress={() => handleDoneToday(item, habits, habitSetter)}
                            size="lg"
                            w={300}
                            h={50}
                            variant="subtle"
                            colorScheme="indigo"
                            rounded="xl"
                            align="center"
                            justify="center"
                        >
                            {!completed ? 'Mark as Done' : 'Mark as Undone'}
                        </Button>
                    </Box>
                )}
            </Actionsheet.Content>
            <NoteModal showModal={showModal} setShowModal={setShowModal} height={200} id={id} />
            <ProgressAmountModal
                showProgressModal={showProgressModal}
                setShowProgressModal={setShowProgressModal}
                handleHabitProgress={handleHabitProgress}
            />
            <ActionSheet
                tintColor={colors.mainPurple}
                ref={actionSheetRef}
                title={'Choose an action'}
                options={['Add a note', 'Add amount', 'Edit Habit', 'Delete Habit', 'Cancel']}
                cancelButtonIndex={4}
                onPress={(index) => {
                    if (index === 0) setShowModal(true);
                    if (index === 1) setShowProgressModal(true);
                    if (index === 2) {
                        navigation.navigate('ShowHabitEditModal', {
                            data: item,
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
