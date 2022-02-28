import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { ButtonContainer, HabitInput, InputContainer } from '../utils/StyledComponents/Styled';
import data from '../categories';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex, HStack, Text, useColorModeValue } from 'native-base';
import { textInputShadow } from '../utils/globalStyles';
import Button from '../components/uiComponents/Button';
import MainContainer from '../components/uiComponents/MainContainer';

const StartHabitCreation = ({ navigation }) => {
    const [habitName, setHabitName] = useState('');
    const [error, setError] = useState('');
    const { navigate } = navigation;

    const handleOwnHabit = () => {
        if (habitName === '') {
            setError('Name Required');
        } else {
            navigate('CreateHabit', {
                habitName: habitName,
            });
        }
    };

    const renderLineBreak = () => (
        <View
            style={{
                height: 1,
                backgroundColor: 'gray',
                width: '96%',
                opacity: 0.1,
                marginLeft: 16,
            }}
        />
    );

    return (
        <MainContainer>
            <ScrollView>
                <Text opacity={0.7} marginLeft="25px" marginTop="20px">
                    CREATE YOUR OWN HABIT
                </Text>
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
                <Box mt={10} px={4}>
                    <Text opacity={0.7} marginLeft="12px">
                        OR CHOOSE
                    </Text>
                    <Box bg={useColorModeValue('white', 'gray.800')} rounded="xl" p={1} mt={6}>
                        {data.map(({ category, image, mainIcon, habits }, index) => (
                            <TouchableOpacity
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
                            </TouchableOpacity>
                        ))}
                    </Box>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <Button onPress={handleOwnHabit} w="70%">
                    Next
                </Button>
            </ButtonContainer>
        </MainContainer>
    );
};

export default StartHabitCreation;
