import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { HabitCentered, HabitDescriptionInput } from '../../utils/StyledComponents/Styled';

const { width } = Dimensions.get('window');

const HabitInput = ({ values: { description, stateDescription }, actions: { setValue } }) => (
    <HabitCentered>
        <HabitDescriptionInput
            keyboardAppearance="dark"
            multiline={Platform.OS === 'android' ? false : true}
            placeholder="Write a description"
            autoCorrect={false}
            value={description || stateDescription}
            placeholderTextColor="gray"
            style={{
                color: 'white',
                fontSize: 17,
                fontFamily: 'SemiBold',
                width: width - 15,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.15,
                shadowRadius: 2.84,
                elevation: 4,
            }}
            onChangeText={setValue}
        />
    </HabitCentered>
);

export default HabitInput;
