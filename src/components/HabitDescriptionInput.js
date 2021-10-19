import React from 'react';
import { Platform } from 'react-native';
import { habitBoxShadow } from '../utils/globalStyles';
import { HabitCentered, HabitDescriptionInput } from '../utils/StyledComponents/Styled';

const CreateHabitInput = ({ values: { description, stateDescription }, actions: { setValue } }) => (
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
                ...habitBoxShadow,
            }}
            onChangeText={setValue}
        />
    </HabitCentered>
);

export default CreateHabitInput;
