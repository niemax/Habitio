import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import {
    ButtonContainer,
    HabitInput,
    HabitNextButton,
    InputContainer,
} from '../utils/StyledComponents/Styled';
import data from '../categories';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, HStack, Text, useColorModeValue } from 'native-base';

const StartHabitCreation = ({ navigation }) => {
    const [habitName, setHabitName] = useState('');
    const [error, setError] = useState('');

    const handleOwnHabit = () => {
        if (habitName === '') {
            setError('Name Required');
        } else {
            navigation.navigate('CreateHabit', {
                habitName: habitName,
            });
        }
    };

    return (
        <Box flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)}>
            <ScrollView>
                <Text fontSize="lg" marginLeft="25px" marginTop="25px">
                    Create your own Habit
                </Text>
                <InputContainer>
                    <HabitInput
                        clearButtonMode="always"
                        placeholder="Habit name"
                        placeholderTextColor="gray"
                        style={{
                            backgroundColor: useColorModeValue('white', '#27272a'),
                            color: 'white',
                            fontSize: 18,
                            fontFamily: 'Bold',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
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
                <Box mt={10} px={4}>
                    <Text fontSize="lg" marginLeft="12px">
                        Or choose
                    </Text>
                    <Box bg={useColorModeValue('white', 'gray.800')} rounded="xl" p={1} mt={6}>
                        {data.map(({ category, image, mainIcon, habits }) => (
                            <TouchableOpacity
                                key={category}
                                onPress={() =>
                                    navigation.push('HabitScreen', {
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
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: 'gray',
                                        width: '96%',
                                        opacity: 0.1,
                                        marginLeft: 16,
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </Box>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <HabitNextButton onPress={handleOwnHabit}>
                    <Text fontWeight={600} fontSize="xl">
                        Next
                    </Text>
                </HabitNextButton>
            </ButtonContainer>
        </Box>
    );
};

export default StartHabitCreation;
