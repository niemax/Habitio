import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Box, useColorModeValue, Text } from 'native-base';
import {
    ButtonContainer,
    HabitCentered,
    HabitInfoContainer,
} from '../../utils/StyledComponents/Styled';
import HabitColor from '../uiComponents/SelectHabitColorButton';
import { textInputShadow } from '../../utils/globalStyles';
import MainButton from '../uiComponents/Button';
import MainContainer from '../uiComponents/MainContainer';
import Details from '../uiComponents/ChooseFrequency';

export default function HabitEditContent({
    methods: {
        handleSubmit,
        updateColor,
        toggleSwitch,
        toggleSwitchDate,
        toggleSwitchEndDate,
        onChangeReminderTime,
        onChangeEndDate,
    },
    setters: {
        setSelectedValue,
        setStateDescription,
        setDaysCount,
        setTimesCount,
        setIsEnabledEndDate,
        setSelectedFrequency,
        setWeekdays,
        setHabitNature,
    },
    states: {
        stateDescription,
        daysCount,
        timesCount,
        isEnabled,
        isEnabledDate,
        isEnabledEndDate,
        habitReminderTime,
        habitEndDate,
        selectedValue,
        selectedFrequency,
        color,
        colorUpdated,
        updatedColor,
        weekdays,
        habitNature,
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
                            <Details
                                switchStates={{
                                    isEnabled,
                                    isEnabledDate,
                                    isEnabledEndDate,
                                }}
                                methods={{
                                    onChangeReminderTime,
                                    onChangeEndDate,
                                    toggleSwitch,
                                    toggleSwitchDate,
                                    toggleSwitchEndDate,
                                }}
                                setters={{
                                    setDaysCount,
                                    setTimesCount,
                                    setSelectedValue,
                                    setIsEnabledEndDate,
                                    setSelectedFrequency,
                                    setWeekdays,
                                    setHabitNature,
                                }}
                                values={{ habitReminderTime }}
                                states={{
                                    daysCount,
                                    timesCount,
                                    habitEndDate,
                                    selectedValue,
                                    selectedFrequency,
                                    weekdays,
                                    habitNature,
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
