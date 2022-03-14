import { Box, Flex, useColorModeValue } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import MainButton from '../components/uiComponents/Button';
import { useMoods } from '../context/MoodProvider';
import useSettings from '../hooks/useSettings';
import { HabitDescriptionInput } from '../utils/StyledComponents/Styled';

const MoodEditScreen = ({ navigation, route }) => {
    const [text, setText] = useState(route.params.text);
    const { colors } = useSettings();
    const { moods, updateMoods } = useMoods();

    const { goBack } = navigation;

    const handleEdit = () => {
        const mapped = moods.map((mood) => {
            if (mood.id === route.params.id) {
                mood.text = text;
            }
            return mood;
        });
        updateMoods(mapped);
        goBack();
    };

    return (
        <Flex bg={useColorModeValue('white', 'gray.800')} px={4} py={4} rounded="lg" flex={1}>
            <ScrollView>
                <Box mt={10}>
                    <HabitDescriptionInput
                        multiline={true}
                        placeholderTextColor="gray"
                        value={text}
                        style={{
                            backgroundColor: useColorModeValue(colors.white, colors.black),
                            color: useColorModeValue('black', 'white'),
                            height: 220,
                            paddingHorizontal: 10,
                        }}
                        onChangeText={(input) => setText(input)}
                    />
                </Box>
            </ScrollView>
            <KeyboardAvoidingView
                behavior="padding"
                style={{
                    flex: 2,
                    alignItems: 'center',
                }}
            >
                <MainButton onPress={handleEdit}>Save</MainButton>
            </KeyboardAvoidingView>
        </Flex>
    );
};

export default MoodEditScreen;
