import { useColorModeValue } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { HabitCentered, HabitDescriptionInput } from '../../utils/StyledComponents/Styled';

const { width } = Dimensions.get('window');

const HabitInput = ({ actions: { setValue } }, props) => (
    <HabitCentered>
        <HabitDescriptionInput
            multiline={true}
            autoCorrect={false}
            placeholder={props.placeholder}
            style={{
                backgroundColor: useColorModeValue('white', '#27272a'),
                color: useColorModeValue('black', 'white'),
                width: width - 35 || props.width,
                height: props.height,
            }}
            placeholderTextColor="gray"
            clearButtonMode="always"
            onChangeText={setValue}
            {...props}
        />
    </HabitCentered>
);

export default HabitInput;
