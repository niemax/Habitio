import React, { useEffect, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { HomepageDataBox, HomepageDataView } from '../../utils/StyledComponents/Styled';
import {
    Box,
    HStack,
    VStack,
    useDisclose,
    Text,
    Flex,
    useColorMode,
    Button,
    Stagger,
} from 'native-base';
import ActionSheet from './ActionSheet';
import { haptics } from '../../utils/helpers/haptics';
import { useHabits } from '../../context/HabitProvider';
import { renderIconBackgroundColor } from '../../utils/helpers/renderIconBackgroundColor';
import ProgressCircle from './CircularProgress';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { convertWeekdaysToNumbers } from '../../utils/helpers/createhabitHelpers';
import { getCurrentDay } from '../../utils/helpers/dateHelpers';

const HabitListItem = ({ item }) => {
    const { icon, completed, times, progress, color, name, id, unitValue, frequency, habitGoal } =
        item;

    const [habitProgress, setHabitProgress] = useState(progress);
    const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
    const { onClose } = useDisclose();
    const { colorMode } = useColorMode();
    const { habitSetter, habits } = useHabits();

    const handleHabitProgress = (operand) => {
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                setHabitProgress((prevProgress) => prevProgress + Number(operand));
                habit.progress += Number(operand);
                if (habit.frequency === 'daily') {
                    habit.timesDoneThisWeek += Number(operand);
                }
            }
            return habit;
        });
        habitSetter(mapped);
        haptics.success();
    };

    const checkIfIsDoneForTheWeek = () => {
        if (item.timesDoneThisWeek === times * item.selectedWeekdays.length) {
            return true;
        }
        return false;
    };

    const checkNextCompletionDay = () => {
        const selectedWeekdaysToNumbers = convertWeekdaysToNumbers(item.selectedWeekdays);
        const currentDay = getCurrentDay();
        let nextDay = null;

        if (!selectedWeekdaysToNumbers.includes(currentDay)) {
            const sorted = selectedWeekdaysToNumbers.sort();
            const looped = sorted.map((index) => {
                if (currentDay < index) {
                }
            });
        }
        //console.log(nextDay);
    };

    useEffect(() => {
        checkNextCompletionDay();
    }, []);

    const renderIcon = () =>
        !!icon ? (
            icon === 'cleaning-services' ? (
                <MaterialIcons size={20} color={color} name={icon} />
            ) : (
                <MaterialCommunityIcons size={20} color={color} name={icon} />
            )
        ) : (
            <Feather name="activity" size={15} color="black" />
        );

    return (
        <>
            <HomepageDataView>
                <Stagger
                    visible={true}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        translateY: 64,
                    }}
                    animate={{
                        translateY: 0,
                        scale: 1,
                        opacity: 1,
                        transition: {
                            type: 'spring',
                            mass: 0.8,
                            stagger: {
                                offset: 50,
                            },
                        },
                    }}
                >
                    <HomepageDataBox onPress={() => setIsActionSheetVisible(true)}>
                        <HStack>
                            <Flex align="center" mt={1}>
                                <Button
                                    disabled={true}
                                    variant="subtle"
                                    colorScheme={renderIconBackgroundColor(color)}
                                    p={3}
                                    rounded="full"
                                >
                                    {renderIcon()}
                                </Button>
                            </Flex>
                            <Box ml={3}>
                                <VStack space={0.5}>
                                    <Text
                                        fontWeight={600}
                                        fontSize="md"
                                        color={
                                            !!completed
                                                ? 'gray.500'
                                                : colorMode === 'light'
                                                ? 'black'
                                                : 'white'
                                        }
                                        textDecorationLine={!!completed ? 'line-through' : 'none'}
                                    >
                                        {name}
                                    </Text>
                                    <Text fontWeight={400} fontSize="sm">
                                        {frequency}{' '}
                                        {habitGoal === 'Break a habit' ? 'maximum' : 'goal'}:{' '}
                                        {times} {unitValue}
                                    </Text>
                                </VStack>
                            </Box>
                        </HStack>
                        {!!checkIfIsDoneForTheWeek() ? (
                            <Flex direction="row" align="center">
                                <Text>Weekly goal</Text>
                                <Ionicons name="checkmark-outline" size={32} color="#7FBF3F" />
                            </Flex>
                        ) : (
                            <ProgressCircle
                                id={id}
                                habitProgress={habitProgress}
                                handleHabitProgress={handleHabitProgress}
                                size={32}
                                width={10}
                                fontSize={12}
                            />
                        )}
                    </HomepageDataBox>
                </Stagger>
            </HomepageDataView>
            <ActionSheet
                id={id}
                habitProgress={habitProgress}
                setHabitProgress={setHabitProgress}
                handleHabitProgress={handleHabitProgress}
                isVisible={isActionSheetVisible}
                setIsVisible={setIsActionSheetVisible}
                onClose={onClose}
            />
        </>
    );
};

export default HabitListItem;
