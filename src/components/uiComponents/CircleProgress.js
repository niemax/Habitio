import React from 'react';
import { Box, Flex, HStack, Button, VStack, Center, useColorModeValue, Text } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../utils/colors';
import { useHabits } from '../../context/HabitProvider';
import { handleDoneToday } from '../../utils/helpers/handleDone';

const CircleProgress = ({
    handleHabitProgress,
    times,
    habitProgress,
    completed,
    unitValue,
    item,
}) => {
    const { habits, habitSetter } = useHabits();
    return (
        <HStack mt={4} mb={8}>
            <Flex direction="row" align="center">
                <Box>
                    <Button
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        rounded="full"
                        mr={6}
                        onPress={() => {
                            if (completed) {
                                handleDoneToday(item, habits, habitSetter);
                            } else {
                                handleHabitProgress(-1);
                            }
                        }}
                    >
                        <AntDesign name="minus" size={24} color={colors.mainGreen} />
                    </Button>
                </Box>
                {times && (
                    <Center>
                        <AnimatedCircularProgress
                            size={180}
                            width={20}
                            fill={!completed ? (habitProgress / times) * 100 : 100}
                            tintColor={colors.mainGreen}
                            backgroundColor={useColorModeValue('#f5f5f5', colors.black)}
                        >
                            {() =>
                                !completed ? (
                                    <VStack>
                                        <Center>
                                            <Text fontSize="5xl" fontWeight={700}>
                                                {habitProgress}
                                            </Text>
                                            {unitValue && <Text fontSize="xl">{unitValue}</Text>}
                                        </Center>
                                    </VStack>
                                ) : (
                                    <Entypo name="check" size={42} color={colors.mainGreen} />
                                )
                            }
                        </AnimatedCircularProgress>
                    </Center>
                )}
                <Box>
                    <Button
                        rounded="full"
                        ml={6}
                        bg={useColorModeValue('gray.100', 'gray.700')}
                        onPress={() => {
                            if (habitProgress - times === -1) {
                                handleDoneToday(item, habits, habitSetter);
                            } else {
                                handleHabitProgress(1);
                            }
                        }}
                    >
                        <AntDesign name="plus" size={24} color={colors.mainGreen} />
                    </Button>
                </Box>
            </Flex>
        </HStack>
    );
};

export default CircleProgress;
