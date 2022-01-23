import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import Text from '../../utils/Text';
import { HomepageDataBox, HomepageDataView } from '../../utils/StyledComponents/Styled';
import { colors } from '../../utils/colors';
import { Box, HStack, VStack, useDisclose, Center } from 'native-base';
import ActionSheet from './ActionSheet';
import { useHabits } from '../../context/HabitProvider';
import { handleDoneToday } from '../../utils/helpers/handleDone';

const HabitListItem = ({ item }) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const { icon, completed, times, progress, color, name, id, unitValue } = item;
    const [habitProgress, setHabitProgress] = useState(progress);
    const { habits, habitSetter } = useHabits();

    const handleHabitProgress = (operand) => {
        const mapped = habits.map((habit) => {
            if (habit.id === id) {
                setHabitProgress(habitProgress + operand);
                habit.progress += operand;
            }
            return habit;
        });
        habitSetter(mapped);
    };

    return (
        <HomepageDataView>
            <HomepageDataBox onPress={onOpen}>
                <HStack>
                    <Box style={{ marginLeft: 2 }} bg="gray.800" p={2} rounded="lg">
                        {icon ? (
                            <Image style={{ height: 25, width: 25 }} source={icon} />
                        ) : (
                            <Feather name="activity" size={32} color={color || colors.mainGreen} />
                        )}
                    </Box>
                    <Box ml={3}>
                        <VStack>
                            <Text
                                fontFamily="Bold"
                                color={completed ? 'gray' : 'white'}
                                textDecorationLine={completed ? 'line-through' : 'none'}
                            >
                                {name}
                            </Text>
                            <Text fontFamily="Regular" left fifteen>
                                Goal: {times} {unitValue} daily
                            </Text>
                        </VStack>
                    </Box>
                </HStack>
                {times > 0 && (
                    <Center>
                        <TouchableOpacity onPress={() => handleHabitProgress(1)}>
                            <Progress.Circle
                                size={50}
                                progress={!completed ? habitProgress / times : 1}
                                color={colors.mainGreen}
                                thickness={5}
                                showsText="true"
                                formatText={() => (
                                    <Center>
                                        {!completed ? (
                                            <Text fontFamily="Extra" thirtyFour>
                                                {habitProgress}
                                            </Text>
                                        ) : (
                                            <AntDesign
                                                name="check"
                                                size={28}
                                                color={colors.mainGreen}
                                            />
                                        )}
                                    </Center>
                                )}
                                textStyle={{ fontSize: 20, fontWeight: '800' }}
                            />
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
                    unitValue={unitValue}
                    progress={progress}
                    item={item}
                />
            </HomepageDataBox>
        </HomepageDataView>
    );
};

export default HabitListItem;
