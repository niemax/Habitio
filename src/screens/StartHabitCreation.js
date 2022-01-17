import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    ButtonContainer,
    HabitInput,
    HabitNextButton,
    InputContainer,
    ModalContent,
    PreDefinedContainer,
    PreDefinedHabitsContainer,
} from '../utils/StyledComponents/Styled';
import Text from '../utils/Text';
import data from '../categories';
import { colors } from '../utils/colors';

const StartHabitCreation = ({ navigation }) => {
    const [habitName, setHabitName] = useState('');
    const [error, setError] = useState('');

    const handleOwnHabit = () => {
        if (habitName === '') {
            setError('Name Required');
        } else {
            navigation.push('CreateHabit', {
                habitName: habitName,
            });
        }
    };

    return (
        <ModalContent>
            <TouchableOpacity
                style={{ marginLeft: 10, marginTop: 40 }}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="close-circle-sharp" size={34} color="gray" />
            </TouchableOpacity>
            <ScrollView>
                <Text left marginLeft="25px" thirtyFour fontFamily="Extra" marginTop="20px">
                    Add a habit
                </Text>
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
                        Or choose from existing Habits
                    </Text>
                    <PreDefinedContainer>
                        {data.map(({ name, image, mainIcon, habits }, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                onPress={() =>
                                    navigation.push('HabitScreen', {
                                        image: image,
                                        habitName: name,
                                        habitData: habits,
                                    })
                                }
                            >
                                <PreDefinedHabitsContainer>
                                    <Image
                                        source={mainIcon}
                                        style={{ height: 40, width: 40, marginLeft: 20 }}
                                    />
                                    <Text marginLeft="15px" fontFamily="Medium">
                                        {name}
                                    </Text>
                                </PreDefinedHabitsContainer>
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
        </ModalContent>
    );
};

export default StartHabitCreation;
