import React, { useLayoutEffect, useState } from 'react';
import {
    Box,
    Flex,
    KeyboardAvoidingView,
    ScrollView,
    useColorMode,
    useColorModeValue,
} from 'native-base';
import { colors } from '../utils/colors';
import { TextInput } from 'react-native';

export default function EditNote({ route, navigation }) {
    const { colorMode } = useColorMode();
    const { input } = route.params;
    const [inputText, setInputText] = useState(input);

    useLayoutEffect(() => {
        navigation.setParams({
            inputText: inputText,
        });
    }, [navigation, inputText]);

    return (
        <Flex flex={1} bg={colorMode === 'light' ? colors.white : colors.mainBackground}>
            <ScrollView>
                <Box mt={32} align="center" px={4}>
                    <KeyboardAvoidingView>
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
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 1,
                                    height: 10,
                                },
                                shadowOpacity: 0.06,
                                shadowRadius: 8,
                                elevation: 6,
                                borderRadius: 15,
                                height: 220,
                            }}
                            onChangeText={(text) => setInputText(text)}
                        />
                    </KeyboardAvoidingView>
                </Box>
            </ScrollView>
        </Flex>
    );
}
