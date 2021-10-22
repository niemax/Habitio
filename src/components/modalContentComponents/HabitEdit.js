import React from 'react';
import { ScrollView } from 'react-native';
import {
    HabitCentered,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    ModalContent,
} from '../../utils/StyledComponents/Styled';
import ActionSheet from 'react-native-actions-sheet';
import Text from '../../utils/Text';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../uiComponents/ColorPallette';
import { useRef } from 'react';
import Frequency from '../uiComponents/Frequency';
import HabitInput from '../uiComponents/HabitDescriptionInput';
import HabitColor from '../uiComponents/SelectHabitColorButton';
import ShowEditHeader from '../uiComponents/ShowEditHeader';

export default function HabitEditContent({
    methods: {
        handleSubmit,
        updateColor,
        toggleSwitchSpecific,
        onChangeSpecific,
        toggleSwitch,
        toggleSwitchDate,
        onChangeReminderTime,
    },
    setters: {
        setEditHabitModalVisible,
        setStateDescription,
        setDaysCount,
        setTimesCount,
        setHabitUnitValue,
    },
    states: {
        habitName,
        loading,
        stateDescription,
        daysCount,
        timesCount,
        isEnabled,
        isEnabledDate,
        isEnabledSpecific,
        habitSpecificDate,
        habitReminderTime,
        color,
        colorUpdated,
        updatedColor,
        habitUnitValue,
    },
}) {
    const sheetRef = useRef(null);

    return (
        <ModalContent>
            <ShowEditHeader
                setEditHabitModalVisible={setEditHabitModalVisible}
                handleSubmit={handleSubmit}
                loading={loading}
            />
            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
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
                    <HabitUtilityInfoContainer>
                        <Text left fontFamily="Regular">
                            Color
                        </Text>
                        <HabitColor
                            colorUpdated={colorUpdated}
                            updatedColor={updatedColor}
                            color={color}
                            updateColor={updateColor}
                        />

                        <Frequency
                            switchStates={{ isEnabledSpecific, isEnabled, isEnabledDate }}
                            methods={{
                                toggleSwitchSpecific,
                                onChangeSpecific,
                                toggleSwitch,
                                toggleSwitchDate,
                            }}
                            setters={{ setDaysCount, setTimesCount, setHabitUnitValue }}
                            values={{ isEnabledSpecific }}
                            states={{
                                daysCount,
                                timesCount,
                                habitUnitValue,
                                habitSpecificDate,
                                habitReminderTime,
                            }}
                        />

                        {isEnabledDate && (
                            <DateTimePicker
                                value={habitReminderTime}
                                mode="time"
                                themeVariant="dark"
                                is24Hour="true"
                                onChange={onChangeReminderTime}
                            />
                        )}
                    </HabitUtilityInfoContainer>
                </HabitInfoContainer>
                <ActionSheet
                    containerStyle={{
                        backgroundColor: '#141414',
                        height: 270,
                    }}
                    defaultOverlayOpacity={0.6}
                    gestureEnabled="true"
                    elevation={2}
                    ref={sheetRef}
                >
                    <ColorPalletteModal sheetRef={sheetRef} updateColor={updateColor} />
                </ActionSheet>
            </ScrollView>
        </ModalContent>
    );
}
