import React, { useRef, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import {
    Box,
    Container,
    Flex,
    HStack,
    PresenceTransition,
    Text,
    useColorModeValue,
} from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { useNavigation } from '@react-navigation/native';
import deleteHabit from '../../utils/helpers/deleteHabit';
import NoteModal from './NoteModal';
import ProgressAmountModal from './ProgressAmountModal';
import CircularProgress from './CircularProgress';
import MainButton from './Button';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function ListItemActionSheet({
    id,
    isVisible,
    setIsVisible,
    handleHabitProgress,
    habitProgress,
    setHabitProgress,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const navigation = useNavigation();
    const { navigate } = navigation;

    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habitItem = getSpecificHabit(id);

    const actionSheetRef = useRef(null);
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

    const renderAnimatedButton = () =>
        !habitItem.completed && (
            <PresenceTransition
                visible={isVisible}
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
                        rounded="xl"
                        variant="solid"
                    >
                        Mark as done
                    </MainButton>
                </Box>
            </PresenceTransition>
        );

    const decideAction = (index) => {
        const navigateToEditModal = () => {
            setIsVisible(false);
            setTimeout(() => {
                navigate('ShowHabitEditModal', {
                    id: habitItem.id,
                    name: habitItem.name,
                });
            }, 1200);
        };
        switch (index) {
            case 0:
                return setShowModal(true);
            case 1:
                return setShowProgressModal(true);
            case 2:
                return navigateToEditModal();
            case 3:
                return displayDeleteAlert();
            default:
                return;
        }
    };

    return (
        <Flex flex={1}>
            <Modal
                onSwipeComplete={() => setIsVisible(false)}
                swipeDirection="down"
                isVisible={isVisible}
                swipeThreshold={100}
                onBackdropPress={() => setIsVisible(false)}
                backdropOpacity={0.2}
                style={{ justifyContent: 'flex-end', marginBottom: 30, marginHorizontal: 10 }}
                animationInTiming={450}
                animationOutTiming={400}
                propagateSwipe={true}
            >
                <Flex
                    bg={useColorModeValue('white', 'gray.800')}
                    px={4}
                    py={4}
                    justify="center"
                    align="center"
                    style={{ borderRadius: 30 }}
                >
                    <Box w="100%" justifyContent="center">
                        <Flex direction="row" justify="space-between" align="center" mt={0}>
                            <Box>
                                <TouchableOpacity onPress={() => setIsVisible(false)}>
                                    <AntDesign
                                        name="closecircle"
                                        size={24}
                                        color="gray"
                                        style={{ opacity: 0.2 }}
                                    />
                                </TouchableOpacity>
                            </Box>
                            <HStack>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsVisible(false);
                                        setTimeout(() => {
                                            navigate('CalendarModal', {
                                                id: id,
                                                name: habitItem.name,
                                            });
                                        }, 1200);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="history"
                                        size={28}
                                        color={colors.mainPurple}
                                        style={{ marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => actionSheetRef.current.show()}>
                                    <MaterialCommunityIcons
                                        name="dots-horizontal-circle"
                                        size={28}
                                        color={colors.mainPurple}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </Flex>
                        <Box mb={1} mt={2}>
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
                        size={90}
                        fontSize={34}
                        habitItem={true}
                        width={22}
                    />
                    {renderAnimatedButton()}
                </Flex>

                <NoteModal showModal={showModal} setShowModal={setShowModal} height={200} id={id} />
                <ProgressAmountModal
                    showProgressModal={showProgressModal}
                    setShowProgressModal={setShowProgressModal}
                    setHabitProgress={setHabitProgress}
                    times={habitItem.time}
                    id={id}
                />
            </Modal>
            <ActionSheet
                tintColor={colors.mainPurple}
                ref={actionSheetRef}
                title={'Choose an action'}
                options={['Add a note', 'Change value', 'Edit Habit', 'Delete Habit', 'Cancel']}
                cancelButtonIndex={4}
                onPress={(index) => decideAction(index)}
            />
        </Flex>
    );
}
