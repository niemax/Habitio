import React, { useState } from 'react';
import { Alert, Modal, View, StyleSheet, Pressable, TouchableOpacity, Button } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
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
import { habitBoxShadow } from '../utils/globalStyles';
import { colors } from '../utils/colors';

export default function FirstHabitModal({ navigation }) {
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
            <Text left marginLeft="25px" thirtyFour fontFamily="Bold" marginTop="20px">
                Add a goal
            </Text>
            <Text left fontFamily="Regular" marginLeft="25px" marginTop="25px">
                Create your own Habit
            </Text>
            <InputContainer>
                <HabitInput
                    clearButtonMode="always"
                    placeholder="Habit name"
                    placeholderTextColor="white"
                    style={{
                        color: 'white',
                        fontSize: 18,
                        fontFamily: 'Bold',
                        ...habitBoxShadow,
                    }}
                    onChangeText={(text) => setHabitName(text)}
                />
            </InputContainer>

            <Text left marginLeft="25px" marginTop="10px" color={colors.error}>
                {error}
            </Text>
            <Text left fontFamily="Regular" marginLeft="25px" marginTop="50px">
                Or choose from existing Habits
            </Text>
            <PreDefinedContainer style={habitBoxShadow}>
                {data.map(({ name, image, mainIcon }, index) => (
                    <TouchableOpacity
                        key={index.toString()}
                        onPress={() =>
                            navigation.push('HabitScreen', {
                                image: image,
                                habitName: name,
                            })
                        }
                    >
                        <PreDefinedHabitsContainer>
                            <Feather
                                name={mainIcon}
                                size={40}
                                color="#FB467C"
                                style={{ marginLeft: 20 }}
                            />
                            <Text marginLeft="15px" fontFamily="Medium">
                                {name}
                            </Text>
                        </PreDefinedHabitsContainer>
                    </TouchableOpacity>
                ))}
            </PreDefinedContainer>
            <ButtonContainer>
                <HabitNextButton onPress={handleOwnHabit}>
                    <Text twentyTwo>Next</Text>
                </HabitNextButton>
            </ButtonContainer>
        </ModalContent>
    );
}
