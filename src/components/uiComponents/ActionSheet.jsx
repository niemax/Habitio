import React from 'react';
import {
    Actionsheet,
    Box,
    HStack,
    Button,
    Center,
    Slide,
    PresenceTransition,
    IconButton,
    Flex,
} from 'native-base';
import { useHabits } from '../../context/HabitProvider';
import * as Progress from 'react-native-progress';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import { handleDoneToday } from '../../utils/helpers/handleDone';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ActionSheet({
    isOpen,
    onClose,
    name,
    times,
    completed,
    item,
    unitValue,
    handleHabitProgress,
    habitProgress,
}) {
    const { habits, habitSetter } = useHabits();

    const navigation = useNavigation();

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content bg="gray.900">
                <Box w="100%" h={60} px={4} justifyContent="center">
                    <Flex direction="row" justify="flex-end" align="center" mt={2}>
                        <TouchableOpacity
                            style={{ marginRight: 20 }}
                            onPress={() =>
                                navigation.navigate('ShowHabitEditModal', {
                                    data: item,
                                })
                            }
                        >
                            <AntDesign name="edit" size={24} color={colors.mainGreen} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('CalendarModal', {
                                    data: item,
                                })
                            }
                        >
                            <AntDesign name="calendar" size={24} color={colors.mainGreen} />
                        </TouchableOpacity>
                    </Flex>
                    <Box mt={4}>
                        <Text thirtyFour fontFamily="Extra">
                            {name}
                        </Text>
                        <Text eighteen fontFamily="Regular" marginTop="10px">
                            Goal: {times} {unitValue} daily
                        </Text>
                    </Box>
                </Box>
                <HStack mt={12}>
                    <Box>
                        <TouchableOpacity
                            onPress={() => {
                                handleHabitProgress(-1);
                            }}
                        >
                            <AntDesign name="minus" size={32} color={colors.mainGreen} />
                        </TouchableOpacity>
                    </Box>
                    {times && (
                        <Box>
                            <Progress.Circle
                                size={150}
                                progress={habitProgress / times}
                                color={colors.mainGreen}
                                thickness={10}
                                showsText="true"
                                formatText={() => (
                                    <Center>
                                        {!completed ? (
                                            <Text fontFamily="Extra" style={{ fontSize: 56 }}>
                                                {habitProgress}
                                            </Text>
                                        ) : (
                                            <AntDesign
                                                name="check"
                                                size={56}
                                                color={colors.mainGreen}
                                            />
                                        )}
                                    </Center>
                                )}
                                textStyle={{ fontSize: 20, fontWeight: '800' }}
                            />
                        </Box>
                    )}
                    <Box>
                        <TouchableOpacity onPress={() => handleHabitProgress(1)}>
                            <AntDesign name="plus" size={32} color={colors.mainGreen} />
                        </TouchableOpacity>
                    </Box>
                </HStack>
                <Box mt={8}>
                    <Button
                        onPress={() => handleDoneToday(item, habits, habitSetter)}
                        size="lg"
                        w={300}
                        h={50}
                        variant="subtle"
                        colorScheme="green"
                        rounded="xl"
                        align="center"
                        justify="center"
                    >
                        {!completed ? 'Mark as Done' : 'Mark as Undone'}
                    </Button>
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
}
