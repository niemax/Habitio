import { Box, Flex } from 'native-base';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
    ButtonContainer,
    CreateHabitButton,
    HabitCentered,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    ModalContent,
} from '../../utils/StyledComponents/Styled';
import Text from '../../utils/Text';
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
        <ModalContent>
            <ScrollView>
                <View style={{ marginBottom: 60 }}>
                    <Text left marginLeft="17px" fontFamily="Regular" marginTop="35px" sixteen>
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
                        <Flex direction="row" align="center">
                            <Text left fontFamily="Regular" sixteen marginLeft="8px">
                                Color
                            </Text>
                            <HabitColor
                                colorUpdated={colorUpdated}
                                updatedColor={updatedColor}
                                color={color}
                                updateColor={updateColor}
                            />
                        </Flex>
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
                </View>
            </ScrollView>
            <ButtonContainer>
                <CreateHabitButton onPress={handleSubmit}>
                    <Text twentyTwo>Update</Text>
                </CreateHabitButton>
            </ButtonContainer>
        </ModalContent>
    );
}
