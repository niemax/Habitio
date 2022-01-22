import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
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
            navigation.navigate('CreateHabit', {
                habitName: habitName,
            });
        }
    };

    return (
        <ModalContent>
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
                                    <Image
                                        source={mainIcon}
                                        style={{ height: 40, width: 40, marginLeft: 20 }}
                                    />
                                    <Text marginLeft="15px" fontFamily="Medium">
                                        {category}
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
