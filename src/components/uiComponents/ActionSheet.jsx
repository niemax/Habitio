import React, { useRef, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Box, Flex, HStack, PresenceTransition, Text, useColorModeValue } from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { useNavigation } from '@react-navigation/native';
import NoteModal from './NoteModal';
import ProgressAmountModal from './ProgressAmountModal';
import CircularProgress from './CircularProgress';
import MainButton from './Button';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import useSettings from '../../hooks/useSettings';
import { BlurView } from 'expo-blur';

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
    const { navigate, push } = navigation;

    const { colors } = useSettings();

    const { habits, habitSetter, getSpecificHabit, deleteHabit } = useHabits();
    const habitItem = getSpecificHabit(id);

    const actionSheetRef = useRef(null);

    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit? Action cannot be undone.',
            [
                {
                    text: 'OK',
                    onPress: () => deleteHabit(habitItem.notificationId, id),
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const handleHabitDoneAndProgress = () => {
        handleDoneToday(id, habitItem.name, habits, habitSetter);
        setHabitProgress(habitItem.times);
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
                        onPress={handleHabitDoneAndProgress}
                        size="lg"
                        w={300}
                        h={50}
                        rounded="xl"
                        variant="solid"
                        fontSize={18}
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
                navigate('HabitEditModal', {
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

    const navigateToCalendar = () => {
        setIsVisible(false);
        setTimeout(() => {
            push('CalendarModal', {
                id: id,
                name: habitItem.name,
            });
        }, 1200);
    };

    return (
        <Flex>
            <Modal
                onSwipeComplete={() => setIsVisible(false)}
                swipeDirection="down"
                isVisible={isVisible}
                swipeThreshold={100}
                onBackdropPress={() => setIsVisible(false)}
                backdropOpacity={0.2}
                style={{
                    justifyContent: 'flex-end',
                    marginBottom: 30,
                    marginHorizontal: 10,
                }}
                propagateSwipe={true}
                backdropTransitionOutTiming={0}
                animationOutTiming={500}
                hideModalContentWhileAnimating={true}
            >
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
                            duration: 600,
                        },
                    }}
                >
                    <BlurView
                        tint={useColorModeValue('light', 'dark')}
                        intensity={useColorModeValue(75, 100)}
                        style={{ overflow: 'hidden', borderRadius: 30 }}
                    >
                        <Flex
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
                                        <TouchableOpacity onPress={navigateToCalendar}>
                                            <MaterialCommunityIcons
                                                name="chart-arc"
                                                size={32}
                                                color={colors.mainColor}
                                                style={{ marginRight: 10 }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => actionSheetRef.current?.show()}
                                        >
                                            <MaterialCommunityIcons
                                                name="dots-horizontal"
                                                size={32}
                                                color={colors.mainColor}
                                            />
                                        </TouchableOpacity>
                                    </HStack>
                                </Flex>
                                <Box mb={3} mt={2}>
                                    <Text textAlign="center" fontWeight={700} fontSize="4xl">
                                        {habitItem.name}
                                    </Text>
                                    <Text fontWeight={400} fontSize="lg" textAlign="center">
                                        {habitItem.frequency}{' '}
                                        {habitItem.habitGoal === 'Break a habit'
                                            ? 'maximum'
                                            : 'goal'}
                                        : {habitItem.times} {habitItem.unitValue}
                                    </Text>
                                </Box>
                            </Box>
                            <CircularProgress
                                id={habitItem.id}
                                habitProgress={habitProgress}
                                handleHabitProgress={handleHabitProgress}
                                size={95}
                                habitItem={true}
                                width={22}
                            />

                            {renderAnimatedButton()}
                        </Flex>
                    </BlurView>
                </PresenceTransition>
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
                tintColor={colors.mainColor}
                ref={actionSheetRef}
                options={['Add a note', 'Change value', 'Edit Habit', 'Delete Habit', 'Cancel']}
                cancelButtonIndex={4}
                onPress={(index) => decideAction(index)}
            />
        </Flex>
    );
}
