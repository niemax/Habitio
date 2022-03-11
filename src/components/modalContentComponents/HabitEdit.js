import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Box, Text } from 'native-base';
import { ButtonContainer, HabitInfoContainer } from '../../utils/StyledComponents/Styled';
import HabitColor from '../uiComponents/SelectHabitColorButton';
import MainButton from '../uiComponents/Button';
import MainContainer from '../uiComponents/MainContainer';
import Details from '../uiComponents/ChooseFrequency';
import ListContainer from '../uiComponents/ListContainer';
import { LineBreak, SettingTouchable } from '../../screens/SettingsScreen';

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
        setTimesCount,
        setIsEnabledEndDate,
        setSelectedFrequency,
        setWeekdays,
        setHabitNature,
    },
    states: {
        stateDescription,
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
    const [showModal, setShowModal] = useState(false);
    return (
        <MainContainer>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Box mb={24}>
                    <HabitInfoContainer>
                        <Text fontSize="xs" marginLeft="15px" opacity={0.7}>
                            DETAILS
                        </Text>
                        <ListContainer>
                            <Box py={2}>
                                <TextInput
                                    autoCorrect={false}
                                    value={stateDescription}
                                    clearButtonMode="always"
                                    onChangeText={(text) => setStateDescription(text)}
                                    placeholder="description"
                                    clearButtonMode="alwayswd"
                                />
                            </Box>
                            <LineBreak />
                            <SettingTouchable onPress={() => setShowModal(true)}>
                                <Text fontSize="md" marginTop="15px">
                                    Color
                                </Text>
                                <HabitColor
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    colorUpdated={colorUpdated}
                                    updatedColor={updatedColor}
                                    color={color}
                                    updateColor={updateColor}
                                />
                            </SettingTouchable>
                        </ListContainer>

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
                                    setTimesCount,
                                    setSelectedValue,
                                    setIsEnabledEndDate,
                                    setSelectedFrequency,
                                    setWeekdays,
                                    setHabitNature,
                                }}
                                values={{ habitReminderTime }}
                                states={{
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
