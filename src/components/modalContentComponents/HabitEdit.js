import React from 'react';
import { ScrollView } from 'react-native';
import { Box, useColorModeValue, Text } from 'native-base';
import { colors } from '../../utils/colors';
import {
    ButtonContainer,
    CreateHabitButton,
    HabitCentered,
    HabitInfoContainer,
} from '../../utils/StyledComponents/Styled';
import Frequency from '../uiComponents/ChooseFrequency';
import HabitInput from '../uiComponents/HabitDescriptionInput';
import HabitColor from '../uiComponents/SelectHabitColorButton';

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
        color,
        colorUpdated,
        updatedColor,
    },
}) {
    return (
        <Box flex={1} bg={useColorModeValue(colors.white, colors.mainBackground)} align="center">
            <ScrollView>
                <Box mb={24} mt={24}>
                    <Text marginLeft="17px" marginTop="35px">
                        Description
                    </Text>
                    <HabitInfoContainer>
                        <HabitCentered>
                            <HabitInput
                                placeholder={stateDescription}
                                values={stateDescription}
                                actions={{
                                    setValue: (text) => setStateDescription(text),
                                }}
                            />
                        </HabitCentered>
                        <Box>
                            <Text marginLeft="13px">Color</Text>
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
                                }}
                            />
                        </Box>
                    </HabitInfoContainer>
                </Box>
            </ScrollView>
            <ButtonContainer>
                <CreateHabitButton onPress={handleSubmit}>
                    <Text color="black" fontWeight={600} fontSize="lg">
                        Update
                    </Text>
                </CreateHabitButton>
            </ButtonContainer>
        </Box>
    );
}
