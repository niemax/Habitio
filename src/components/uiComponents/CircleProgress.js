import React from 'react';
import { Box, Flex, HStack, Button, VStack, Center } from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../utils/colors';

const CircleProgress = ({ handleHabitProgress, times, habitProgress, completed, unitValue }) => {
    return (
        <HStack mt={4} mb={8}>
            <Flex direction="row" align="center">
                <Box>
                    <Button
                        bg="gray.800"
                        rounded="full"
                        variant="subtle"
                        mr={6}
                        onPress={() => {
                            handleHabitProgress(-1);
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
                            backgroundColor={colors.black}
                        >
                            {() =>
                                !completed ? (
                                    <VStack>
                                        <Text style={{ fontSize: 50 }} fontFamily="Extra">
                                            {habitProgress}
                                        </Text>
                                        <Text marginTop="5px" fontFamily="Regular">
                                            {unitValue}
                                        </Text>
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
                        bg="gray.800"
                        variant="subtle"
                        onPress={() => {
                            handleHabitProgress(1);
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
