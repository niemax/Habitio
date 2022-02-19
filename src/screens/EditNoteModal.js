import React, { useState } from 'react';
import {
    Box,
    Flex,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    useColorMode,
    useColorModeValue,
} from 'native-base';
import { colors } from '../utils/colors';
import { SafeAreaView, TextInput } from 'react-native';
import { textInputShadow } from '../utils/globalStyles';
import MainButton from '../components/uiComponents/Button';
import { useHabits } from '../context/HabitProvider';
import { handleNoteEdit } from '../utils/helpers/noteMethods';

export default function EditNote({ route, navigation }) {
    const { input, id, allNotes } = route.params;
    const { colorMode } = useColorMode();
    const [inputText, setInputText] = useState(input);
    const { habitSetter, habits } = useHabits();
    const { goBack } = navigation;

    return (
        <Flex flex={1} bg={colorMode === 'light' ? colors.white : colors.mainBackground}>
            <ScrollView>
                <Box mt={32} align="center" px={4}>
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
                            height: 220,
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
                    marginBottom: 60,
                    flex: 1,
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
                        <Text fontWeight={600} fontSize="lg" color="black">
                            Save
                        </Text>
                    </MainButton>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Flex>
    );
}
