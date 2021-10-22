import React from 'react';
import { Platform } from 'react-native';
import { HabitCentered, HabitDescriptionInput } from '../../utils/StyledComponents/Styled';

const HabitInput = ({ values: { description, stateDescription }, actions: { setValue } }) => (
    <HabitCentered>
        <HabitDescriptionInput
            keyboardAppearance="dark"
            multiline={Platform.OS === 'android' ? false : true}
            autoCorrect={false}
            value={description || stateDescription}
            placeholder="Habit description"
            placeholderTextColor="gray"
            style={{
                color: 'white',
                fontSize: 17,
                fontFamily: 'SemiBold',
            }}
            onChangeText={setValue}
        />
    </HabitCentered>
);

export default HabitInput;
