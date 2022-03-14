import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
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
    Container,
} from 'native-base';
import ActionSheet from './ActionSheet';
import { haptics } from '../../utils/helpers/haptics';
import { useHabits } from '../../context/HabitProvider';
import { renderIconBackgroundColor } from '../../utils/helpers/renderIconBackgroundColor';
import { habitItemShadow } from '../../utils/globalStyles';
import ProgressCircle from './CircularProgress';
import useSettings from '../../hooks/useSettings';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const HabitListItem = ({ item }) => {
    const { icon, completed, times, progress, color, name, id, unitValue, frequency, habitGoal } =
        item;

    const [habitProgress, setHabitProgress] = useState(progress);
    const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
    const { onClose } = useDisclose();
    const { colorMode } = useColorMode();
    const { habitSetter, habits } = useHabits();

    const handleHabitProgress = (operand) => {
        haptics.success();
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                setHabitProgress(habitProgress + Number(operand));
                habit.progress += Number(operand);
                if (habit.frequency === 'daily') {
                    habit.timesDoneThisWeek += Number(operand);
                }
            }
            return habit;
        });
        habitSetter(mapped);
    };

    const renderIcon = () =>
        !!icon ? (
            icon === 'cleaning-services' ? (
                <MaterialIcons size={20} color="black" name={icon} />
            ) : (
                <MaterialCommunityIcons size={20} color="black" name={icon} />
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
                    <HomepageDataBox
                        onPress={() => setIsActionSheetVisible(true)}
                        style={{
                            backgroundColor: colorMode === 'light' ? 'white' : '#151618',
                            ...habitItemShadow,
                        }}
                    >
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
                        <ProgressCircle
                            id={id}
                            habitProgress={habitProgress}
                            handleHabitProgress={handleHabitProgress}
                            size={36}
                            width={10}
                            fontSize={12}
                        />
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
