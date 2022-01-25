import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import {
    ButtonContainer,
    HabitInput,
    HabitNextButton,
    InputContainer,
    PreDefinedContainer,
    PreDefinedHabitsContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import data from '../categories';
import { colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Flex } from 'native-base';

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
        <Box flex={1} bg={colors.mainBackground}>
            <ScrollView>
                <Text left fontFamily="Regular" marginLeft="25px" marginTop="25px">
                    Create your own Habit
                </Text>
                <InputContainer>
                    <HabitInput
                        keyboardAppearance="dark"
                        clearButtonMode="always"
                        placeholder="Habit name"
                        placeholderTextColor="gray"
                        style={{
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

                <Text left marginLeft="25px" marginTop="10px" color={colors.error}>
                    {error}
                </Text>
                <View style={{ marginBottom: 60 }}>
                    <Text left fontFamily="Regular" marginLeft="25px" marginTop="50px">
                        Or choose
                    </Text>
                    <PreDefinedContainer>
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
                                <PreDefinedHabitsContainer>
                                    <Flex direction="row" align="center">
                                        <Center
                                            bg="gray.900"
                                            p={3}
                                            rounded="lg"
                                            align="center"
                                            ml={2}
                                        >
                                            <Image
                                                source={mainIcon}
                                                style={{ height: 15, width: 15 }}
                                            />
                                        </Center>
                                        <Text marginLeft="15px" fontFamily="Medium">
                                            {category}
                                        </Text>
                                    </Flex>
                                    <Ionicons name="chevron-forward" size={24} color="white" />
                                </PreDefinedHabitsContainer>
                                <View
                                    style={{ height: 1, backgroundColor: '#FFFFFF', width: '100%' }}
                                />
                            </TouchableOpacity>
                        ))}
                    </PreDefinedContainer>
                </View>
            </ScrollView>
            <ButtonContainer>
                <HabitNextButton onPress={handleOwnHabit}>
                    <Text twentyTwo>Next</Text>
                </HabitNextButton>
            </ButtonContainer>
        </Box>
    );
};

export default StartHabitCreation;
