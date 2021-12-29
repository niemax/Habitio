import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import Dialog from 'react-native-dialog';

export const NameAlert = ({ namePromptVisible, setNamePromptVisible, setName }) => {
    const [nameInput, setNameInput] = useState('');

    const saveNameToStorage = async () => {
        await AsyncStorage.setItem('@name', nameInput);
        setName(nameInput);
        setNamePromptVisible(false);
    };

    return (
        <Dialog.Container visible={namePromptVisible}>
            <Dialog.Title>Hello, welcome to Habitio 🥳 What should I call you?</Dialog.Title>
            <Dialog.Input
                autoFocus={true}
                placeholder="Your Name"
                onChangeText={(text) => setNameInput(text)}
            />
            <Dialog.Button bold label="Confirm" onPress={saveNameToStorage} />
        </Dialog.Container>
    );
};

export default NameAlert;
