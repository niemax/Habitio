import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { ButtonContainer, HabitInput, InputContainer } from '../utils/StyledComponents/Styled';
import data from '../categories';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Center, Flex, HStack, Spacer, Text, useColorModeValue, VStack } from 'native-base';
import { textInputShadow } from '../utils/globalStyles';
import Button from '../components/uiComponents/Button';
import MainContainer from '../components/uiComponents/MainContainer';
import ListContainer from '../components/uiComponents/ListContainer';
import useSettings from '../hooks/useSettings';
import { LineBreak, SettingTouchable } from './SettingsScreen';

const StartHabitCreation = ({ navigation }) => {
    const [habitName, setHabitName] = useState('');
    const [error, setError] = useState('');
    const { navigate } = navigation;

    const { colors } = useSettings();

    const handleOwnHabit = () => {
        if (habitName === '') {
            setError('Name Required');
        } else {
            navigate('CreateHabit', {
                habitName: habitName,
            });
        }
    };

    const renderLineBreak = () => <LineBreak />;

    return (
        <MainContainer>
            <ScrollView>
                <Box px={6}>
                    <Text marginTop="20px">CREATE YOUR OWN HABIT</Text>
                </Box>
                <InputContainer>
                    <HabitInput
                        clearButtonMode="always"
                        placeholder="Habit name"
                        placeholderTextColor="gray"
                        style={{
                            ...textInputShadow,
                            backgroundColor: useColorModeValue('white', '#27272a'),
                            color: useColorModeValue('black', 'white'),
                        }}
                        onChangeText={(text) => {
                            setError('');
                            setHabitName(text);
                        }}
                    />
                </InputContainer>

                <Text marginLeft="25px" marginTop="10px" color={colors.error}>
                    {error}
                </Text>
                <Box mt={10} px={4} flex={1} mb={40}>
                    <Text px={3} mb={6}>
                        OR CHOOSE
                    </Text>
                    {data.map(({ category, habits }) => (
                        <Box mb={8} mt={2}>
                            <Text px={3} opacity={0.6}>
                                {category.toUpperCase()}
                            </Text>
                            <ListContainer>
                                {habits.map((habit, index) => (
                                    <Box px={1} py={1.5}>
                                        <SettingTouchable
                                            onPress={() =>
                                                navigate('CreateHabit', {
                                                    habitName: habit.name,
                                                    habitIcon: habit.habitIcon,
                                                    color: habit.color,
                                                    defaultTimes: habit.defaultTimes,
                                                    defaultUnit: habit.defaultUnit,
                                                    defaultGoal: habit.defaultGoal,
                                                })
                                            }
                                        >
                                            <Flex
                                                direction="row"
                                                justify="space-between"
                                                align="center"
                                                mb={1}
                                            >
                                                <MaterialCommunityIcons
                                                    size={24}
                                                    color={habit.color}
                                                    name={habit.habitIcon}
                                                />
                                                <VStack ml={4}>
                                                    <Text fontSize="md">{habit.name}</Text>
                                                </VStack>
                                            </Flex>
                                            <Ionicons
                                                name="chevron-forward"
                                                size={20}
                                                color="gray"
                                            />
                                        </SettingTouchable>
                                        {index < habits.length - 1 && renderLineBreak()}
                                    </Box>
                                ))}
                            </ListContainer>
                        </Box>
                        /*     <TouchableOpacity
                                key={category}
                                onPress={() =>
                                    navigate('HabitScreen', {
                                        image: image,
                                        category: category,
                                        habitData: habits,
                                    })
                                }
                            >
                                <Flex direction="row" align="center" justify="space-between" py={1}>
                                    <HStack>
                                        <Center p={3} align="center">
                                            <Image
                                                source={mainIcon}
                                                style={{ height: 20, width: 20 }}
                                            />
                                        </Center>
                                        <Box p={2}>
                                            <Text fontSize="md">{category}</Text>
                                        </Box>
                                    </HStack>
                                    <Ionicons name="chevron-forward" size={20} color="gray" />
                                </Flex>
                                {index < data.length - 1 && renderLineBreak()}
                            </TouchableOpacity> */
                    ))}
                </Box>
            </ScrollView>
            <ButtonContainer>
                <Button onPress={handleOwnHabit} w="100%">
                    Next
                </Button>
            </ButtonContainer>
        </MainContainer>
    );
};

export default StartHabitCreation;
