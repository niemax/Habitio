import React from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import {
    HabitCentered,
    HabitInfoContainer,
    HabitUtilityInfoContainer,
    HomeheaderContainer,
    ModalContent,
    SelectHabitColorButton,
} from '../../utils/StyledComponents/Styled';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';
import Text from '../../utils/Text';
import { colors } from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPalletteModal from '../ColorPalletteModal';
import { useRef } from 'react';
import Frequency from '../Frequency';
import CreateHabitInput from '../HabitDescriptionInput';
import { habitColor } from '../../utils/globalStyles';

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
            <HomeheaderContainer>
                <TouchableOpacity
                    style={{ marginLeft: 5, marginTop: 10 }}
                    onPress={() => setEditHabitModalVisible(false)}
                >
                    <Ionicons name="close-circle-sharp" size={34} color="gray" />
                </TouchableOpacity>
                <Text twentyTwo fontFamily="Extra">
                    Edit Habit
                </Text>
                <TouchableOpacity onPress={handleSubmit}>
                    <Text marginRight="15px" color={colors.mainGreen} fontFamily="SemiBold">
                        {loading ? (
                            <ActivityIndicator color={colors.mainGreen} />
                        ) : (
                            <Text color={colors.mainGreen}>Update</Text>
                        )}
                    </Text>
                </TouchableOpacity>
            </HomeheaderContainer>

            <ScrollView>
                <Text left twentyTwo fontFamily="SemiBold" marginLeft="10px" marginTop="30px">
                    {habitName}
                </Text>
                <Text left marginLeft="10px" fontFamily="Regular" marginTop="35px">
                    Description
                </Text>
                <HabitInfoContainer>
                    <HabitCentered>
                        <CreateHabitInput
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
                        <SelectHabitColorButton onPress={() => sheetRef.current.show()}>
                            {!colorUpdated ? (
                                <View
                                    style={{
                                        backgroundColor: color,
                                        ...habitColor,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        backgroundColor: updatedColor,
                                        ...habitColor,
                                    }}
                                />
                            )}
                        </SelectHabitColorButton>

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
