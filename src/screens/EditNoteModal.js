import React, { useState } from 'react';
import { Box, KeyboardAvoidingView, ScrollView, Text, useColorModeValue } from 'native-base';
import { SafeAreaView, TextInput } from 'react-native';
import { textInputShadow } from '../utils/globalStyles';
import MainButton from '../components/uiComponents/Button';
import { useHabits } from '../context/HabitProvider';
import { handleNoteEdit } from '../utils/helpers/noteMethods';
import MainContainer from '../components/uiComponents/MainContainer';

export default function EditNote({ route, navigation }) {
    const { input, id, allNotes } = route.params;
    const [inputText, setInputText] = useState(input);
    const { habitSetter, habits } = useHabits();
    const { goBack } = navigation;

    return (
        <MainContainer>
            <ScrollView>
                <Box mt={32} align="center" px={4} flex={1}>
                    <TextInput
                        multiline={true}
                        placeholder="Write a description"
                        autoCorrect={false}
                        value={inputText}
                        placeholderTextColor="gray"
                        style={{
                            backgroundColor: useColorModeValue('white', '#27272a'),
                            color: useColorModeValue('black', 'white'),
                            fontSize: 17,
                            width: '100%',
                            padding: 10,
                            height: 200,
                            borderRadius: 10,
                            ...textInputShadow,
                        }}
                        onChangeText={(text) => setInputText(text)}
                    />
                </Box>
            </ScrollView>
            <KeyboardAvoidingView
                behavior="padding"
                style={{
                    flex: 3,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                }}
            >
                <SafeAreaView>
                    <MainButton
                        onPress={() => {
                            handleNoteEdit(allNotes, id, habitSetter, habits, inputText);
                            goBack();
                        }}
                    >
                        Save
                    </MainButton>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </MainContainer>
    );
}
