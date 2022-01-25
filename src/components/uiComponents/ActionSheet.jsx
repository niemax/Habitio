import React, { useRef, useState } from 'react';
import { Actionsheet, Box, Button, Flex, Slide } from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../../utils/Text';
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
            <Actionsheet.Content bg="gray.900">
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
                                color={colors.mainGreen}
                                style={{ marginRight: 10 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => actionSheetRef.current.show()}>
                            <MaterialCommunityIcons
                                name="dots-horizontal-circle"
                                size={32}
                                color={colors.mainGreen}
                            />
                        </TouchableOpacity>
                    </Flex>
                    <Box mt={4}>
                        <Text thirtyFour fontFamily="Extra">
                            {name}
                        </Text>
                        {times > 0 && (
                            <Text sixteen fontFamily="Regular" marginTop="10px">
                                Goal: {times} {unitValue} daily
                            </Text>
                        )}
                    </Box>
                </Box>
                <CircleProgress
                    handleHabitProgress={handleHabitProgress}
                    times={times}
                    habitProgress={habitProgress}
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
                            colorScheme="emerald"
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
                ref={actionSheetRef}
                options={['Add a note', 'Add amount', 'Edit Habit', 'Delete Habit', 'Cancel']}
                cancelButtonIndex={4}
                userInterfaceStyle="dark"
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
