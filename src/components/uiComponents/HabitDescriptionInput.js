import { useColorModeValue } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { HabitCentered, HabitDescriptionInput } from '../../utils/StyledComponents/Styled';

const { width } = Dimensions.get('window');

const HabitInput = ({ values: { description, stateDescription }, actions: { setValue } }) => (
    <HabitCentered>
        <HabitDescriptionInput
            multiline={true}
            placeholder="Write a description"
            autoCorrect={false}
            value={description || stateDescription}
            placeholderTextColor="gray"
            style={{
                backgroundColor: useColorModeValue('white', '#27272a'),
                color: useColorModeValue('black', 'white'),
                fontSize: 17,
                width: width - 25,
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
