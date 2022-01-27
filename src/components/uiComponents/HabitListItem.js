import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { HomepageDataBox, HomepageDataView } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import {
    Box,
    HStack,
    VStack,
    useDisclose,
    Center,
    useColorModeValue,
    Text,
    Flex,
} from 'native-base';
import ActionSheet from './ActionSheet';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { haptics } from '../../utils/helpers/haptics';
import { useHabits } from '../../context/HabitProvider';
import { formatDateForHabitEndDate } from '../../utils/helpers/dateHelpers';
import { handleDoneToday } from '../../utils/helpers/handleDone';

const HabitListItem = ({ item }) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const {
        icon,
        completed,
        times,
        progress,
        color,
        name,
        id,
        unitValue,
        notificationId,
        specificDate,
    } = item;

    const { habitSetter, habits } = useHabits();
    const [habitProgress, setHabitProgress] = useState(progress);

    const handleHabitProgress = (operand) => {
        haptics.success();
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                setHabitProgress(habitProgress + Number(operand));
                habit.progress += Number(operand);
            }
            return habit;
        });
        habitSetter(mapped);
    };

    return (
        <HomepageDataView>
            <HomepageDataBox
                onPress={onOpen}
                style={{
                    backgroundColor: useColorModeValue('white', '#1c1b1b'),
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 10,
                    },
                    shadowOpacity: 0.06,
                    shadowRadius: 8,
                    elevation: 6,
                }}
            >
                <HStack>
                    <Flex align="center" mt={1}>
                        <Box bg={useColorModeValue('gray.100', 'gray.800')} p={3} rounded="full">
                            {icon ? (
                                <Image style={{ height: 15, width: 15 }} source={icon} />
                            ) : (
                                <Feather
                                    name="activity"
                                    size={20}
                                    color={color || colors.mainPurple}
                                />
                            )}
                        </Box>
                    </Flex>
                    <Box ml={3}>
                        <VStack>
                            <Text
                                fontWeight={600}
                                fontSize="md"
                                color={completed ? 'gray.500' : useColorModeValue('black', 'white')}
                                textDecorationLine={completed ? 'line-through' : 'none'}
                            >
                                {name}
                            </Text>
                            {times > 0 && (
                                <Text fontWeight={400} fontSize="sm">
                                    Goal: {times} {unitValue} daily
                                </Text>
                            )}
                            {specificDate !== null && (
                                <Text marginTop="4px">
                                    Doing it once on {formatDateForHabitEndDate(specificDate)}
                                </Text>
                            )}
                        </VStack>
                    </Box>
                </HStack>
                {times > 0 && (
                    <Center>
                        <TouchableOpacity
                            onPress={() => {
                                if (habitProgress - times === -1) {
                                    handleDoneToday(item, habits, habitSetter);
                                } else {
                                    handleHabitProgress(1);
                                }
                            }}
                        >
                            <AnimatedCircularProgress
                                size={50}
                                width={6}
                                fill={!completed ? (habitProgress / times) * 100 : 100}
                                tintColor={colors.mainPurple}
                                onAnimationComplete={() => 'onAnimationComplete'}
                                backgroundColor={useColorModeValue('#f5f5f5', colors.black)}
                            >
                                {() =>
                                    !completed ? (
                                        <Text fontSize="sm" fontWeight={600}>
                                            {habitProgress}
                                        </Text>
                                    ) : (
                                        <Entypo name="check" size={20} color={colors.mainPurple} />
                                    )
                                }
                            </AnimatedCircularProgress>
                        </TouchableOpacity>
                    </Center>
                )}
                <ActionSheet
                    habitProgress={habitProgress}
                    setHabitProgress={setHabitProgress}
                    handleHabitProgress={handleHabitProgress}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    name={name}
                    times={times}
                    completed={completed}
                    notificationId={notificationId}
                    id={id}
                    unitValue={unitValue}
                    progress={progress}
                    item={item}
                />
            </HomepageDataBox>
        </HomepageDataView>
    );
};

export default HabitListItem;
