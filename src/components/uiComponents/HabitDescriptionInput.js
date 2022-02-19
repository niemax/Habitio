import { useColorModeValue } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { textInputShadow } from '../../utils/globalStyles';
import { HabitCentered, HabitDescriptionInput } from '../../utils/StyledComponents/Styled';

const { width } = Dimensions.get('window');

const HabitInput = ({ actions: { setValue } }) => (
    <HabitCentered>
        <HabitDescriptionInput
            multiline={true}
            autoCorrect={false}
            placeholder="Describe the habit"
            style={{
                ...textInputShadow,
                backgroundColor: useColorModeValue('white', '#27272a'),
                color: useColorModeValue('black', 'white'),
                width: width - 35,
            }}
            placeholderTextColor="gray"
            onChangeText={setValue}
        />
    </HabitCentered>
);

export default HabitInput;
