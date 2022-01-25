import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { HomepageDataBox, HomepageDataView } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { Box, HStack, VStack, useDisclose, Center } from 'native-base';
import ActionSheet from './ActionSheet';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { haptics } from '../../utils/helpers/haptics';
import { useHabits } from '../../context/HabitProvider';

const HabitListItem = ({ item }) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const { icon, completed, times, progress, color, name, id, unitValue, notificationId } = item;
    const [habitProgress, setHabitProgress] = useState(progress);

    const { habitSetter, habits } = useHabits();

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
            <HomepageDataBox onPress={onOpen}>
                <HStack>
                    <Box bg="gray.800" p={3} rounded="full">
                        {icon ? (
                            <Image style={{ height: 20, width: 20 }} source={icon} />
                        ) : (
                            <Feather name="activity" size={20} color={color || colors.mainGreen} />
                        )}
                    </Box>
                    <Box ml={3}>
                        <VStack>
                            <Text
                                left
                                fontFamily="Bold"
                                color={completed ? 'gray' : 'white'}
                                textDecorationLine={completed ? 'line-through' : 'none'}
                            >
                                {name}
                            </Text>
                            <Text fontFamily="Regular" left fifteen marginTop="4px">
                                Goal: {times} {unitValue} daily
                            </Text>
                        </VStack>
                    </Box>
                </HStack>
                {times > 0 && (
                    <Center>
                        <TouchableOpacity onPress={() => handleHabitProgress(1)}>
                            <AnimatedCircularProgress
                                size={50}
                                width={6}
                                fill={!completed ? (habitProgress / times) * 100 : 100}
                                tintColor={colors.mainGreen}
                                onAnimationComplete={() => 'onAnimationComplete'}
                                backgroundColor={colors.black}
                            >
                                {() =>
                                    !completed ? (
                                        <Text twenty fontFamily="Extra">
                                            {habitProgress}
                                        </Text>
                                    ) : (
                                        <Entypo name="check" size={20} color={colors.mainGreen} />
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
