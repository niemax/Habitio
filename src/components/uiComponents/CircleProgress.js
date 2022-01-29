import React from 'react';
import { Box, Flex, HStack, Button, VStack, Center, useColorModeValue, Text } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../utils/colors';
import { useHabits } from '../../context/HabitProvider';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { TouchableOpacity } from 'react-native';

const CircleProgress = ({ handleHabitProgress, habitProgress, id }) => {
    const { habits, habitSetter, getSpecificHabit } = useHabits();
    const habit = getSpecificHabit(id);
    const habitItem = habit[0];

    return (
        <HStack mt={4} mb={8}>
            <Flex direction="row" align="center">
                <Box>
                    <Button
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        rounded="full"
                        mr={6}
                        _pressed={{ bg: colors.mainPurple }}
                        onPress={() => {
                            if (habitItem.completed) {
                                handleDoneToday(id, habitItem.name, habits, habitSetter);
                                handleHabitProgress(-1);
                            } else {
                                handleHabitProgress(-1);
                            }
                        }}
                    >
                        <AntDesign name="minus" size={24} color={colors.mainPurple} />
                    </Button>
                </Box>
                {habitItem?.times && (
                    <Center>
                        <TouchableOpacity
                            onPress={() => {
                                if (habitItem?.habitProgress - habitItem?.times === -1) {
                                    handleDoneToday(id, habitItem?.name, habits, habitSetter);
                                } else {
                                    handleHabitProgress(1);
                                }
                            }}
                        >
                            <AnimatedCircularProgress
                                fillLineCap="round"
                                size={180}
                                width={20}
                                fill={
                                    !habitItem?.completed
                                        ? (habitProgress / habitItem?.times) * 100
                                        : 100
                                }
                                tintColor={colors.mainPurple}
                                backgroundColor={useColorModeValue('#f5f5f5', colors.black)}
                            >
                                {() =>
                                    !habitItem?.completed ? (
                                        <VStack>
                                            <Center>
                                                <Text fontSize="5xl" fontWeight={700}>
                                                    {habitProgress}
                                                </Text>
                                                {habitItem?.unitValue && (
                                                    <Text fontSize="xl">
                                                        {habitItem?.unitValue}
                                                    </Text>
                                                )}
                                            </Center>
                                        </VStack>
                                    ) : (
                                        <Entypo name="check" size={54} color={colors.mainPurple} />
                                    )
                                }
                            </AnimatedCircularProgress>
                        </TouchableOpacity>
                    </Center>
                )}
                <Box>
                    <Button
                        rounded="full"
                        _pressed={{ bg: colors.mainPurple }}
                        ml={6}
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        onPress={() => {
                            if (habitProgress - habitItem?.times === -1) {
                                handleDoneToday(id, habitItem?.name, habits, habitSetter);
                                handleHabitProgress(1);
                            } else {
                                handleHabitProgress(1);
                            }
                        }}
                    >
                        <AntDesign name="plus" size={24} color={colors.mainPurple} />
                    </Button>
                </Box>
            </Flex>
        </HStack>
    );
};

export default CircleProgress;
