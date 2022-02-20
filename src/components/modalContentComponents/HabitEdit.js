import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Box, useColorModeValue, Text } from 'native-base';
import { colors } from '../../utils/colors';
import {
    ButtonContainer,
    CreateHabitButton,
    HabitCentered,
    HabitInfoContainer,
} from '../../utils/StyledComponents/Styled';
import Frequency from '../uiComponents/ChooseFrequency';
import HabitColor from '../uiComponents/SelectHabitColorButton';
import { textInputShadow } from '../../utils/globalStyles';
import MainButton from '../uiComponents/Button';
import MainContainer from '../uiComponents/MainContainer';

export default function HabitEditContent({
    methods: {
        handleSubmit,
        updateColor,
        toggleSwitchSpecific,
        toggleSwitch,
        toggleSwitchDate,
        toggleSwitchEndDate,
        onChangeSpecific,
        onChangeReminderTime,
        onChangeEndDate,
    },
    setters: {
        setSelectedValue,
        setStateDescription,
        setDaysCount,
        setTimesCount,
        setIsEnabledEndDate,
    },
    states: {
        stateDescription,
        daysCount,
        timesCount,
        isEnabled,
        isEnabledDate,
        isEnabledSpecific,
        isEnabledEndDate,
        habitSpecificDate,
        habitReminderTime,
        habitEndDate,
        selectedValue,
        color,
        colorUpdated,
        updatedColor,
    },
}) {
    return (
        <MainContainer>
            <ScrollView>
                <Box mb={24} mt={24}>
                    <Text
                        fontSize="xs"
                        marginLeft="24px"
                        marginTop="35px"
                        marginBottom="10px"
                        opacity={0.7}
                    >
                        DESCRIPTION
                    </Text>
                    <HabitInfoContainer>
                        <HabitCentered>
                            <TextInput
                                autoCorrect={false}
                                value={stateDescription}
                                clearButtonMode="always"
                                style={{
                                    backgroundColor: useColorModeValue('white', '#27272a'),
                                    color: useColorModeValue('black', 'white'),
                                    fontSize: 17,
                                    width: '91%',
                                    height: 50,
                                    borderRadius: 8,
                                    padding: 10,
                                    ...textInputShadow,
                                }}
                                onChangeText={(text) => setStateDescription(text)}
                            />
                        </HabitCentered>
                        <Box>
                            <Text fontSize="xs" marginLeft="15px" opacity={0.7} marginTop="15px">
                                COLOR
                            </Text>
                            <HabitColor
                                colorUpdated={colorUpdated}
                                updatedColor={updatedColor}
                                color={color}
                                updateColor={updateColor}
                            />
                        </Box>
                        <Box>
                            <Frequency
                                switchStates={{
                                    isEnabledSpecific,
                                    isEnabled,
                                    isEnabledDate,
                                    isEnabledEndDate,
                                }}
                                methods={{
                                    onChangeSpecific,
                                    onChangeReminderTime,
                                    onChangeEndDate,
                                    toggleSwitchSpecific,
                                    toggleSwitch,
                                    toggleSwitchDate,
                                    toggleSwitchEndDate,
                                }}
                                setters={{
                                    setDaysCount,
                                    setTimesCount,
                                    setSelectedValue,
                                    setIsEnabledEndDate,
                                }}
                                values={{ isEnabledSpecific, habitReminderTime }}
                                states={{
                                    daysCount,
                                    timesCount,
                                    habitSpecificDate,
                                    habitEndDate,
                                    selectedValue,
                                }}
                            />
                        </Box>
                    </HabitInfoContainer>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <MainButton onPress={handleSubmit}>Update</MainButton>
            </ButtonContainer>
        </MainContainer>
    );
}
